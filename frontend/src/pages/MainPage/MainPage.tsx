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
import { TaskAttempt } from '../../api/data/TaskAttempt';
import { localStorageSolutionKey } from '../../config';

import './MainPage.css';


interface MainPageProps {
    className?: string;
}

const cnMainPage = cn('MainPage');

const solutionKey = (currentContest: readonly [string, string], taskAttempt: TaskAttempt) =>
    JSON.stringify([localStorageSolutionKey, currentContest, taskAttempt.taskEntity.id]);

export const MainPage: React.FC<MainPageProps> = ({ className }) => {
    const [currentContest, setCurrentContest] = useState<readonly [string, string]>();
    const [currentAttempt, setCurrentAttempt] = useState<TaskAttempt>();
    const [solution, setSolution] = useState<string>('');

    const taskSelected = currentContest !== undefined && currentAttempt !== undefined;

    useEffect(() => {
        const savedSolution = taskSelected
            ? localStorage.getItem(solutionKey(currentContest, currentAttempt))
            : null;

        if (savedSolution === null) {
            setSolution('-- Write your solution here');
        } else {
            setSolution(savedSolution);
        }
    }, [currentAttempt, currentContest, taskSelected]);

    useEffect(() => {
        if (!currentContest || !currentAttempt) {
            return;
        }

        localStorage.setItem(solutionKey(currentContest, currentAttempt), solution);
    }, [currentAttempt, currentContest, solution]);

    const currentContestOption = useContest(currentContest?.[0]);
    const onSubmit = useSubmitSolution(currentContest?.[0], currentAttempt?.taskEntity.id, solution);

    return (
        <Page className={cnMainPage(null, [className])} title={currentContestOption?.name}>
            <MainLayout
                className={cnMainPage('Layout')}
                leftButtonsArea={(
                    <TaskSelector
                        className={cnMainPage('TaskSelector')}
                        currentContest={currentContest} setCurrentContest={setCurrentContest}
                        currentTaskId={currentAttempt?.taskEntity.id} setCurrentAttempt={setCurrentAttempt} />
                )}
                schemaArea={(
                    <Schema className={cnMainPage('Schema')} currentSchemaId={currentAttempt?.taskEntity.schemaId} />
                )}
                taskArea={(
                    <TaskText
                        className={cnMainPage('Task')}
                        taskText={currentAttempt?.taskEntity.description ?? undefined} />
                )}
                solutionArea={<CodeEditor value={solution} onChange={setSolution} disabled={!taskSelected} />}
                rightButtonsArea={<RightTopButtons canSubmit={taskSelected} onSubmit={onSubmit} />}
                answerArea={<BotAnswer className={cnMainPage('AnswerArea')} currentAttempt={currentAttempt} />}
            />
        </Page>
    );
};
