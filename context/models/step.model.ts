export interface StepRootState {
    data: StepData[];
    formData: StepDefaultField;
    prevFormData: any;
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
    REPLACE_DATA = '@@REPLACE_DATA',
    CLEAR_FORM_DATA = '@@CLEAR_FORM_DATA'
}