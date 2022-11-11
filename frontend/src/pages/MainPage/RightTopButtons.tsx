import React from 'react';
import { cn } from '@bem-react/classname';

import { SubmitButton } from '../../components/SubmitButton/SubmitButton';
import { LoginButton } from '../../components/LoginButton/LoginButton';

import './MainPage.css';


export interface RightTopButtonsProps {
    canSubmit: boolean;
    onSubmit: () => Promise<void>;
    submitRef: React.MutableRefObject<(() => void) | undefined>;
}

const cnMainPage = cn('MainPage');

export const RightTopButtons: React.FC<RightTopButtonsProps> = ({ canSubmit, onSubmit, submitRef }) => (
    <>
        <SubmitButton className={cnMainPage('SubmitButton')} disabled={!canSubmit}
                      onClick={onSubmit} submitRef={submitRef} />
        <LoginButton className={cnMainPage('LoginButton')} />
    </>
);
