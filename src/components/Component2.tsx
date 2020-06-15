import React from "react";
import { useSharedCounts } from "./Component0";

export const Component2: React.FC<unknown> = function () {
  console.log("Component_2");
  const [allCounts, setAllCounts] = useSharedCounts((state) => state.a);
  return (
    <>
      <div>Component 2</div>
      <button
        onClick={() => {
          setAllCounts((allCounts) => ({
            ...allCounts,
            a: allCounts.a + 1,
            b: {
              ...allCounts.b,
              c: allCounts.b.c + 1,
              d: { ...allCounts.b.d, e: allCounts.b.d.e + 1 },
            },
          }));
        }}
      >
        Click 2
      </button>
      <div>{JSON.stringify({ allCounts }, null, 2)}</div>
    </>
  );
};
