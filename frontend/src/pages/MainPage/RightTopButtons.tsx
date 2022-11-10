import React from 'react';
import { cn } from '@bem-react/classname';

import { SubmitButton } from '../../components/SubmitButton/SubmitButton';
import { LoginButton } from '../../components/LoginButton/LoginButton';

import './MainPage.css';


export interface RightTopButtonsProps {
    onSubmit: () => Promise<void>;
    canSubmit: boolean;
}

const cnMainPage = cn('MainPage');

export const RightTopButtons: React.FC<RightTopButtonsProps> = ({ canSubmit, onSubmit }) => (
    <>
        <SubmitButton className={cnMainPage('SubmitButton')}
                      disabled={!canSubmit} onClick={onSubmit} />
        <LoginButton className={cnMainPage('LoginButton')} />
    </>
);
