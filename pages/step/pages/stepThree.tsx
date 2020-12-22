import React from 'react';
import { useWatch, useForm, useFormContext } from 'react-hook-form';
import { useCtx } from '../../../utils/utils';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import StepButton from '../components/stepButton';
import StepFormErrorLogs from '../components/validationLogs';

const schema = yup.object().shape({
    inputPassword: yup.string().required()
});

const StepThree = ({ pageId, firstPageId, lastPageId }) => {
    const methods = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
        resolver: yupResolver(schema, {
            abortEarly: false
        })
    });

    const {
        register,
        formState,
        errors,
        control
    } = methods;
    const { stepContext } = useCtx();
    const { stepState, updateStepState } = stepContext;

    const renderInput = useWatch({
        control,
        name: 'inputPassword',
        defaultValue: '',
    });

    return (
        <React.Fragment>
            <form>
                <div className="form-group">
                    <label htmlFor="age">Password *</label>
                    <input type="password" name="inputPassword" placeholder="Password" defaultValue={stepState.inputPassword} ref={register} />
                </div>

                <div className="form-group">
                    <label htmlFor="age">Your unhidden Password :p</label>
                    <input type="text" name="unhiddenPassword" readOnly placeholder="unhidden password" value={renderInput} ref={register} />
                </div>

                <StepButton
                    pageId={pageId}
                    firstPageId={firstPageId}
                    lastPageId={lastPageId}
                    formMethods={methods}
                    formState={formState}
                    updateStepState={updateStepState}
                />
            </form>

            <StepFormErrorLogs logs={errors}/>
        </React.Fragment>
    )
}

export default StepThree;