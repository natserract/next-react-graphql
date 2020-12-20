
import { useForm, FormProvider, useFormContext, Control, useWatch } from 'react-hook-form';

export default function withReactHookForm(WrappedComponent, restProps) {
    const HOC = () => {
        const methods = useForm();

        return (
            <FormProvider {...methods}>
                <WrappedComponent {...WrappedComponent} />
            </FormProvider>
        )
    }

    return HOC;
}