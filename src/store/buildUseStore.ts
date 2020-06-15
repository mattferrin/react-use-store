import { useEffect, useState, Dispatch } from "react";

// helps others insure continuous uninterrupted paths through their code
// ... helps result in a final calculated value (exhaustiveness checking)
class ExhaustiveReturns {}

// setter type
type SetStoreInput<State> = (state: State) => State;
export type SetStore<State> = (
  newValue: SetStoreInput<State>
) => ExhaustiveReturns;

// hook type
type UseStoreInput<State, SubState> = (state: State) => SubState;
type UseStoreOutput<State, SubState> = [SubState, SetStore<State>];

// returns hook type
type BuildUseStoreOutput<State> = <SubState>(
  initialValue: UseStoreInput<State, SubState>
) => UseStoreOutput<State, SubState>;

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

  /**
   * @param A selector function (similar to Redux useSelector).
   * @return A computed value from state, and a state setter.
   */
  return (selector) => {
    const [, forceUpdate] = useState();
    useEffect(() => {
      if (!forceUpdates.includes(forceUpdate)) {
        // add setState to list, so calling it triggers rerender
        forceUpdates.push(forceUpdate);
      }
      if (!selectors.includes(selector)) {
        // add selector to list, so rerender can be skipped if the computed value is unchanged
        selectors.push(selector);
      }
      return () => {
        // remove unmounted component from lists
        forceUpdates = forceUpdates.filter((x) => x !== forceUpdate);
        selectors = selectors.filter((x) => x !== selector);
      };
    }, [forceUpdate, selector]);

    return [
      // computed value from state
      selector(value),
      // setter for state
      (newValue) => {
        const nextValue = newValue(value);
        forceUpdates.forEach((setValue, i) => {
          if (selectors[i](nextValue) !== selectors[i](value)) {
            // useState setter triggers rerender with new value
            setValue(nextValue);
          }
        });
        value = nextValue;
        return new ExhaustiveReturns();
      },
    ];
  };
}
