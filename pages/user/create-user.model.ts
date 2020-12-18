export interface FormInputGroupsProps {
    items: ColumnsData[];
    error: Object;
}

export interface RegisterFormData {
    name: string;
    email: string;
    age: string;
}

export interface ColumnsData {
    name: string;
    label: string;
    errorMessage?: string;
    required: boolean
}   