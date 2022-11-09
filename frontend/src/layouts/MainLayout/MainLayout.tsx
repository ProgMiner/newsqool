import React from 'react';
import { cn } from '@bem-react/classname';


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

export const MainLayout: React.FC<MainLayoutProps> = ({ className, leftButtonsArea, rightButtonsArea }) => (
    <div className={cnMainLayout(null, [className])}>
        {leftButtonsArea}
        {rightButtonsArea}
    </div>
);
