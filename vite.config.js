import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isUserOrOrgPage = repositoryName?.endsWith(".github.io");
const pagesBase = process.env.BASE_PATH ?? (process.env.GITHUB_ACTIONS && repositoryName
  ? isUserOrOrgPage
    ? "/"
    : `/${repositoryName}/`
  : "/");

export default defineConfig({
  base: pagesBase,
  plugins: [react()],
});
