import React from 'react';
import Button from '@material-ui/core/Button';
import Router from 'next/router';
import { StepData } from '../../../context/models/step.model';


export default function StepButton({ pageId, firstPageId, lastPageId, formMethods, formState, updateStepState }) {
    const prevPageHandler = React.useCallback(() => {
        Router.push(`/step/${parseInt(pageId) - 1}`);
    }, [pageId]);

    const { handleSubmit } = formMethods;
    const { isValid } = formState;

    const onSubmit = handleSubmit((data: StepData) => {
        // Is valid works if you handle with mode 'onChange' -> useForm()
        if (isValid) {
            updateStepState(data);

            if (pageId !== lastPageId) {
                Router.push(`/step/${parseInt(pageId) + 1}`);
            } else {
                Router.replace(`/step/${firstPageId}`);
            }
        }
    });

    return (
        <React.Fragment>
            <Button
                variant="contained"
                onClick={prevPageHandler}
                disabled={pageId === firstPageId ? true : false}>
                Back
                    </Button>
            {
                pageId === lastPageId ? (
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
                            disabled={pageId === lastPageId ? true : false}>
                            Next Step
                        </Button>
                    )
            }
        </React.Fragment>
    )
}