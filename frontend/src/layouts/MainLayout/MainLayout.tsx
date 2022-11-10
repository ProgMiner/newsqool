import React from 'react';
import { cn } from '@bem-react/classname';
import { Splitter, SplitterPanel } from 'primereact/splitter';

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
    <Splitter className={cnMainLayout(null, [className])}>
        <SplitterPanel className={cnMainLayout('Left')} size={25} minSize={15}>
            <div className={cnMainLayout('LeftButtonsBlock')}>
                {leftButtonsArea}
            </div>

            <div className={cnMainLayout('SchemaBlock')}>
                {schemaArea}
            </div>
        </SplitterPanel>

        <SplitterPanel className={cnMainLayout('Middle')} size={50} minSize={15}>
            <Splitter layout='vertical'>
                <SplitterPanel size={15} className={cnMainLayout('TaskBlock')}>
                    {taskArea}
                </SplitterPanel>

                <SplitterPanel size={85}>
                    {solutionArea}
                </SplitterPanel>
            </Splitter>
        </SplitterPanel>

        <SplitterPanel className={cnMainLayout('Right')} size={25} minSize={15}>
            <div className={cnMainLayout('RightButtonsBlock')}>
                {rightButtonsArea}
            </div>

            <div className={cnMainLayout('AnswerBlock')}>
                {answerArea}
            </div>
        </SplitterPanel>
    </Splitter>
);
