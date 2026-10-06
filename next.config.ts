import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Two root layouts (English and Arabic) need a site-wide 404 page.
  experimental: {
    globalNotFound: true,
  },
  // The old Vercel address moves permanently to the real domain, so links
  // and Google's index carry over.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "mustaqeembangi.vercel.app" }],
        destination: "https://mustaqeem.is-a.dev/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "github.com" },
    ],
  },
};

export default nextConfig;
