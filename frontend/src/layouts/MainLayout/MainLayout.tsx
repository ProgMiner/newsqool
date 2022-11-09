import React from 'react';
import { cn } from '@bem-react/classname';

import './MainLayout.css';


interface MainLayoutProps {
    className?: string;

    leftButtonsArea?: React.ReactNode;
    schemaArea?: React.ReactNode;

    taskArea?: React.ReactNode;
    solutionArea?: React.ReactNode;

    rightButtonsArea?: React.ReactNode;
    answerArea?: React.ReactNode;
}

const cnMainLayout = cn('MainLayout');

export const MainLayout: React.FC<MainLayoutProps> = (props) => (
    <div className={cnMainLayout('WholeSize')}>
        <div className={cnMainLayout('Block1')}>
            <div className={cnMainLayout('ButtonsBlock1')}>
                {props.leftButtonsArea}
            </div>
            <div className={cnMainLayout('DatabaseBlock')}>
                {props.schemaArea}
            </div>
        </div>
        <div className={cnMainLayout('Block2')}>
            <div className={cnMainLayout('TaskBlock')}>
                {props.taskArea}
            </div>
            <div className={cnMainLayout('CodeBlock')}>
                {props.solutionArea}
            </div>
        </div>
        <div className={cnMainLayout('Block3')}>
            <div className={cnMainLayout('ButtonsBlock1')}>
                {props.rightButtonsArea}
            </div>
            <div className={cnMainLayout('DatabaseBlock')}>
                {props.answerArea}
            </div>
        </div>
    </div>
);
