import React, { useState } from 'react';
import { cn } from '@bem-react/classname';

import { Page } from '../../components/Page';
import { MainLayout } from '../../layouts/MainLayout/MainLayout';
import { TaskSelector } from '../../components/TaskSelector/TaskSelector';
import { LoginButton } from '../../components/LoginButton';
import { TaskText } from '../../components/TaskText/TaskText';
import { Schema } from '../../components/Schema/Schema';
import { BotAnswer } from '../../components/BotAnswer/BotAnswer';

import './MainPage.css';


interface MainPageProps {
    className?: string;
}

const cnMainPage = cn('MainPage');

export const MainPage: React.FC<MainPageProps> = ({ className }) => {
    const [currentContest, updateCurrentContest] = useState<[string, string]>(['', '']);
    const [currentTask, updateCurrentTask] = useState<number>();
    const [currentSchema, updateCurrentSchema] = useState<number>();
    const [taskText, updateTaskText] = useState<string>('');
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
                        updateTaskText={updateTaskText}
                    />
                )}
                schemaArea={<Schema className={cnMainPage('Schema')} currentSchemaId={currentSchema} />}
                taskArea={<TaskText className={cnMainPage('TaskText')} taskText={taskText}></TaskText>}
                rightButtonsArea={<LoginButton />}
                answerArea={<BotAnswer className={cnMainPage('AnswerArea')} botAnswer={botAnswer} resultSet={resultSet} />}
            />
        </Page>
    );
};
