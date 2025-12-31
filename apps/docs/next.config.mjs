import nextra from "nextra";

const withNextra = nextra({});

export default withNextra({
  typescript: {
    ignoreBuildErrors: process.env.SKIP_TYPECHECK === "1",
  },
});
