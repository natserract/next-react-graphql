import { StepRootState, StepActionStatus } from '../models/step.model';
import { StepActions } from '../actions/step.action';

export const stepInitialState: StepRootState = {
    componentContainer: [],
    formData: {
        key: '',
        fields: {}
    },
    storedFormData: [],
    formDataResult: []
};

export const StepReducer = (state: StepRootState = stepInitialState, action: StepActions): StepRootState => {
    switch(action.type) {
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
                formData: stepInitialState.formData,
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
