import React, { useEffect, useState } from 'react';
import { cn } from '@bem-react/classname';

import { Page } from '../../components/Page';
import { MainLayout } from '../../layouts/MainLayout/MainLayout';
import { TaskSelector } from '../../components/TaskSelector/TaskSelector';
import { CodeEditor } from '../../components/CodeEditor/CodeEditor';
import { TaskText } from '../../components/TaskText/TaskText';
import { Schema } from '../../components/Schema/Schema';
import { BotAnswer } from '../../components/BotAnswer/BotAnswer';
import { useContest } from '../../hooks/useContest';
import { RightTopButtons } from './RightTopButtons';
import { useSubmitSolution } from '../../hooks/useSubmitSolution';

import './MainPage.css';


interface MainPageProps {
    className?: string;
}

const cnMainPage = cn('MainPage');

export const MainPage: React.FC<MainPageProps> = ({ className }) => {
    const [currentContest, updateCurrentContest] = useState<[string, string]>();
    const [currentTask, updateCurrentTask] = useState<number>();
    const [currentSchema, updateCurrentSchema] = useState<number>();
    const [taskText, updateTaskText] = useState<string>();
    const [botAnswer, updateBotAnswer] = useState<[string, string]>();
    const [resultSet, updateResultSet] = useState<string>();
    const [solution, setSolution] = useState<string>();

    const taskSelected = currentTask !== undefined;

    useEffect(() => {
        if (!taskSelected) {
            setSolution('-- Write your solution here');
        }

        // TODO load saved solution from local storage
    }, [taskSelected]);

    const currentContestOption = useContest(currentContest?.[0]);
    const onSubmit = useSubmitSolution(currentContest?.[0], currentTask, solution);

    return (
        <Page className={cnMainPage(null, [className])} title={currentContestOption?.name}>
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
                solutionArea={<CodeEditor value={solution ?? ''} onChange={setSolution} disabled={!taskSelected} />}
                rightButtonsArea={<RightTopButtons canSubmit={taskSelected} onSubmit={onSubmit} />}
                answerArea={(
                    <BotAnswer className={cnMainPage('AnswerArea')}
                               botAnswer={botAnswer} resultSet={resultSet} />
                )}
            />
        </Page>
    );
};
