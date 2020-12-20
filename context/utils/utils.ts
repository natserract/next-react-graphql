import React from 'react';
import { StepContext, DispatchStepContext } from '../';

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

export function useReducer<StateType, ActionType>(
    reducer: React.Reducer<StateType, ActionType>,
    initialState: StateType) {

    const [state, dispatch] = React.useReducer<React.Reducer<StateType, ActionType>>(reducer, initialState);

    return [
        state,
        dispatch
    ] as const
}

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