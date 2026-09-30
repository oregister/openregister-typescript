import docsSearchTool from 'openregister-mcp/docs-search-tool';
import { LocalDocsSearch } from 'openregister-mcp/local-docs-search';

// The SDK index is the only source that knows SDK method names; the docs site
// knows everything else (guides, field descriptions, units) and ranks better.
// Search returns a short list from both; `read` returns one entry in full.

const DOCS_ORIGIN = 'https://docs.openregister.de';
const SITE_TIMEOUT_MS = 3000;
// Roughly 4 characters per token.
const READ_MAX_CHARS = 4_000 * 4;
const MAX_METHODS = 3;
const MAX_SECTIONS = 3;
const SNIPPET_CHARS = 240;
// Keeps weak keyword matches out of the method list.
const MIN_RELATIVE_SCORE = 0.5;

const CONVENTIONS =
  'Conventions: money is an integer in euro cents (divide by 100); share capital is a decimal with its own currency. Dates are ISO 8601. Company IDs look like DE-HRB-F1103-267645.';

type Method = {
  endpoint: string;
  httpMethod: string;
  summary: string;
  description?: string;
  qualified: string;
  params?: string[];
  response?: string;
};

type Section = { title: string; path: string; anchor: string; content: string };

type MethodIndex = {
  search(query: unknown): { score: number; _original: Method }[];
  constructor: { wildcard: symbol };
};

// `LocalDocsSearch` hides scores and mixes in README prose; its MiniSearch
// index has both the scores and the method records.
let sdk: Promise<{ index: MethodIndex; methods: Method[] }> | undefined;

function sdkIndex() {
  sdk ??= LocalDocsSearch.create().then((search) => {
    const index = (search as unknown as { methodIndex: MethodIndex }).methodIndex;
    return { index, methods: index.search(index.constructor.wildcard).map((hit) => hit._original) };
  });
  return sdk;
}

async function callSite(name: string, args: Record<string, string>): Promise<string[] | null> {
  try {
    const response = await fetch(`${DOCS_ORIGIN}/mcp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'tools/call',
        params: { name, arguments: args },
      }),
      signal: AbortSignal.timeout(SITE_TIMEOUT_MS),
    });
    const body = await response.text();
    const result = JSON.parse(body.match(/^data: (.*)$/m)?.[1] ?? body).result;
    if (!response.ok || !result || result.isError) {
      return null;
    }
    return (result.content as { text?: string }[]).map((c) => c.text ?? '').filter(Boolean);
  } catch {
    return null;
  }
}

async function siteFile(command: string): Promise<string | null> {
  const out = (await callSite('query_docs_filesystem_open_register', { command }))?.join('\n');
  return (out?.startsWith('exit: 0') && out.split('--- stdout ---\n')[1]) || null;
}

async function searchSite(query: string): Promise<Section[]> {
  const hits = (await callSite('search_open_register', { query })) ?? [];
  return hits.flatMap((hit) => {
    const m = hit.match(/^Title: (.*)\nLink: (\S+)\n(?:Page: .*\n)?Content: ([\s\S]*)$/);
    const url = m && new URL(m[2]!);
    return url?.origin === DOCS_ORIGIN ?
        [{ title: m![1]!, path: url.pathname, anchor: url.hash, content: m![3]! }]
      : [];
  });
}

let pages: Promise<Map<string, string>> | undefined;

// Docs page path → "GET /v1/…", from the API reference each endpoint page embeds.
function endpointPages(): Promise<Map<string, string>> {
  pages ??= siteFile('rg "REST Endpoint " /endpoint').then((out) => {
    const map = new Map<string, string>();
    for (const line of out?.split('\n') ?? []) {
      const m = line.match(/^(\/\S+)\.mdx:\d+:REST Endpoint (\w+ \S+)$/);
      if (m) {
        map.set(m[1]!, m[2]!);
      }
    }
    if (map.size === 0) {
      pages = undefined;
    }
    return map;
  });
  return pages;
}

const endpointKey = (m: Method) => `${m.httpMethod.toUpperCase()} ${m.endpoint}`;

// Path parameters are positional and everything else goes in one object,
// matching the SDK; short types are spelled out so the call shape is clear.
function signature(m: Method): string {
  const inPath = new Set([...m.endpoint.matchAll(/\{(\w+)\}/g)].map((x) => x[1]));
  const params = (m.params ?? []).map((p) => {
    const at = p.indexOf(':');
    return {
      name: p.slice(0, at).trim(),
      type: p
        .slice(at + 1)
        .trim()
        .replace(/;$/, '')
        .replace(/; }/g, ' }'),
    };
  });
  const fields = params
    .filter((p) => !inPath.has(p.name.replace(/\?$/, '')))
    .map(
      (p) =>
        `${p.name}: ${
          p.type.length <= 45 ? p.type
          : p.type.endsWith('[]') ? 'object[]'
          : 'object'
        }`,
    );
  const args = [
    ...params.filter((p) => inPath.has(p.name.replace(/\?$/, ''))).map((p) => p.name),
    ...(fields.length > 0 ? [`{ ${fields.join(', ')} }`] : []),
  ];
  return `${m.qualified}(${args.join(', ')}) · ${endpointKey(m)}`;
}

function firstSentence(text = ''): string {
  const line = text.trim().split('\n')[0] ?? '';
  const end = line.search(/\.(\s|$)/);
  return (end > 0 ? line.slice(0, end + 1) : line).slice(0, 200);
}

function snippet(content: string, query: string): string {
  const text = content
    .replace(/^#+ .*\n/, '')
    .replace(/```\S*[^\n]*/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const lower = text.toLowerCase();
  const found = query
    .toLowerCase()
    .split(/\W+/)
    .filter((t) => t.length >= 3)
    .map((t) => lower.indexOf(t))
    .filter((i) => i >= 0);
  const start = found.length > 0 ? Math.max(0, Math.min(...found) - 60) : 0;
  const end = start + SNIPPET_CHARS;
  return `${start > 0 ? '…' : ''}${text.slice(start, end)}${end < text.length ? '…' : ''}`;
}

async function search(query: string): Promise<string> {
  const [sections, endpoints, { index, methods }] = await Promise.all([
    searchSite(query),
    endpointPages(),
    sdkIndex(),
  ]);

  const byEndpoint = new Map(methods.map((m) => [endpointKey(m), m]));
  const fromSite = sections.map((s) => byEndpoint.get(endpoints.get(s.path) ?? ''));
  const hits = index.search(query);
  const top = hits[0]?.score ?? 0;
  const fromSdk = hits.filter((h) => h.score >= top * MIN_RELATIVE_SCORE).map((h) => h._original);
  // Alternate the two rankings: the site understands the question, the SDK
  // index matches method names, and each finds methods the other misses.
  const alternated = Array.from({ length: Math.max(fromSite.length, fromSdk.length) }, (_, i) => [
    fromSite[i],
    fromSdk[i],
  ]).flat();
  const picked = [...new Set(alternated.filter((m) => m != null))].slice(0, MAX_METHODS);
  // API reference chunks are whole pages; the method line already points at them.
  const prose = sections.filter((s) => !s.content.startsWith('REST Endpoint')).slice(0, MAX_SECTIONS);

  const out: string[] = [];
  if (picked.length > 0) {
    out.push('SDK methods (call from execute):');
    out.push(...picked.map((m) => `- ${signature(m)}\n  ${firstSentence(m.description || m.summary)}`));
  }
  if (prose.length > 0) {
    out.push('Docs:');
    out.push(...prose.map((s) => `- ${s.title} · ${s.path}${s.anchor}\n  ${snippet(s.content, query)}`));
  }
  if (out.length === 0) {
    out.push('No matches. Try other words, e.g. the German register term or the field name.');
  }
  out.push(CONVENTIONS, 'Read an entry in full with `read` set to its method name or docs path.');
  return out.join('\n');
}

const isUnder = (parent: string, name: string) =>
  name.startsWith(`${parent}.`) || name.startsWith(`${parent}[]`);

const shortType = (type: string) =>
  type
    .replace(/integer<int64>/g, 'integer')
    .replace(/null<[^>]+>/g, 'null')
    .replace(/string<(date|date-time|uuid)>/g, '$1');

// The site's API reference repeats type, description and examples for every
// field, and spells out shared shapes (balance sheet sides, nested rows) each
// time. One line per field and one copy per shape keeps it readable.
function compactReference(block: string): string {
  const out: string[] = [];
  let fields: { name: string; line: string }[] = [];
  const flush = () => {
    const shapes = new Map<string, string>();
    const seen = new Set<string>();
    for (let i = 0; i < fields.length; i++) {
      const { name, line } = fields[i]!;
      let end = i + 1;
      while (end < fields.length && isUnder(name, fields[end]!.name)) {
        end++;
      }
      const shape = fields
        .slice(i + 1, end)
        .map((f) => f.line.replace(name, ''))
        .join('\n');
      const first = shape && shapes.get(shape);
      if (first) {
        out.push(`${line}; same fields as ${first}`);
        i = end - 1;
        continue;
      }
      if (shape) {
        shapes.set(shape, name);
      }
      if (!seen.has(line)) {
        seen.add(line);
        out.push(line);
      }
    }
    fields = [];
  };
  for (const line of block.split('\n')) {
    const field = line.match(/^- ([^:]+): type ([^;]+)(; required)?(?:; description (.*))?/);
    if (field) {
      const [, name, type, required, description] = field;
      // Bare containers ("reports[] (object)") add nothing their children don't show.
      if (!description && name!.endsWith('[]') && /^(object|array)$/.test(type!)) {
        continue;
      }
      const about = description ? `: ${firstSentence(description)}` : '';
      fields.push({
        name: name!,
        line: `- ${name} (${shortType(type!)}${required ? ', required' : ''})${about}`,
      });
    } else if (line.startsWith('; enum ') && fields.length > 0) {
      fields[fields.length - 1]!.line += ` [${line.slice('; enum '.length, 130)}]`;
    } else if (/^(REST Endpoint|Path parameters:|Query parameters:|Body:|Responses:|\d{3}: )/.test(line)) {
      flush();
      out.push(line);
    }
  }
  flush();
  return out.join('\n');
}

function withReference(page: string): string {
  const at = page.indexOf('\nREST Endpoint ');
  return at < 0 ? page : `${page.slice(0, at)}\n${compactReference(page.slice(at + 1))}`;
}

const slug = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-');

function section(page: string, anchor: string): string | null {
  const lines = page.split('\n');
  const level = (l: string) => l.match(/^(#+) /)?.[1]!.length ?? 0;
  const start = lines.findIndex((l) => level(l) > 0 && slug(l.replace(/^#+ /, '')) === anchor);
  if (start < 0) {
    return null;
  }
  const end = lines.findIndex((l, i) => i > start && level(l) > 0 && level(l) <= level(lines[start]!));
  return lines.slice(start, end < 0 ? undefined : end).join('\n');
}

function cap(text: string): string {
  if (text.length <= READ_MAX_CHARS) {
    return text;
  }
  const cut = text.slice(0, READ_MAX_CHARS);
  return `${cut.slice(0, cut.lastIndexOf('\n'))}\n… truncated; read a narrower docs section (path#anchor).`;
}

async function readMethod(ref: string): Promise<string> {
  const name = ref.startsWith('client.') ? ref : `client.${ref}`;
  const [{ methods }, endpoints] = await Promise.all([sdkIndex(), endpointPages()]);
  const m = methods.find((x) => x.qualified === name);
  if (!m) {
    return `Unknown method ${ref}. Use a method name from the search results, e.g. client.company.getFinancialsV1.`;
  }
  const page = [...endpoints].find(([, endpoint]) => endpoint === endpointKey(m))?.[0];
  const doc = page ? await siteFile(`cat ${page}.mdx`) : null;
  const at = doc?.indexOf('\nREST Endpoint ') ?? -1;
  const out = [signature(m), m.description || m.summary];
  if (m.params?.length) {
    out.push('Parameters:', ...m.params.map((p) => `- ${p.replace(/;$/, '').slice(0, 300)}`));
  }
  if (doc && at >= 0) {
    out.push(`Response fields (${DOCS_ORIGIN}${page}):`, compactReference(doc.slice(at + 1)));
  } else if (m.response) {
    out.push(`Response: ${m.response}`);
  }
  return cap([...out, CONVENTIONS].join('\n'));
}

async function readSection(ref: string): Promise<string> {
  const url = new URL(ref, DOCS_ORIGIN);
  const path = url.pathname.replace(/\/$/, '').replace(/\.mdx$/, '');
  if (url.origin !== DOCS_ORIGIN || !/^\/[a-z0-9/-]+$/.test(path)) {
    return `Unknown docs path ${ref}. Use a path from the search results, e.g. /filtering#estimated-financials.`;
  }
  const page = await siteFile(`cat ${path}.mdx`);
  if (!page) {
    return `Could not read ${path}. Search again and use a path from the results.`;
  }
  const body = (url.hash && section(page, url.hash.slice(1))) || page;
  return cap(`${withReference(body)}\n\n${CONVENTIONS}`);
}

export const DOCS_SEARCH_INPUT_SCHEMA = {
  type: 'object' as const,
  properties: {
    query: { type: 'string', description: 'What to look for, in plain words.' },
    read: {
      type: 'string',
      description:
        'A method name (client.company.getFinancialsV1) or docs path (/filtering#estimated-financials) from earlier results, to get it in full.',
    },
  },
};

let installed = false;

// `selectTools` hands out the module's shared tool object, so swapping its
// handler reaches every server built afterwards.
export function installDocsSearch(): void {
  if (installed) {
    return;
  }
  installed = true;
  docsSearchTool.handler = async ({ args }) => {
    const ref = typeof args?.['read'] === 'string' ? args['read'].trim() : '';
    const query = typeof args?.['query'] === 'string' ? args['query'] : '';
    const text =
      ref ? await (/^(\/|https?:)/.test(ref) ? readSection(ref) : readMethod(ref))
      : query ? await search(query)
      : 'Pass `query` to search, or `read` with a method name or docs path.';
    return { content: [{ type: 'text', text }] };
  };
}
