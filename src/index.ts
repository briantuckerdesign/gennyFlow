import { ImageExporter } from "./image-exporter";

// Pushes gennyFLow to window object so it can be called in Webflow
if (typeof window !== "undefined") {
  (window as any).ImageExporter = ImageExporter;
}

export { ImageExporter };
