import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { DispatchType } from "../../context";
import { StepActions } from "../../context/actions/step.action";
import { StepActionStatus } from "../../context/models/step.model";

// Initial context state 
// for default value form
export const fieldsForm = {
    inputName: '',
    inputAge: '',
    inputEmail: '',
    inputPhone: ''
}

export const StepOneComponent = ({ defaultValue, index }) => {
    const { register } = useFormContext();

    return (
        <React.Fragment>
            <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input type="text" name="inputName" placeholder="Name" defaultValue={defaultValue[index] !== undefined ? defaultValue[index].fields.inputName : ''} ref={register({ required: true })} />
            </div>

            <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input type="text" name="inputEmail" placeholder="Email" maxLength={5} defaultValue={defaultValue[index] !== undefined ? defaultValue[index].fields.inputEmail : ''} ref={register({ required: true, maxLength: 5 })} />
            </div>
        </React.Fragment>
    )
}

export const StepTwoComponent = ({ defaultValue, index }) => {
    const { register } = useFormContext();

    return (
        <React.Fragment>
            <div className="form-group">
                <label htmlFor="phone">Phone *</label>
                <input type="phone" name="inputPhone" placeholder="Phone" defaultValue={defaultValue[index] !== undefined ? defaultValue[index].fields.inputPhone : ''} ref={register({ required: true })} />
            </div>
        </React.Fragment>
    )
}

export const StepThreeComponent = ({ defaultValue, index }) => {
    const { register } = useFormContext();

    return (
        <React.Fragment>
            <div className="form-group">
                <label htmlFor="age">Age *</label>
                <input type="number" name="inputAge" placeholder="Age" defaultValue={defaultValue[index] !== undefined ? defaultValue[index].fields.inputAge : ''} ref={register({ required: true })} />
            </div>

        </React.Fragment>
    )
}

export const IsShowed = ({ control, state }) => {
    const { register } = useFormContext();

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

export const dispatchListOfComponent = (
    dispatch: DispatchType<StepActions>,
    items: Array<any>,
    pageIndex: number
) => {
    return dispatch({
        type: StepActionStatus.LOAD_STEP,
        payload: {
            data: [
                {
                    key: '1',
                    name: `Step 1`,
                    component: <StepOneComponent key={'1'} index={pageIndex} defaultValue={items !== null ? items : "undefined"} />
                },
                {
                    key: '2',
                    name: `Step 2`,
                    component: <StepTwoComponent key={'2'} index={pageIndex} defaultValue={items !== null ? items : "undefined"} />
                },
                {
                    key: '3',
                    name: `Step 3`,
                    component: <StepThreeComponent key={'3'} index={pageIndex} defaultValue={items !== null ? items : "undefined"} />
                }
            ]
        }
    });
}