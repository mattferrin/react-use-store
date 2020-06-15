import { useEffect, useState, Dispatch } from "react";

class ExhaustiveReturns {}

type SetStoreInput<State> = (t: State) => State;
export type SetStore<State> = (
  input: SetStoreInput<State>
) => ExhaustiveReturns;

type UseStoreInput<State> = (state: State) => unknown;
type UseStoreOutput<State> = [State, SetStore<State>];
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

  return () => {
    const [, forceUpdate] = useState();
    useEffect(() => {
      if (!forceUpdates.includes(forceUpdate)) {
        forceUpdates.push(forceUpdate);
      }
      return () => {
        forceUpdates = forceUpdates.filter((x) => x !== forceUpdate);
      };
    }, [forceUpdate]);

    return [
      value,
      (newValue) => {
        value = newValue(value);
        forceUpdates.forEach((x) => x(newValue(value)));
        return new ExhaustiveReturns();
      },
    ];
  };
}
