const removeImports = require("next-remove-imports")();
const nextTranslate = require("next-translate-plugin");

module.exports = nextTranslate(
  removeImports({
    reactStrictMode: false,
    output: "standalone",
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
