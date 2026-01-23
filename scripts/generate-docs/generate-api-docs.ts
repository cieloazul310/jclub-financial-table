import { resolve, join } from "path";
import jsdocToMd from "jsdoc-to-markdown";
import { __dirname } from "./dirname";

type GenerateApiDocsOptions = Partial<
  Omit<jsdocToMd.JsdocOptions, "files" | "configure"> & jsdocToMd.RenderOptions
>;

export async function generateApiDocs(
  basePath: string,
  files: string[],
  options: GenerateApiDocsOptions = {},
) {
  const defaultProps = {
    "heading-depth": 3,
  } satisfies GenerateApiDocsOptions;
  const opt = { ...defaultProps, ...options };
  const { ...rest } = opt;
  const docs = await jsdocToMd.render({
    files: files.map((filename) => join(basePath, filename)),
    configure: resolve(__dirname, "./jsdoc2md.json"),
    ...rest,
  });
  return docs;
}
