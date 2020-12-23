import React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// Lazy load in nextjs
const DynamicComponentStepOne = dynamic(
    () => import('./stepone'),
    { loading: () => <p>Loading...</p> }
);
const DynamicComponentStepTwo = dynamic(
    () => import('./steptwo'),
    { loading: () => <p>Loading...</p> }
);
const DynamicComponentStepThree = dynamic(
    () => import('./steptwo'),
    { loading: () => <p>Loading...</p> }
);

// Static data
const stepComponents = [
    {
        key: '1',
        name: `Step 1`,
        component: (id) => (
            <DynamicComponentStepOne
                pageId={id}
                firstPageId={stepComponents[0].key}
                lastPageId={stepComponents[stepComponents.length - 1]}
            />
        )
    },
    {
        key: '2',
        name: `Step 2`,
        component: (id) => (
            <DynamicComponentStepTwo
                pageId={id}
                firstPageId={stepComponents[0].key}
                lastPageId={stepComponents[stepComponents.length - 1]}
            />
        )
    },
    {
        key: '3',
        name: `Step 3`,
        component: (id) => (
            <DynamicComponentStepThree
                pageId={id}
                firstPageId={stepComponents[0].key}
                lastPageId={stepComponents[stepComponents.length - 1]}
            />
        )
    }
];

function StepForm() {
    const routeConfig = useRouter();
    const { query: { stepId } } = routeConfig;

    return (
        <React.Fragment>
            <h2>You're in step: {stepId} </h2>

            { stepComponents.find(item => {
                if (stepId !== undefined) {
                    return stepId.toString() === item.key;
                }
            }).component(stepId.toString())}


        </React.Fragment>
    )
}



StepForm.getInitialProps = async (ctx) => {
    return { stepComponents: stepComponents }
}


export default StepForm;