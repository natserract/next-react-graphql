
import React from 'react';
import { stepInitialState } from './reducers/step.reducer';
import { StepActions } from './actions/step.action';
import { StepRootState, StepData } from './models/step.model';
import { useReducer, useLocalStorageReducer } from '../utils/utils';

export type DispatchType<T> = (action: T) => void;

export const StepContext = React.createContext<{ stepState: StepData, updateStepState: React.Dispatch<React.SetStateAction<StepData>> } | undefined>(undefined);
export const DispatchStepContext = React.createContext<DispatchType<StepActions> | undefined>(undefined);

export function Store(props: React.PropsWithChildren<{}>) {
    const [stepState, setStepState] = React.useState<StepData>(stepInitialState);
    const updateStepState = React.useCallback(({ inputName, inputPassword, inputPhone, inputEmail, selectDrink, gender }) => {
        setStepState(state => ({
            inputName: inputName || state.inputName,
            inputPassword: inputPassword || state.inputPassword,
            inputPhone: inputPhone || state.inputPhone,
            inputEmail: inputEmail || state.inputEmail,
            selectDrink: selectDrink || state.selectDrink,
            gender: gender || state.gender
        }));
    }, []);

    const [value, setValue] = React.useState({
        stepState: stepState,
        updateStepState: updateStepState
    });


    React.useEffect(() => {
        setValue({
            stepState: stepState,
            updateStepState: updateStepState
        });
    }, [stepState])

    return (
        <StepContext.Provider value={value}>
            { props.children }
        </StepContext.Provider>
    )
}