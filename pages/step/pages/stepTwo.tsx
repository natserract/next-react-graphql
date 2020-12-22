import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useCtx } from '../../../utils/utils';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import StepButton from '../components/stepButton';
import StepFormErrorLogs from '../components/validationLogs';
import maleImg from '../../../public/assets/img/male.jpg';
import femaleImg from '../../../public/assets/img/female.jpeg';
// import femaleImg from '../../../../public/assets/img/female.jpeg';

const schema = yup.object().shape({
    gender: yup.string().required('Select gender'),
    inputPhone: yup.string().required('Input name is required').max(13),
});

const StepTwo = ({ pageId, firstPageId, lastPageId }) => {
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
        name: 'gender',
        defaultValue: '',
    });

    return (
        <React.Fragment>
            <form>
                <div className="form-group">
                    <label htmlFor="drink">Pilih gender : </label>

                    <input type="radio" name="gender" value="male" defaultChecked={stepState.gender === 'male' ? true : false} ref={register} />
                    <label>Laki-laki</label>

                    <input type="radio" name="gender" value="female" defaultChecked={stepState.gender === 'female' ? true : false} ref={register} />
                    <label>Perempuan</label>

                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone *</label>
                    <input type="phone" name="inputPhone" placeholder="Phone" defaultValue={stepState.inputPhone} ref={register} />
                </div>

                <StepButton
                    pageId={pageId}
                    firstPageId={firstPageId}
                    lastPageId={lastPageId}
                    formMethods={methods}
                    formState={formState}
                    updateStepState={updateStepState}
                />


                {renderInput === 'male' ? (
                    <img src={maleImg} alt="" />
                ) : null}


                {renderInput === 'female' ? (
                    <img src={femaleImg} alt="" />
                ) : null}
            </form>

            <StepFormErrorLogs logs={errors} />
        </React.Fragment>
    )
}

export default StepTwo;