import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000", // Assure-toi que c'est bien le port de ton backend Laravel
        pathname: "/storage/**",
      },
    ],
  },
};


export default nextConfig;
