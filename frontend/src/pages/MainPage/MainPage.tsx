import React, { useState } from 'react';
import { cn } from '@bem-react/classname';

import { MainLayout } from '../../layouts/MainLayout/MainLayout';
import { TaskSelector } from '../../components/TaskSelector/TaskSelector';
import { LoginButton } from '../../components/LoginButton';
import { Page } from '../../components/Page';
import { TaskReadField } from '../../components/TaskReadField/TaskReadField';

import './MainPage.css';
import { Schema } from '../../components/Schema/Schema';


interface MainPageProps {
    className?: string;
}

const cnMainPage = cn('MainPage');

export const MainPage: React.FC<MainPageProps> = ({ className }) => {

    const [currentContest, updateCurrentContest] = useState<[string, string]>(['', '']);
    const [currentTask, updateCurrentTask] = useState<Number>(-1);
    return (
        <Page className={cnMainPage(null, [className])}>
            <MainLayout
                className={cnMainPage('Layout')}
                leftButtonsArea={
                    <TaskSelector
                        className={cnMainPage('TaskSelector')}
                        currentContest={currentContest}
                        currentTask={currentTask}
                        updateSelectedContest={updateCurrentContest}
                        updateSelectedTask={updateCurrentTask}
                    />}
                schemaArea={<Schema className={cnMainPage('Schema')} />}
                taskArea={<TaskReadField className='MainLayout-WholeSize' taskText='hui'></TaskReadField>}
                rightButtonsArea={<LoginButton />}
            />
        </Page >);
};
