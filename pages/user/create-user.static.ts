import { ColumnsData } from './create-user.model';

// Static Data
export const DISPLAYED_COLUMNS_DATA: ColumnsData[] = [
    {
        name: 'name',
        label: 'Name',
        required: true,
        errorMessage: "Name is required"
    },
    {
        name: 'email',
        label: 'Email',
        required: true,
        errorMessage: "Email is required"
    },
    {
        name: 'age',
        label: 'Age',
        required: false
    }
];
