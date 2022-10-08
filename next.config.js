/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");
const nextConfig = {
  reactStrictMode: true,
  env: {
    SANITY_PROJECT_ID: "74o9dcn8",
    SANITY_AUTH_TOKEN:
      "sk178KcQLKo2bFJMhxzrQMYxYBuUHK76uRPhsDn3WDnY6j3FkBHmh3fRHgTDyBdxFsMri5TiocJ2W6lwEPedCGjXuOjeRYkCPuHT5nHr6VhUZCvTKSGbBMd3qvkHKiy9LxD3MRqyecyUF6hOjtQJGolz9xiz2VcF8eKVGzuNEVUdvy9H37yJ",
  },
};

module.exports = withPlugins([nextConfig]);

//module.exports = nextConfig;
