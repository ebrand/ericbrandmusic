"use client";

import { StytchProvider as Provider, createStytchUIClient } from "@stytch/nextjs";

const stytch = createStytchUIClient(
  process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN!
);

export default function StytchProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider stytch={stytch}>{children}</Provider>;
}
