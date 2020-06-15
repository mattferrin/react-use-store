import React from "react";
import { buildUseStore } from "../stores/buildUseStore";

export let useSharedCounts = buildUseStore({
  a: 0,
  b: { c: 0, d: { e: 0, f: 0 } },
});

export const Component0: React.FC<unknown> = function () {
  console.log("Component_0");
  const [allCounts, setAllCounts] = useSharedCounts((state) => {
    return state.b.d;
  });
  return (
    <>
      <div>Component 0</div>
      <button
        onClick={() => {
          setAllCounts((allCounts) => ({ ...allCounts, a: allCounts.a + 1 }));
        }}
      >
        Click 0
      </button>
      <div>{JSON.stringify({ allCounts }, null, 2)}</div>
    </>
  );
};
