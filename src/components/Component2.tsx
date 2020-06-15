import React from "react";
import { useSharedCountsStore } from "../store/stores/useSharedCountsStore";

export const Component2: React.FC<unknown> = function () {
  console.log("Component_2");
  const [e, setAllCounts] = useSharedCountsStore((state) => state.b.d.e);
  console.log({ e });
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
      <div>{JSON.stringify({ e }, null, 2)}</div>
    </>
  );
};
