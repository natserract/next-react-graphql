import React, { useState } from 'react';
import Router, { useRouter } from 'next/router';
import { useCtx } from '../../utils/utils';
import StepOne from './pages/stepOne';
import StepTwo from './pages/stepTwo';
import StepThree from './pages/stepThree';

// Static data
const stepComponents = [
    {
        key: '1',
        name: `Step 1`,
        component: (id) => <StepOne pageId={id} firstPageId={stepComponents[0].key} lastPageId={stepComponents[stepComponents.length - 1].key} />
    },
    {
        key: '2',
        name: `Step 2`,
        component: (id) => (
            <StepTwo
                pageId={id}
                firstPageId={stepComponents[0].key}
                lastPageId={stepComponents[stepComponents.length - 1].key}
            />
        )
    },
    {
        key: '3',
        name: `Step 3`,
        component: (id) => (
            <StepThree
                pageId={id}
                firstPageId={stepComponents[0].key}
                lastPageId={stepComponents[stepComponents.length - 1].key}
            />
        )
    }
];
function StepForm() {
    const { stepContext } = useCtx();
    const { stepState, updateStepState } = stepContext;

    const routeConfig = useRouter();
    const { query: { stepId } } = routeConfig;


    // codesandbox
    // validasi
    // multi usewatch in every step
    // cheeckbox state save to ctx

    return (
        <React.Fragment>
            <h2>You're in step: {stepId} </h2>
        
            { stepComponents.find(item => {
                if (stepId !== undefined) {
                    return stepId.toString() === item.key;
                }
            }).component(stepId.toString())}

            {/* <IsShowed state={state} control={control} /> */}
        </React.Fragment>
    )
}



StepForm.getInitialProps = async (ctx) => {
    return { stepComponents: stepComponents }
}


export default StepForm;