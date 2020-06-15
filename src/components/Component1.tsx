import React from "react";
import { useSharedCounts } from "../store/stores/useStaredCuntsStore";

export const Component1: React.FC<unknown> = function () {
  console.log("Component_1");
  const [c, setAllCounts] = useSharedCounts((state) => {
    return state.b.c;
  });
  console.log({ c });
  return (
    <>
      <div>Component 1</div>
      <button
        onClick={() => {
          setAllCounts((allCounts) => ({
            ...allCounts,
            a: allCounts.a + 1,
            b: { ...allCounts.b, c: allCounts.b.c + 1 },
          }));
        }}
      >
        Click 1
      </button>
      <div>{JSON.stringify({ c }, null, 2)}</div>
    </>
  );
};
