import React from 'react';
import { StepContext, DispatchStepContext } from '../context';

export function useCtx() {
    const stepContext = React.useContext(StepContext);
    if (stepContext === undefined) throw new Error('Must be used within a Provider');

    return {
        stepContext
    }
}

export function useCtxDispatch() {
    const dispatchStepContext = React.useContext(DispatchStepContext);
    if (dispatchStepContext === undefined) throw new Error('Must be used within a Provider');

    return {
        dispatchStepContext
    }
}
/**
 * @param  {React.Reducer<StateType} reducer
 * @param  {} ActionType>
 * @param  {StateType} initialState
 */
export function useReducer<StateType, ActionType>(
    reducer: React.Reducer<StateType, ActionType>,
    initialState: StateType) {

    const [state, dispatch] = React.useReducer<React.Reducer<StateType, ActionType>>(reducer, initialState);

    return [
        state,
        dispatch
    ] as const
}
/**
 * @param  {string} key
 * @param  {React.Reducer<StateType} reducer
 * @param  {} ActionType>
 * @param  {StateType} initialState
 */
export function useLocalStorageReducer<StateType, ActionType>(
    key: string,
    reducer: React.Reducer<StateType, ActionType>,
    initialState: StateType,
) {
    const [state, dispatch] = React.useReducer<React.Reducer<StateType, ActionType>>(
        reducer, typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem(key)) || initialState : initialState
    );

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            window.localStorage.setItem(key, JSON.stringify(state)), [state, key]
        }
    });

    return [
        state,
        dispatch
    ] as const
}

/**
 * @param  {Array<T>} items
 */
export function useUniqueArray<T>(items: Array<T>) {
    /**
     * @param  {} (set=>f=>!set.has(f.key)
     * @param  {} &&set.add(f.key)
     * @param  {} (newSet)
     */
    return items.filter((set => f => !set.has(f.key) && set.add(f.key))(new Set));
}

/**
 * @param  {()=>void} fn
 */
export function useWindowOnLoad(
    fn: () => void
) {
    if (typeof window !== "undefined") {
        window.onload = () => fn();
    }
}

/**
 * @param  {Array<any>} items
 * @returns boolean
 */
export function isArrayHaveDuplicate(
    items: Array<any>
): boolean {
    let result = false;
    items.map(v => v.key).sort().sort((a, b): any => {
        if (a === b) result = true;
    });

    return result;
}

