import { buildUseStore } from "../buildUseStore";

export let useSharedCounts = buildUseStore({
  a: 0,
  b: { c: 0, d: { e: 0, f: 0 } },
});
