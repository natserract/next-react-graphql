import React, { useState, useEffect, memo } from 'react';
import { useForm, FormProvider, useFormContext, Control, useWatch } from 'react-hook-form';
import Router, { useRouter } from 'next/router';
import { useCtx, useCtxDispatch } from '../../context/utils/utils';
import { StepActionStatus } from '../../context/models/step.model';
import Button from '@material-ui/core/Button';
import { StepActions } from '../../context/actions/step.action';

const StepOneComponent = ({ defaultValue, index }) => {
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

const StepTwoComponent = ({ defaultValue, index }) => {
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

const StepThreeComponent = ({ defaultValue, index }) => {
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


function Step() {
    const { dispatchStepContext } = useCtxDispatch();
    const { LOAD_STEP, ADD_FORM_DATA_DEFAULT, ADD_FORM_DATA_PREV, CLEAR_FORM_DATA, REPLACE_DATA } = StepActionStatus;

    const routeConfig = useRouter();
    const { query: { stepId }, events } = routeConfig;

    const { stepContext } = useCtx();

    const [state, setState] = useState<{ checked: boolean }>({
        checked: false
    });
    const [prevUrl, setPrevUrl] = useState(stepId);

    let firstIndexData: string | string[] = null;
    let lastIndexData: string | string[] = null;
    let findPageIndex = null;
    let storedUniqueArray = [];
    let isHaveDuplicateItem = false;
    let activeStepId = null;

    const changeCheckedVal = () => {
        setState({
            checked: !state.checked
        })
    }

    const { data, formData } = stepContext;
    const methods = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange'
    });
    const {
        register,
        handleSubmit,
        reset,
        formState,
    } = methods;
    const { isValid } = formState;

    if (stepId !== prevUrl) {
        setPrevUrl(stepId);
    }

    const IsShowed = ({ control }: { control: Control }) => {
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

    const onSubmit = handleSubmit(async (data) => {
        // Is valid works if you handle with mode 'onChange' -> useForm()
        if (isValid) {
            dispatchNewFormData(data);
            Router.push(`/step/${parseInt(stepId.toString()) + 1}`);
        }
    });


    const dispatchNewFormData = (data): void => {
        dispatchStepContext({
            type: ADD_FORM_DATA_DEFAULT,
            payload: {
                defaultFields: {
                    key: stepId.toString(),
                    fields: data
                }
            }
        });

        dispatchStepContext({
            type: ADD_FORM_DATA_PREV,
            payload: {
                allFields: [{
                    key: stepId.toString(),
                    fields: data
                }]
            }
        });
    }

    if (typeof window !== "undefined") {
        window.onload = (_event) => {
            dispatchListOfComponent();
        }
    }

    for (var i = 0; i < stepContext.prevFormData.length; i++) {
        if (stepContext.prevFormData[i].key == stepId.toString()) {
            findPageIndex = i;
            break;
        }
    }


    const dispatchListOfComponent = () => {
        return dispatchStepContext({
            type: LOAD_STEP,
            payload: {
                data: [
                    {
                        key: '1',
                        name: `Step 1`,
                        component: <StepOneComponent key={'1'} index={findPageIndex} defaultValue={stepContext.prevFormData !== null ? stepContext.prevFormData : "undefined"} />
                    },
                    {
                        key: '2',
                        name: `Step 2`,
                        component: <StepTwoComponent key={'2'} index={findPageIndex} defaultValue={stepContext.prevFormData !== null ? stepContext.prevFormData : "undefined"} />
                    },
                    {
                        key: '3',
                        name: `Step 3`,
                        component: <StepThreeComponent key={'3'} index={findPageIndex} defaultValue={stepContext.prevFormData !== null ? stepContext.prevFormData : "undefined"} />
                    }
                ]
            }
        });
    }

    // Initial context state 
    // for default value form
    const fieldsForm = {
        inputName: '',
        inputAge: '',
        inputEmail: '',
        inputPhone: ''
    }

    const dispatchInitFormData = () => {
        return dispatchStepContext({
            type: ADD_FORM_DATA_DEFAULT,
            payload: {
                defaultFields: {
                    key: stepId.toString(),
                    fields: fieldsForm
                }
            }
        })
    }

    useEffect(() => {
        dispatchInitFormData();
        activeStepId = stepId.toString();
    }, []);

    useEffect(() => {
        dispatchListOfComponent();
        activeStepId = stepId.toString();

        const dataPrevForm = stepContext.prevFormData;

        stepContext.prevFormData.map(v => v.key).sort().sort((a, b) => {
            if (a === b) isHaveDuplicateItem = true;
        });

        // If have duplicate Items
        let unique: Array<any> = dataPrevForm.filter((set => f => !set.has(f.key) && set.add(f.key))(new Set));
        if (isHaveDuplicateItem) {
            storedUniqueArray = unique;
        }
    }, [stepId]);

    useEffect(() => {
        if (isHaveDuplicateItem) {
            dispatchStepContext({
                type: CLEAR_FORM_DATA
            });

            // No need key again
            dispatchStepContext({
                type: REPLACE_DATA,
                payload: {
                    replaceFields: storedUniqueArray.reverse()
                }
            });

        };

    }, [stepId, isHaveDuplicateItem, activeStepId]);

    if (stepContext.data.length !== 0) {
        firstIndexData = stepContext.data[0].key;
        lastIndexData = stepContext.data[data.length - 1].key;
    }

    return (
        <React.Fragment>
            <h2>You're in step: {stepId} </h2>
            <FormProvider {...methods}>
                <form action="">
                    <div className="form-group">
                        <label htmlFor="check">With age Y/N: </label>
                        <input
                            type="checkbox"
                            onChange={() => changeCheckedVal()}
                            name="inputCheck" ref={register}
                        />
                    </div>

                    {data.map((item, index) => {
                        if (stepId !== undefined) {
                            if (stepId.toString() === item.key) {
                                { JSON.stringify(data) }
                                return data[parseInt(item.key) - 1].component;
                            }
                        }
                    })}

                    {/* <IsShowed control={control} /> */}

                    {/* Button Navigation */}
                    <Button
                        variant="contained"
                        onClick={() => Router.push(`/step/${parseInt(stepId.toString()) - 1}`)}
                        disabled={stepId === firstIndexData ? true : false}>
                        Back
                    </Button>


                    {stepId === lastIndexData ? (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onSubmit}>
                            Submit
                        </Button>
                    ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={onSubmit}
                                disabled={stepId === lastIndexData ? true : false}>
                                Next Step
                            </Button>
                        )}

                    <br />
                    <br />
                    <br />

                    <br />

                    {/* {JSON.stringify(`Line activeformData in step ${stepId}`)}
                    {JSON.stringify(stepContext.formData)} */}

                    <br />
                    {JSON.stringify(`Line AllData`)}
                    {JSON.stringify(stepContext.prevFormData)}
                    {/* {JSON.stringify(formState)} */}

                </form>
            </FormProvider>
        </React.Fragment>
    )
}

// Like resolvers in Angular
Step.getInitialProps = async (ctx) => {
    return {
        resolve: 'Time'
    }
}

export default Step;