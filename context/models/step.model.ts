export interface StepRootState {
    componentContainer: StepData[];
    formData: StepDefaultField;
    storedFormData: StepDefaultField[];
    formDataResult: StepDefaultField[];
}

export interface StepData {
    key: string | string[];
    name: string;
    component: JSX.Element;
}

export interface StepDefaultField {
    key: string;
    fields: Object
}


export enum StepActionStatus {
    LOAD_STEP = '@@LOAD_STEP',
    ADD_FORM_DATA_DEFAULT = '@@ADD_FORM_DATA_DEFAULT',
    ADD_FORM_DATA_PREV = '@@ADD_FORM_DATA_PREV',
    FORM_DATA_RESULT = '@@FORM_DATA_RESULT',
    REPLACE_DATA = '@@REPLACE_DATA',
    CLEAR_FORM_DATA = '@@CLEAR_FORM_DATA',
    CLEAR_FORM_DATA_RESULT = '@@CLEAR_FORM_DATA_RESULT'
}