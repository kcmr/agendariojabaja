import type { APIRoute } from "astro";
import { getEventSubmissionEnv } from "../../lib/env";

export const prerender = false;

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export const POST: APIRoute = async ({ request }) => {
  const env = getEventSubmissionEnv();
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return json({ error: "Invalid request body" }, 400);
  }

  const turnstileToken = body["cf-turnstile-response"];

  if (typeof turnstileToken !== "string" || turnstileToken.length === 0) {
    return json({ error: "Missing CAPTCHA token" }, 400);
  }

  let verifyData: { success?: boolean };

  try {
    const verifyResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: env.turnstileSecretKey,
          response: turnstileToken,
        }),
      }
    );

    verifyData = await verifyResponse.json();
  } catch {
    return json({ error: "Internal server error" }, 500);
  }

  if (!verifyData.success) {
    return json({ error: "CAPTCHA validation failed" }, 400);
  }

  const { "cf-turnstile-response": _ignored, ...eventData } = body;

  let webhookResponse: Response;

  try {
    webhookResponse = await fetch(env.n8nWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-form-token": env.n8nFormSecret,
      },
      body: JSON.stringify(eventData),
    });
  } catch {
    return json({ error: "Could not reach the webhook server" }, 502);
  }

  const responseText = await webhookResponse.text();

  try {
    return json(JSON.parse(responseText), webhookResponse.status);
  } catch {
    return new Response(responseText, {
      status: webhookResponse.status,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
};

export const ALL: APIRoute = async () =>
  new Response(JSON.stringify({ error: "Method Not Allowed" }), {
    status: 405,
    headers: {
      Allow: "POST",
      "Content-Type": "application/json",
    },
  });
