// Helper to generate the layout
import { html, raw } from 'hono/html';
import type { HtmlEscapedString } from 'hono/utils/html';
import { marked } from 'marked';
import type { AuthRequest } from '@cloudflare/workers-oauth-provider';
import { env } from 'cloudflare:workers';
import { ServerConfig, ClientProperty } from '.';

// Brand design system matching openregister.de / apps/web
const BRAND = {
  gradientBtn: 'linear-gradient(90deg, #4A5596 0%, #5F83B4 100%)',
  primary: '#4A5596',
  primaryHover: '#3d478a',
  accent: '#557DFF',
  bg: '#F8FAFC',
  card: '#FFFFFF',
  border: '#E2E8F0',
  textHeading: '#0F172A',
  textBody: '#475569',
  textMuted: '#64748B',
  radius: '8px',
  successGreen: '#16a34a',
  successBg: '#f0fdf4',
  errorRed: '#dc2626',
  errorBg: '#fef2f2',
  codeBg: '#F1F5F9',
  preText: '#e2e8f0',
  preBg: '#1E293B',
};

export const layout = (content: HtmlEscapedString | string, title: string, config: ServerConfig) => html`
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title} - ${config.orgName} MCP server</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <script>
        tailwind.config = {
          theme: {
            extend: {
              colors: {
                primary: '#4A5596',
                primaryHover: '#3d478a',
                accent: '#557DFF',
                brand: {
                  50: '#f0f2ff',
                  100: '#e0e5ff',
                  500: '#4A5596',
                  600: '#3d478a',
                  700: '#2d3466',
                },
              },
              fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
              },
              borderRadius: {
                brand: '8px',
              },
            },
          },
        };
      </script>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; }

        body {
          font-family: 'Inter', system-ui, sans-serif;
          background-color: #F8FAFC;
          color: #0F172A;
          -webkit-font-smoothing: antialiased;
        }

        /* Gradient text utility */
        .text-gradient {
          background: linear-gradient(90deg, #4A5596 0%, #5F83B4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Gradient button */
        .btn-primary {
          display: inline-block;
          background: linear-gradient(90deg, #4A5596 0%, #5F83B4 100%);
          color: #ffffff;
          font-weight: 500;
          padding: 0.625rem 1.25rem;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: opacity 0.15s ease;
          text-decoration: none;
          font-size: 0.9375rem;
        }
        .btn-primary:hover { opacity: 0.9; }
        .btn-primary:active { opacity: 0.85; }

        .btn-secondary {
          display: inline-block;
          background: #ffffff;
          color: #475569;
          font-weight: 500;
          padding: 0.625rem 1.25rem;
          border-radius: 8px;
          border: 1px solid #E2E8F0;
          cursor: pointer;
          transition: background-color 0.15s ease;
          text-decoration: none;
          font-size: 0.9375rem;
        }
        .btn-secondary:hover { background-color: #F8FAFC; }

        /* Markdown content styles */
        .markdown { color: #475569; line-height: 1.7; }

        .markdown h1 {
          font-size: 2rem;
          font-weight: 700;
          color: #0F172A;
          margin: 2.5rem 0 1rem;
          line-height: 1.25;
          letter-spacing: -0.02em;
        }

        .markdown h2 {
          font-size: 1.375rem;
          font-weight: 600;
          color: #0F172A;
          margin: 2rem 0 0.75rem;
          line-height: 1.3;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #E2E8F0;
        }

        .markdown h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #0F172A;
          margin: 1.5rem 0 0.5rem;
        }

        .markdown p {
          font-size: 1rem;
          color: #475569;
          margin-bottom: 1rem;
          line-height: 1.7;
        }

        .markdown a {
          color: #4A5596;
          font-weight: 500;
          text-decoration: none;
        }
        .markdown a:hover { text-decoration: underline; }

        .markdown ul, .markdown ol {
          margin: 0.75rem 0 1rem 1.5rem;
          color: #475569;
        }
        .markdown li { margin-bottom: 0.375rem; line-height: 1.65; }
        .markdown ul li { list-style-type: disc; }
        .markdown ol li { list-style-type: decimal; }

        .markdown blockquote {
          border-left: 3px solid #4A5596;
          padding: 0.75rem 1rem;
          margin: 1.5rem 0;
          background-color: #f0f2ff;
          border-radius: 0 8px 8px 0;
          font-style: normal;
        }
        .markdown blockquote p { color: #3d478a; margin-bottom: 0; }

        .markdown code {
          font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
          font-size: 0.8125rem;
          background-color: #F1F5F9;
          color: #0F172A;
          padding: 0.1875rem 0.375rem;
          border-radius: 4px;
          border: 1px solid #E2E8F0;
        }

        .markdown pre {
          background-color: #1E293B;
          border-radius: 8px;
          padding: 1.25rem;
          margin: 1rem 0 1.5rem;
          overflow-x: auto;
          border: 1px solid #334155;
        }
        .markdown pre code {
          background-color: transparent;
          color: #e2e8f0;
          padding: 0;
          border: none;
          font-size: 0.8125rem;
          line-height: 1.65;
        }

        /* Input styling */
        .form-input {
          width: 100%;
          padding: 0.625rem 0.875rem;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          font-size: 0.9375rem;
          font-family: 'Inter', system-ui, sans-serif;
          color: #0F172A;
          background: #ffffff;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
          outline: none;
        }
        .form-input:focus {
          border-color: #4A5596;
          box-shadow: 0 0 0 3px rgba(74, 85, 150, 0.12);
        }
        .form-input::placeholder { color: #94a3b8; }

        /* Card */
        .card {
          background: #ffffff;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
        }

        /* Nav */
        .nav-link {
          font-size: 0.875rem;
          font-weight: 500;
          color: #475569;
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .nav-link:hover { color: #4A5596; }

        /* Divider label */
        .section-badge {
          display: inline-block;
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #4A5596;
          background: #f0f2ff;
          padding: 0.25rem 0.625rem;
          border-radius: 99px;
          margin-bottom: 0.5rem;
        }
      </style>
    </head>
    <body class="flex flex-col min-h-screen">
      <!-- Header -->
      <header style="background:#ffffff; border-bottom:1px solid #E2E8F0;">
        <div style="max-width:1100px; margin:0 auto; padding:0 1.5rem; height:56px; display:flex; align-items:center; justify-content:space-between;">
          <a href="/" style="text-decoration:none; display:flex; align-items:center; gap:0.5rem;">
            ${config.logoUrl ?
              html`<img src="${config.logoUrl}" alt="${config.orgName}" style="height:28px;" />`
            : html`<span style="font-size:1.125rem; font-weight:700; background:linear-gradient(90deg,#4A5596 0%,#5F83B4 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;">${config.orgName}</span>`
            }
            <span style="font-size:0.6875rem; font-weight:600; letter-spacing:0.06em; text-transform:uppercase; color:#64748B; background:#F1F5F9; padding:0.1875rem 0.5rem; border-radius:99px; margin-left:0.25rem;">MCP</span>
          </a>
          <nav style="display:flex; align-items:center; gap:1.25rem;">
            <a href="https://docs.openregister.de/integration/mcp" class="nav-link">Docs</a>
            ${config.instructionsUrl ?
              html`<a href="${config.instructionsUrl}" class="btn-primary" style="padding:0.375rem 0.875rem; font-size:0.875rem;">Get API key →</a>`
            : ''}
          </nav>
        </div>
      </header>

      <!-- Main -->
      <main style="flex:1; max-width:1100px; margin:0 auto; width:100%; padding:3rem 1.5rem 4rem;">
        ${content}
      </main>

      <!-- Footer -->
      <footer style="background:#ffffff; border-top:1px solid #E2E8F0;">
        <div style="max-width:1100px; margin:0 auto; padding:1.25rem 1.5rem; display:flex; align-items:center; justify-content:space-between;">
          <span style="font-size:0.8125rem; color:#94a3b8;">© ${new Date().getFullYear()} ${config.orgName}. All rights reserved.</span>
          <div style="display:flex; gap:1.25rem;">
            <a href="https://openregister.de" style="font-size:0.8125rem; color:#94a3b8; text-decoration:none;">openregister.de</a>
            <a href="https://docs.openregister.de" style="font-size:0.8125rem; color:#94a3b8; text-decoration:none;">Docs</a>
          </div>
        </div>
      </footer>
    </body>
  </html>
`;

export const homeContent = async (req: Request): Promise<HtmlEscapedString> => {
  const origin = new URL(req.url).origin;
  const res = await env.ASSETS.fetch(`${origin}/home.md`);
  let markdown = await res.text();
  markdown = markdown.replaceAll('{{cloudflareWorkerUrl}}', origin + '/sse');
  markdown = markdown.replaceAll('{{cloudflareWorkerHttpUrl}}', origin + '/mcp');
  const content = await marked(markdown);
  return html`<div style="max-width:760px; margin:0 auto;" class="markdown">${raw(content)}</div>`;
};

export const renderLoggedOutAuthorizeScreen = async (config: ServerConfig, oauthReqInfo: AuthRequest) => {
  const renderField = (field: ClientProperty) => {
    if (field.type === 'select' && field.options) {
      return html`
        <div>
          <label for="${`clientopt_${field.key}`}" style="display:block; font-size:0.875rem; font-weight:500; color:#374151; margin-bottom:0.375rem;">
            ${field.label}${field.required ? html`<span style="color:#dc2626; margin-left:2px;">*</span>` : ''}
          </label>
          <select
            id="${`clientopt_${field.key}`}"
            name="${`clientopt_${field.key}`}"
            ${field.required ? 'required' : ''}
            class="form-input"
          >
            ${field.options.map(
              (opt: { label: string; value: string }) => html`
                <option value="${opt.value}" ${field.default === opt.value ? 'selected' : ''}>
                  ${opt.label}
                </option>
              `,
            )}
          </select>
        </div>
      `;
    }
    return html`
      <div>
        <label for="${`clientopt_${field.key}`}" style="display:block; font-size:0.875rem; font-weight:500; color:#374151; margin-bottom:0.375rem;">
          ${field.label}${field.required ? html`<span style="color:#dc2626; margin-left:2px;">*</span>` : ''}
        </label>
        <input
          type="${field.type}"
          id="${`clientopt_${field.key}`}"
          name="${`clientopt_${field.key}`}"
          ${field.required ? 'required' : ''}
          ${field.placeholder ? html`placeholder="${field.placeholder}"` : ''}
          class="form-input"
        />
        ${field.description ? html`<p style="font-size:0.8125rem; color:#94a3b8; margin-top:0.375rem;">${field.description.split('\n')[0]}</p>` : ''}
      </div>
    `;
  };

  return html`
    <div style="max-width:420px; margin:2rem auto 0;">
      <div class="card" style="padding:2.5rem;">
        <!-- Logo / wordmark -->
        <div style="text-align:center; margin-bottom:2rem;">
          ${config.logoUrl ?
            html`<img src="${config.logoUrl}" alt="${config.orgName}" style="height:36px; margin:0 auto 1rem;" />`
          : html`<div style="font-size:1.5rem; font-weight:700; background:linear-gradient(90deg,#4A5596 0%,#5F83B4 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; margin-bottom:0.25rem;">${config.orgName}</div>`
          }
          <div style="font-size:0.75rem; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:#64748B;">MCP Server</div>
        </div>

        <h1 style="font-size:1.25rem; font-weight:700; color:#0F172A; text-align:center; margin-bottom:0.5rem;">
          Connect to ${config.orgName}
        </h1>
        <p style="font-size:0.9375rem; color:#64748B; text-align:center; margin-bottom:2rem; line-height:1.6;">
          Enter your credentials to authorize your MCP client.
          ${config.instructionsUrl ?
            html`<br /><a href="${config.instructionsUrl}" style="color:#4A5596; font-weight:500; font-size:0.875rem;">Get an API key →</a>`
          : ''}
        </p>

        <form action="/approve" method="POST" style="display:flex; flex-direction:column; gap:1.25rem;">
          <input type="hidden" name="oauthReqInfo" value="${JSON.stringify(oauthReqInfo)}" />

          <div style="display:flex; flex-direction:column; gap:1rem;">
            ${config.clientProperties.map(renderField)}
          </div>

          <div style="display:flex; flex-direction:column; gap:0.75rem; margin-top:0.25rem;">
            <button
              type="submit"
              name="action"
              value="login_approve"
              class="btn-primary"
              style="width:100%; text-align:center; padding:0.75rem;"
            >
              Log in and Authorize
            </button>
            <button
              type="submit"
              name="action"
              value="reject"
              class="btn-secondary"
              style="width:100%; text-align:center; padding:0.75rem;"
            >
              Reject
            </button>
          </div>
        </form>
      </div>

      <p style="text-align:center; font-size:0.8125rem; color:#94a3b8; margin-top:1.25rem;">
        By connecting, you agree to the
        <a href="https://openregister.de/terms" style="color:#4A5596; font-weight:500;">Terms of Service</a>
      </p>
    </div>
  `;
};

export const renderApproveContent = async (message: string, status: string, redirectUrl: string) => {
  const isSuccess = status === 'success';
  return html`
    <div style="max-width:420px; margin:2rem auto 0; text-align:center;">
      <div class="card" style="padding:3rem 2.5rem;">
        <!-- Status icon -->
        <div style="
          width:64px;
          height:64px;
          border-radius:50%;
          background:${isSuccess ? '#f0fdf4' : '#fef2f2'};
          display:flex;
          align-items:center;
          justify-content:center;
          margin:0 auto 1.5rem;
          font-size:1.75rem;
          border: 1px solid ${isSuccess ? '#bbf7d0' : '#fecaca'};
        ">
          ${isSuccess ? '✓' : '✗'}
        </div>

        <h1 style="font-size:1.375rem; font-weight:700; color:#0F172A; margin-bottom:0.75rem;">
          ${isSuccess ? "You're all set!" : 'Authorization declined'}
        </h1>
        <p style="font-size:0.9375rem; color:#64748B; line-height:1.6; margin-bottom:2rem;">
          ${isSuccess
            ? 'Your MCP client is now connected to OpenRegister. You can close this window and return to your application.'
            : 'The authorization request was rejected. You can close this window.'}
        </p>

        <a
          href="/"
          class="btn-primary"
          style="display:inline-block; padding:0.625rem 1.5rem;"
        >
          Return to Home
        </a>
      </div>

      ${redirectUrl ? raw(`
        <script>
          setTimeout(function() {
            window.location.href = "${redirectUrl}";
          }, 3000);
        </script>
      `) : ''}
    </div>
  `;
};

export const renderAuthorizationApprovedContent = async (redirectUrl: string) => {
  return renderApproveContent('Authorization approved!', 'success', redirectUrl);
};

export const renderAuthorizationRejectedContent = async (redirectUrl: string) => {
  return renderApproveContent('Authorization rejected.', 'error', redirectUrl);
};

export const parseApproveFormBody = async (
  body: {
    [x: string]: string | File;
  },
  config: ServerConfig,
) => {
  const parsedClientProps = Object.fromEntries(
    config.clientProperties.map((prop: ClientProperty) => {
      const rawValue = body[`clientopt_${prop.key}`];
      const value = prop.type === 'number' ? Number(rawValue) : rawValue;
      return [prop.key, value];
    }),
  );

  let oauthReqInfo: AuthRequest | null = null;
  try {
    oauthReqInfo = JSON.parse(body.oauthReqInfo as string) as AuthRequest;
    if (Object.keys(oauthReqInfo).length === 0) {
      oauthReqInfo = null;
    }
  } catch (e) {
    oauthReqInfo = null;
  }

  return { oauthReqInfo, clientProps: parsedClientProps, action: body.action };
};
