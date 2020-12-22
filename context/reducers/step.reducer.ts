import { StepActions } from '../actions/step.action';
import { StepRootState, StepActionStatus, StepData } from '../models/step.model';

export const stepInitialStateWReducer = {
    componentContainer: [],
    formData: {
        key: '',
        fields: {}
    },
    storedFormData: [],
    formDataResult: []
};

export const stepInitialState: StepData = {
    inputName: "",
    inputPassword: "",
    inputEmail: "",
    inputPhone: "",
    selectDrink: "",
    gender: ""
};

export const StepReducer = (state = stepInitialStateWReducer, action: StepActions) => {
    switch (action.type) {
        case StepActionStatus.LOAD_STEP: {
            return {
                ...state,
                componentContainer: action.payload.data
            };
        }
        case StepActionStatus.ADD_FORM_DATA_DEFAULT: {
            return {
                ...state,
                formData: action.payload.defaultFields
            }
        }
        case StepActionStatus.ADD_FORM_DATA_PREV: {
            return {
                ...state,
                storedFormData: [...state.storedFormData.concat(action.payload.allFields)].reverse().sort()
            }
        }
        case StepActionStatus.FORM_DATA_RESULT: {
            return {
                ...state,
                formDataResult: [...state.formDataResult.concat(state.storedFormData)]
            }
        }
        case StepActionStatus.REPLACE_DATA: {
            return {
                ...state,
                storedFormData: action.payload.replaceFields
            }
        }
        case StepActionStatus.CLEAR_FORM_DATA: {
            return {
                ...state,
                formData: stepInitialStateWReducer.formData,
                storedFormData: []
            }
        }
        case StepActionStatus.CLEAR_FORM_DATA_RESULT: {
            return {
                ...state,
                formDataResult: []
            }
        }
        default: throw new Error();
    }
}
