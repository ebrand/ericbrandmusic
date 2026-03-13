"use client";

import { StytchLogin, OAuthProviders, Products } from "@stytch/nextjs";

const REDIRECT_URL =
  typeof window !== "undefined"
    ? `${window.location.origin}/admin/authenticate`
    : "";

export default function LoginForm() {
  return (
    <div className="mx-auto max-w-md">
      <StytchLogin
        config={{
          products: [Products.oauth],
          oauthOptions: {
            providers: [{ type: OAuthProviders.Google }],
            loginRedirectURL: REDIRECT_URL,
            signupRedirectURL: REDIRECT_URL,
          },
        }}
        presentation={{
          theme: "dark",
        }}
      />
    </div>
  );
}
