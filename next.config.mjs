/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: ["push-swap.site", "localhost"],
    remotePatterns: [
      {
        protocol: process.env.NODE_ENV === "production" ? "https" : "http",
        hostname:
          process.env.NODE_ENV === "production"
            ? "push-swap.site"
            : "localhost",
        port: "4000",
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
