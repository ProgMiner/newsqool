import React, { useState } from 'react';
import { cn } from '@bem-react/classname';

import { Page } from '../../components/Page';
import { MainLayout } from '../../layouts/MainLayout/MainLayout';
import { TaskSelector } from '../../components/TaskSelector/TaskSelector';
import { LoginButton } from '../../components/LoginButton';
import { TaskReadField } from '../../components/TaskReadField/TaskReadField';
import { Schema } from '../../components/Schema/Schema';

import './MainPage.css';


interface MainPageProps {
    className?: string;
}

const cnMainPage = cn('MainPage');

const currentSchemaMock = 7;

export const MainPage: React.FC<MainPageProps> = ({ className }) => {
    const [currentContest, updateCurrentContest] = useState<[string, string]>(['', '']);
    const [currentTask, updateCurrentTask] = useState<Number>(-1);

    return (
        <Page className={cnMainPage(null, [className])}>
            <MainLayout
                className={cnMainPage('Layout')}
                leftButtonsArea={(
                    <TaskSelector className={cnMainPage('TaskSelector')}
                                  currentContest={currentContest} updateSelectedContest={updateCurrentContest}
                                  currentTask={currentTask} updateSelectedTask={updateCurrentTask} />
                )}
                schemaArea={<Schema className={cnMainPage('Schema')} currentSchemaId={currentSchemaMock} />}
                taskArea={<TaskReadField className='MainLayout-WholeSize' taskText='hui'></TaskReadField>}
                rightButtonsArea={<LoginButton />}
            />
        </Page>
    );
};
