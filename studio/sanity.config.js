// sanity.config.js
import { codeInput } from "@sanity/code-input";
import { colorInput } from "@sanity/color-input";
import { dashboardTool } from "@sanity/dashboard";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { deskTool } from "sanity/desk";
import schemas from "./schemas/schema";
import structure from "./src/desk-structure";

export default defineConfig({
  name: "maxkarlsson",
  title: "maxkarlsson.dev",
  projectId: "hytow8kc",
  dataset: "production",
  plugins: [
    deskTool({ structure }),
    visionTool(),
    dashboardTool(),
    codeInput(),
    colorInput(),
    unsplashImageAsset(),
  ],
  schema: {
    types: schemas,
  },
});
