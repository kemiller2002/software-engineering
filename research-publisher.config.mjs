export default {
  site: {
    title: "Visual Engineering Research",
    description: "Searchable visual engineering research repository",
    baseUrl: "/",
    language: "en",
    siteUrl: "https://software.echelonfoundry.com/",
  } /**/,
  repository: {
    name: "Visual-Engineering",
    sourceUrl: "https://github.com/kemiller2002/software-engineering",
  },
  content: {
    include: ["**/*.md"],
    exclude: [
      "node_modules/**",
      "dist/**",
      "build/**",
      "build-reports/**",
      ".git/**",
      ".github/**",
      ".research-publisher/**",
      "coverage/**",
      "tmp/**",
      "temp/**",
      "input-documents/**",
      "prompts/**",
      "packages/**",
      "**/archive/**",
      "**/archives/**",
    ],
    drafts: false,
  },
  metadata: {
    mode: "compatible",
    strictInCI: true,
  },
  output: {
    directory: "dist",
    catalog: "data/research-catalog.json",
    diagnostics: "data/build-diagnostics.json",
  },
};
