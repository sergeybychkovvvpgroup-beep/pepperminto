import nextra from "nextra";

const withNextra = nextra({
  typescript: {
    ignoreBuildErrors: process.env.SKIP_TYPECHECK === "1",
  },
});

export default withNextra({});
