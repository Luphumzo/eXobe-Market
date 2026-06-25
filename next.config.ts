import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mimbnqppkgaowkdlohlt.supabase.co",
        pathname: "/storage/v1/object/public/marketplace-images/**",
      },
    ],
  },
}

export default nextConfig
