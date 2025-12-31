const removeImports = require("next-remove-imports")();
const nextTranslate = require("next-translate-plugin");

module.exports = nextTranslate(
  removeImports({
    reactStrictMode: false,
    output: "standalone",
    typescript: {
      ignoreBuildErrors: process.env.SKIP_TYPECHECK === "1",
    },
    env: {
      API_URL: process.env.API_URL,
      BASE_URL: process.env.BASE_URL,
      DASHBOARD_URL: process.env.DASHBOARD_URL,
      DOCS_URL: process.env.DOCS_URL,
      HELP_URL: process.env.HELP_URL,
      KNOWLEDGE_BASE_URL: process.env.KNOWLEDGE_BASE_URL,
    },
    async rewrites() {
      return [
        {
          source: "/api/v1/:path*",
          destination: "http://localhost:3001/api/v1/:path*",
        },
      ];
    },
  })
);
