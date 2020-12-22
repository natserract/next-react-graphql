import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useCtx } from '../../../utils/utils';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import StepButton from '../components/stepButton';
import StepFormErrorLogs from '../components/validationLogs';

const schema = yup.object().shape({
    inputName: yup.string().required('Input name is required'),
    inputEmail: yup.string().required('Input email is required').email(),
    selectDrink: yup.string().optional()
});

const StepOne = ({ pageId, firstPageId, lastPageId }) => {
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
        name: 'selectDrink',
        defaultValue: '',
    });

    return (
        <React.Fragment>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input type="text" name="inputName" placeholder="Name" defaultValue={stepState.inputName} ref={register} />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input type="text" name="inputEmail" placeholder="Email" defaultValue={stepState.inputEmail} ref={register} />
                </div>

                <div className="form-group">
                    <label htmlFor="drink">Suka minuman apa? : </label>

                    <input type="radio" id="age1" name="selectDrink" defaultChecked={stepState.selectDrink === '1' ? true : false} value="1" ref={register} />
                    <label >CocaCola</label>

                    <input type="radio" id="age2" name="selectDrink" defaultChecked={stepState.selectDrink === '2' ? true : false} value="2" ref={register} />
                    <label >Air minum</label>


                    {renderInput === '1' ? (
                        <p>Coca-Cola adalah minuman ringan berkarbonasi yang dijual di toko, restoran dan mesin penjual di lebih dari 200 negara. Minuman ini diproduksi oleh The Coca-Cola Company asal Atlanta, Georgia, dan sering disebut Coke saja</p>
                    ) : null}


                    {renderInput === '2' ? (
                        <p>Air minum adalah air yang digunakan untuk konsumsi manusia. Menurut departemen kesehatan, syarat-syarat air minum adalah tidak berasa, tidak berbau, tidak berwarna, tidak mengandung mikroorganisme yang berbahaya, dan tidak mengandung logam berat.</p>
                    ) : null}

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

            <StepFormErrorLogs logs={errors} />
        </React.Fragment>
    )
}

export default StepOne;