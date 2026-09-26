/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cache Components: Enables explicit opt-in caching with "use cache"
  // This makes all routes dynamic by default, you opt-into caching
  cacheComponents: true,
  async redirects() {
    return [
      "jonathanb.dk",
      "www.jonathanb.dk",
      "jonathanbangert.dk",
      "www.jonathanbangert.dk",
      "arctix.dev",
      "www.arctix.dev",
    ].map((host) => ({
      source: "/:path*",
      has: [{ type: "host", value: host }],
      destination: "https://jonathanbangert.com/:path*",
      permanent: true,
    }));
  },
};

export default nextConfig;
