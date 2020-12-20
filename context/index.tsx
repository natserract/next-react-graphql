
import React from 'react';
import { stepInitialState, StepReducer } from './reducers/step.reducer';
import { StepActions } from './actions/step.action';
import { StepRootState } from './models/step.model';
import { useReducer, useLocalStorageReducer } from '../utils/utils';

export type DispatchType<T> = (action: T) => void;

export const StepContext = React.createContext<StepRootState | undefined>(undefined);
export const DispatchStepContext = React.createContext<DispatchType<StepActions> | undefined>(undefined);

export function Store(props: React.PropsWithChildren<{}>) {
    const [ StepState, StepDispatch ] = useReducer(StepReducer, stepInitialState);

    return (
        <StepContext.Provider value={StepState}>
            <DispatchStepContext.Provider value={StepDispatch}>
                {props.children}
            </DispatchStepContext.Provider>
        </StepContext.Provider>
    )
}