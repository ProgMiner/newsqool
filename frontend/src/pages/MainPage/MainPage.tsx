import React, { useState } from 'react';
import { cn } from '@bem-react/classname';

import { Page } from '../../components/Page';
import { MainLayout } from '../../layouts/MainLayout/MainLayout';
import { TaskSelector } from '../../components/TaskSelector/TaskSelector';
import { LoginButton } from '../../components/LoginButton';
import { TaskReadField } from '../../components/TaskReadField/TaskReadField';
import { Schema } from '../../components/Schema/Schema';
import { BotAnswer } from '../../components/BotAnswer/BotAnswer';

import './MainPage.css';


interface MainPageProps {
    className?: string;
}

const cnMainPage = cn('MainPage');

export const MainPage: React.FC<MainPageProps> = ({ className }) => {
    const [currentContest, updateCurrentContest] = useState<[string, string]>(['', '']);
    const [currentTask, updateCurrentTask] = useState<number>(-1);
    const [currentSchema, updateCurrentSchema] = useState<number>(-1);
    const [botAnswer, updateBotAnswer] = useState<string>('');
    const [resultSet, updateResultSet] = useState<string>('');

    return (
        <Page className={cnMainPage(null, [className])}>
            <MainLayout
                className={cnMainPage('Layout')}
                leftButtonsArea={(
                    <TaskSelector
                        className={cnMainPage('TaskSelector')}
                        currentContest={currentContest} updateCurrentContest={updateCurrentContest}
                        currentTask={currentTask} updateCurrentTask={updateCurrentTask}
                        updateCurrentSchema={updateCurrentSchema}
                        updateBotAnswer={updateBotAnswer}
                        updateResultSet={updateResultSet}
                    />
                )}
                schemaArea={<Schema className={cnMainPage('Schema')} currentSchemaId={currentSchema} />}
                taskArea={<TaskReadField className='MainLayout-WholeSize' taskText='hui'></TaskReadField>}
                rightButtonsArea={<LoginButton />}
                answerArea={<BotAnswer className={cnMainPage('AnswerArea')} botAnswer={botAnswer} resultSet={resultSet} />}
            />
        </Page>
    );
};
