import { StepActionStatus, StepData, StepDefaultField } from '../models/step.model';

export type StepActions =
    | { type: StepActionStatus.LOAD_STEP; payload: { data: StepData[] } }
    | { type: StepActionStatus.ADD_FORM_DATA_DEFAULT, payload: { defaultFields: StepDefaultField } }
    | { type: StepActionStatus.ADD_FORM_DATA_PREV, payload: { allFields: Array<StepDefaultField> } }
    | { type: StepActionStatus.REPLACE_DATA, payload: { replaceFields: any} }
    | { type: StepActionStatus.CLEAR_FORM_DATA }