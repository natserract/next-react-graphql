import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Router, { useRouter } from 'next/router';
import { useCtx, useCtxDispatch } from '../../utils/utils';
import Button from '@material-ui/core/Button';
import { useUniqueArray, useWindowOnLoad, isArrayHaveDuplicate } from '../../utils/utils';
import { initFormData, setActivePageIndex, updateStepItems, dispatchNewFormData, dispatchFormDataResult, clearFormDaata } from './[step].service';
import { fieldsForm, IsShowed, dispatchListOfComponent } from './[stepId.static';

function Step() {
    const { stepContext } = useCtx();
    const { dispatchStepContext } = useCtxDispatch();

    const routeConfig = useRouter();
    const { query: { stepId } } = routeConfig;

    const [state, setState] = useState<{ checked: boolean }>({
        checked: false
    });
    const [prevUrl, setPrevUrl] = useState(stepId);
    const [showResultData, setShowResultData] = useState(false);

    let firstIndexData: string | string[] = null;
    let lastIndexData: string | string[] = null;
    let getPageIndex = null;
    let storedUniqueArray = [];
    let isHaveDuplicateItem = false;
    let activeStepId = null;

    const changeCheckedVal = () => {
        setState({
            checked: !state.checked
        })
    }

    const { componentContainer, storedFormData, formDataResult } = stepContext;
    const methods = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange'
    });
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState,
    } = methods;
    const { isValid } = formState;

    if (stepId !== prevUrl) {
        setPrevUrl(stepId);
    }

    const onSubmit = handleSubmit((data) => {
        // Is valid works if you handle with mode 'onChange' -> useForm()
        if (isValid) {
            dispatchNewFormData(dispatchStepContext, data, stepId.toString());

            if (stepId !== lastIndexData) {
                Router.push(`/step/${parseInt(stepId.toString()) + 1}`);
            } else {
                setShowResultData(true);
                dispatchFormDataResult(dispatchStepContext);
                clearFormDaata(dispatchStepContext);
                
                Router.replace(`/step/${firstIndexData}`);

                // If done after async process 
                // you can dispatch CLEAR_FORM_DATA_RESULT
            }
        }
    });

    useWindowOnLoad(() => dispatchListOfComponent(dispatchStepContext, storedFormData, getPageIndex));

    setActivePageIndex(storedFormData, stepId.toString(), (o) => {
        getPageIndex = o;
    });

    const prevPageHandler = () =>{
        Router.push(`/step/${parseInt(stepId.toString()) - 1}`);
        setShowResultData(false);
    }

    useEffect(() => {
        initFormData(
            dispatchStepContext,
            stepId.toString(),
            fieldsForm
        );

        activeStepId = stepId.toString();
    }, []);

    useEffect(() => {
        dispatchListOfComponent(dispatchStepContext, storedFormData, getPageIndex);
        isHaveDuplicateItem = isArrayHaveDuplicate(storedFormData);

        // If have duplicate Items
        const resultNewArray: Array<any> = useUniqueArray(storedFormData);
        if (isHaveDuplicateItem) {
            storedUniqueArray = resultNewArray;
        }

        activeStepId = stepId.toString();

    }, [stepId]);

    useEffect(() => {
        if (isHaveDuplicateItem) {
            updateStepItems(
                dispatchStepContext,
                storedUniqueArray.reverse()
            );
        };

    }, [stepId, isHaveDuplicateItem, activeStepId]);

    if (componentContainer.length !== 0) {
        firstIndexData = componentContainer[0].key;
        lastIndexData = componentContainer[componentContainer.length - 1].key;
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


                    {componentContainer.map(item => {
                        if (stepId !== undefined) {
                            if (stepId.toString() === item.key) {
                                return componentContainer[parseInt(item.key) - 1].component;
                            }
                        }
                    })}

                    {/* implement of useWatch, be like ngModel */}
                    <IsShowed state={state} control={control} />

                    {/* Button Navigation */}
                    <Button
                        variant="contained"
                        onClick={() => prevPageHandler()}
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
                </form>
            </FormProvider>

            {showResultData ? (
                <div>
                    <h1>You're result: </h1>
                    <p>{JSON.stringify(formDataResult)}</p>
                </div>
            ) : null }
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