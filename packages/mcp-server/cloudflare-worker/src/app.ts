import { Hono } from 'hono';
import {
  layout,
  homeContent,
  parseApproveFormBody,
  renderAuthorizationApprovedContent,
  renderLoggedOutAuthorizeScreen,
  renderAuthorizationRejectedContent,
} from './utils';
import { AuthorizationError } from '@cloudflare/workers-oauth-provider';
import type { AuthRequest, OAuthHelpers } from '@cloudflare/workers-oauth-provider';
import { ServerConfig } from '.';

export type Bindings = Env & {
  OAUTH_PROVIDER: OAuthHelpers;
};

// Domain-verification token for the OpenAI Apps directory; public by design.
const OPENAI_APPS_CHALLENGE = '4LRev1DWgl_cHq4nbJ7eS4yk8B37JLy9hT-GYLRo6Pg';

export function makeOAuthConsent(config: ServerConfig) {
  const app = new Hono<{
    Bindings: Bindings;
  }>();

  app.get('/.well-known/openai-apps-challenge', (c) => c.text(OPENAI_APPS_CHALLENGE));

  // Render a reasonable home page just to show the app is up
  app.get('/', async (c) => {
    const content = await homeContent(c.req.raw);
    return c.html(layout(content, 'Home', config));
  });

  // The /authorize page has a form that will POST to /approve
  app.get('/authorize', async (c) => {
    let oauthReqInfo: AuthRequest;
    try {
      oauthReqInfo = await c.env.OAUTH_PROVIDER.parseAuthRequest(c.req.raw);
    } catch (error) {
      if (!(error instanceof AuthorizationError)) {
        throw error;
      }
      // A vetted redirect_uri gets the error back the OAuth way; anything
      // earlier in validation has no trusted place to send it.
      if (error.redirectUri) {
        const target = new URL(error.redirectUri);
        target.searchParams.set('error', error.code);
        target.searchParams.set('error_description', error.description);
        if (error.state) target.searchParams.set('state', error.state);
        if (error.issuer) target.searchParams.set('iss', error.issuer);
        return c.redirect(target.toString());
      }
      return c.text(`${error.code}: ${error.description}`, 400);
    }
    const requester = await clientLabel(c.env.OAUTH_PROVIDER, oauthReqInfo.clientId);

    const content = await renderLoggedOutAuthorizeScreen(config, oauthReqInfo, requester);
    return c.html(layout(content, 'Authorization', config));
  });

  // This endpoint is responsible for validating any login information and
  // then completing the authorization request with the OAUTH_PROVIDER
  app.post('/approve', async (c) => {
    const { action, oauthReqInfo, clientProps } = await parseApproveFormBody(await c.req.parseBody(), config);

    if (action !== 'login_approve') {
      return c.html(
        layout(
          await renderAuthorizationRejectedContent(oauthReqInfo?.redirectUri || ''),
          'Authorization Status',
          config,
        ),
      );
    }

    if (!oauthReqInfo || !clientProps) {
      return c.html('INVALID LOGIN', 401);
    }

    // We don't have a real user ID, just tokens, so we generate a random one
    // Make this some stable ID if you want to look up the user's grants later.
    const generatedUserId = crypto.randomUUID();

    const { redirectTo } = await c.env.OAUTH_PROVIDER.completeAuthorization({
      request: oauthReqInfo,
      userId: generatedUserId,
      metadata: {},
      scope: oauthReqInfo.scope,
      props: {
        clientProps,
      },
    });

    return c.html(
      layout(await renderAuthorizationApprovedContent(redirectTo), 'Authorization Status', config),
    );
  });

  // Render the authorize screen for demoing the OAuth flow (it won't actually log in)
  app.get('/demo', async (c) => {
    const content = await renderLoggedOutAuthorizeScreen(config, {} as any);
    return c.html(layout(content, 'Authorization', config));
  });

  return app;
}

// A CIMD client_id is a URL the client asserts for itself, so the consent
// screen names its host instead of the self-reported client_name.
async function clientLabel(provider: OAuthHelpers, clientId: string): Promise<string> {
  if (/^https:\/\//.test(clientId)) {
    return new URL(clientId).host;
  }
  const client = await provider.lookupClient(clientId).catch(() => null);
  return client?.clientName || clientId;
}
