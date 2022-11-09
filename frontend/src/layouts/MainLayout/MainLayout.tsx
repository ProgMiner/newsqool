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
        <div className={cnMainLayout('Left')}>
            <div className={cnMainLayout('LeftButtonsBlock')}>
                {leftButtonsArea}
            </div>

            <div className={cnMainLayout('SchemaBlock')}>
                {schemaArea}
            </div>
        </div>

        <div className={cnMainLayout('Middle')}>
            <div className={cnMainLayout('TaskBlock')}>
                {taskArea}
            </div>

            <div className={cnMainLayout('CodeBlock')}>
                {solutionArea}
            </div>
        </div>

        <div className={cnMainLayout('Right')}>
            <div className={cnMainLayout('RightButtonsBlock')}>
                {rightButtonsArea}
            </div>

            <div className={cnMainLayout('AnswerBlock')}>
                {answerArea}
            </div>
        </div>
    </div>
);
