import { StepRootState, StepActionStatus } from '../models/step.model';
import { StepActions } from '../actions/step.action';

export const stepInitialState: StepRootState = {
    data: [],
    formData: {
        key: '',
        fields: {}
    },
    prevFormData: []
};

export const StepReducer = (state: StepRootState = stepInitialState, action: StepActions): StepRootState => {
    switch(action.type) {
        case StepActionStatus.LOAD_STEP: {
            return {
                ...state,
                data: action.payload.data
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
                prevFormData: [...state.prevFormData.concat(action.payload.allFields)].reverse().sort()
            }
        }
        case StepActionStatus.REPLACE_DATA: {
            return {
                ...state,
                prevFormData: action.payload.replaceFields
            }
        }
        case StepActionStatus.CLEAR_FORM_DATA: {
            return {
                ...state,
                prevFormData: []
            }
        }
        default: throw new Error();
    }
}
