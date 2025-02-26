import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "smooth-storage.aptoma.no",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "akademia.cc",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "flimmer.app",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.home-assistant.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "nbskak.dk",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
