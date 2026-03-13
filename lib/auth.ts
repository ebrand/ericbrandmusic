import { cookies } from "next/headers";
import { getStytchClient } from "./stytch";

export async function validateSession(): Promise<{ valid: true; email: string } | { valid: false }> {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("stytch_session_jwt")?.value;

  if (!jwt) {
    return { valid: false };
  }

  try {
    const client = getStytchClient();
    const resp = await client.sessions.authenticateJwt({ session_jwt: jwt });
    const email = resp.session.authentication_factors?.[0]?.email_factor?.email_address ?? "";
    return { valid: true, email };
  } catch {
    return { valid: false };
  }
}
