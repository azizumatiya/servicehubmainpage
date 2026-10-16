/** @type {import('next').NextConfig} */

const nextConfig = {
  // Add turbopack config to silence the warning
  turbopack: {},
  
  productionBrowserSourceMaps: true,

  // Use default .next folder unless custom set
  distDir: process.env.DIST_DIR || ".next",

  typescript: {
    ignoreBuildErrors: true,
  },

  // Remove eslint config as it's no longer supported in next.config.mjs
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "images.pixabay.com" },
    ],
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/homepage",
        permanent: false,
      },
    ];
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.(jsx|tsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "@dhiwise/component-tagger/nextLoader",
        },
      ],
    });
    return config;
  },
  
};


export default nextConfig;