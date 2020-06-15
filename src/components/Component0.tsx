import React from "react";
import { useSharedCounts } from "../store/stores/useStaredCuntsStore";

export const Component0: React.FC<unknown> = function () {
  console.log("Component_0");
  const [a, setAllCounts] = useSharedCounts((state) => {
    return state.a;
  });
  console.log({ a });
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
      <div>{JSON.stringify({ a }, null, 2)}</div>
    </>
  );
};
