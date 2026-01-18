import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

const withMdx = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
  },
});

/**
 * @type {import("next").NextConfig}
 */
const nextConfig = {
  output: "export",
  basePath: "/jclub-financial-table",
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

export default withMdx(nextConfig);
