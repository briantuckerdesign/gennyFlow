import { gennyFlow } from "./gennyFlow";

// Pushes gennyFLow to window object so it can be called in Webflow
if (typeof window !== "undefined") {
  (window as any).gennyFlow = gennyFlow;
}

export { gennyFlow };
