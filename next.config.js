/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");
const nextConfig = {
  reactStrictMode: true,
  env: {
    SANITY_PROJECT_ID: "74o9dcn8",
  },
};

module.exports = withPlugins([nextConfig]);

//module.exports = nextConfig;
