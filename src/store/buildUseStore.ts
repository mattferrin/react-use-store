import { useEffect, useState, Dispatch } from "react";

class ExhaustiveReturns {}

type SetStoreInput<State> = (state: State) => State;
export type SetStore<State> = (
  newValue: SetStoreInput<State>
) => ExhaustiveReturns;

type UseStoreInput<State> = (state: State) => unknown;
type UseStoreOutput<State> = [unknown, SetStore<State>];
type BuildUseStoreOutput<State> = (
  initialValue: UseStoreInput<State>
) => UseStoreOutput<State>;

/**
 * @param Initial value.
 * @return A React hook similar to useState that can be used get/set 1 global
 * state value.
 */
export function buildUseStore<State>(
  initialValue: State
): BuildUseStoreOutput<State> {
  let value = initialValue;
  let forceUpdates: Dispatch<State>[] = [];
  let selectors: Dispatch<State>[] = [];

  return (selector) => {
    const [, forceUpdate] = useState();
    useEffect(() => {
      if (!forceUpdates.includes(forceUpdate)) {
        forceUpdates.push(forceUpdate);
      }
      if (!selectors.includes(selector)) {
        selectors.push(selector);
      }
      return () => {
        forceUpdates = forceUpdates.filter((x) => x !== forceUpdate);
        selectors = selectors.filter((x) => x !== selector);
      };
    }, [forceUpdate, selector]);

    return [
      selector(value),
      (newValue) => {
        const nextValue = newValue(value);
        forceUpdates.forEach((x, i) => {
          if (selectors[i](nextValue) !== selectors[i](value)) {
            console.log({ i });
            x(newValue(value));
          }
        });
        value = newValue(value);
        return new ExhaustiveReturns();
      },
    ];
  };
}
