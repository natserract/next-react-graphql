import React from 'react';
import { useWatch, useForm } from 'react-hook-form';

const SpecialStep = ({ control, state }) => {
    const methods = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange'
    });
    const { register } = methods;

    const renderInput = useWatch({
        control,
        name: 'inputCheck',
        defaultValue: state.checked
    });

    if (renderInput) {
        return (
            <div className="form-group">
                <label htmlFor="age">Age </label>
                <input type="text" name="inputAge" ref={register} />
            </div>
        )
    }
    return null;
}

export default SpecialStep;