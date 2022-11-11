import React from 'react';
import { Button } from 'primereact/button';
import { cn } from '@bem-react/classname';
import { Form } from 'react-final-form';


export interface SubmitButtonProps {
    className?: string;
    disabled?: boolean;
    onClick: () => Promise<void>;
    submitRef?: React.MutableRefObject<(() => void) | undefined>;
}

const cnSubmitButton = cn('SubmitButton');

// TODO make available to parallel submit

export const SubmitButton: React.FC<SubmitButtonProps> = ({ className, disabled = false, onClick, submitRef }) => (
    <Form onSubmit={onClick}>
        {({ handleSubmit, submitting, form }) => {
            if (submitRef) {
                submitRef.current = () => form.submit();
            }

            return (
                <Button className={cnSubmitButton(null, [className, 'p-button-success', 'p-button-outlined'])}
                        disabled={disabled || submitting} onClick={handleSubmit}
                        icon={submitting ? 'pi pi-spin pi-spinner' : 'pi pi-play'}
                        iconPos="left" label="Submit" />
            );
        }}
    </Form>
);
