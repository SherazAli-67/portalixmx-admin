import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Expose App Check env names from .env.local to the browser bundle.
  // Site keys are public; keep DEBUG_TOKEN only in gitignored .env.local.
  env: {
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY ?? "",
    NEXT_PUBLIC_DEBUG_TOKEN: process.env.DEBUG_TOKEN ?? "",
  },
};

export default nextConfig;
