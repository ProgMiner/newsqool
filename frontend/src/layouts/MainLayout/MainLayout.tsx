import React from 'react';
import { cn } from '@bem-react/classname';

import './MainLayout.css';


interface MainLayoutProps {
    className?: string;

    leftButton1Area?: React.ReactNode;
    leftButton2Area?: React.ReactNode;
    schemaArea?: React.ReactNode;

    taskArea?: React.ReactNode;
    solutionArea?: React.ReactNode;

    rightButton1Area?: React.ReactNode;
    rightButton2Area?: React.ReactNode;
    answerArea?: React.ReactNode;
}

const cnMainLayout = cn('MainLayout');

export const MainLayout: React.FC<MainLayoutProps> = (props) => (
    <div className={cnMainLayout('WholeSize')}>
        <div className={cnMainLayout('Block1')}>
            <div className={cnMainLayout('ButtonsBlock1')}>
                <div className={cnMainLayout('ContestBlock')}>
                    <div className={cnMainLayout('ContestButtonBlock')}>
                        {props.leftButton1Area}
                    </div>
                </div>
                <div className={cnMainLayout('TaskBBlock')}>
                    <div className={cnMainLayout('TaskButtonBlock')}>
                        {props.leftButton2Area}
                    </div>
                </div>
            </div>
            <div className={cnMainLayout('DatabaseBlock')}>
                <div className={cnMainLayout('DatabaseTextBlock')}>
                    {props.schemaArea}
                </div>
            </div>
        </div>
        <div className={cnMainLayout('Block2')}>
            <div className={cnMainLayout('TaskBlock')}>
                <div className={cnMainLayout('TaskTextBlock')}>
                    {props.taskArea}
                </div>
            </div>
            <div className={cnMainLayout('CodeBlock')}>
                <div className={cnMainLayout('CodeTextBlock')}>
                    {props.solutionArea}
                </div>
            </div>
        </div>
        <div className={cnMainLayout('Block3')}>
            <div className={cnMainLayout('ButtonsBlock1')}>
                <div className={cnMainLayout('ContestBlock')}>
                    <div className={cnMainLayout('ContestButtonBlock')}>
                        {props.rightButton1Area}
                    </div>
                </div>
                <div className={cnMainLayout('TaskBBlock')}>
                    <div className={cnMainLayout('TaskButtonBlock')}>
                        {props.rightButton2Area}
                    </div>
                </div>
            </div>
            <div className={cnMainLayout('DatabaseBlock')}>
                <div className={cnMainLayout('DatabaseTextBlock')}>
                    {props.answerArea}
                </div>
            </div>
        </div>
    </div>
);
