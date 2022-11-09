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

export const MainLayout: React.FC<MainLayoutProps> = ({
    className,
    leftButtonsArea,
    schemaArea,
    taskArea,
    solutionArea,
    rightButtonsArea,
    answerArea,
}) => (
    <div className={cnMainLayout(null, [className])}>
        <div className={cnMainLayout('Block1')}>
            <div className={cnMainLayout('ButtonsBlock1')}>
                {leftButtonsArea}
            </div>

            <div className={cnMainLayout('DatabaseBlock')}>
                {schemaArea}
            </div>
        </div>

        <div className={cnMainLayout('Block2')}>
            <div className={cnMainLayout('TaskBlock')}>
                {taskArea}
            </div>

            <div className={cnMainLayout('CodeBlock')}>
                {solutionArea}
            </div>
        </div>

        <div className={cnMainLayout('Block3')}>
            <div className={cnMainLayout('ButtonsBlock1')}>
                {rightButtonsArea}
            </div>

            <div className={cnMainLayout('DatabaseBlock')}>
                {answerArea}
            </div>
        </div>
    </div>
);
