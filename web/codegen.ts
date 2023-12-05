import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/graphql",
  documents: "src/graphql/**/*.ts",
  generates: {
    "src/generated/": {
      preset: "client",
      plugins: ["typescript", "typescript-operations"],
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
};

export default config;
