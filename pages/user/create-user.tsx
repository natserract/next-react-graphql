import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormInput from '../../components/forms/formInput';
import { ColumnsData, RegisterFormData } from './create-user.model';
import { DISPLAYED_COLUMNS_DATA } from './create-user.static';
import GenericMap from '../../components/generic/genericMap';
import { useAddUserMutation } from '../../__generated__/v2/typescript_operations';
import { withApollo } from '../../apollo/withApolloCient';

function CreateUser() {
    const [ addUser ] = useAddUserMutation();
    
    const hookFormMethods = useForm<RegisterFormData>();
    const fieldData: ColumnsData[] = DISPLAYED_COLUMNS_DATA;
    const {
        handleSubmit,
        errors
    } = hookFormMethods;

    const onSubmit = handleSubmit(async (result) => {
        const { data } = await addUser({
            variables: {
                ...result,
                age: parseInt(result.age)
            }
        });
    });


    return (
        <div className="createUser-form">
            <h1>Create User</h1>

            <FormProvider {...hookFormMethods}>
                <form onSubmit={onSubmit}>
                    <Grid container>
                        <GenericMap items={fieldData} render={(item: ColumnsData, index) => (
                            <Grid item md={12} xs={12} key={index}>
                                <FormControl>
                                    <FormInput
                                        name={item.name}
                                        label={item.label}
                                        errorobj={errors}
                                        required={item.required}
                                        errormessage={item.errorMessage}
                                    />
                                </FormControl>
                            </Grid>
                        )} />

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onSubmit}
                            type="button">
                            Create User
                        </Button>
                    </Grid>
                </form>
            </FormProvider>
        </div>
    )
}


export default withApollo(CreateUser);