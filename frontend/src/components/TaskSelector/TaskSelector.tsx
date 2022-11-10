import React, { useCallback, useMemo } from 'react';
import { TreeSelect, TreeSelectEventNodeParams } from 'primereact/treeselect';
import TreeNode from 'primereact/treenode';
import { cn } from '@bem-react/classname';

import { ContestOption } from '../../api/data/ContestOption';
import { useAvailableContests } from '../../hooks/queries/useAvailableContests';
import { useContestAttempts } from '../../hooks/queries/useContestAttempts';
import { TaskAttempt } from '../../api/data/TaskAttempt';

import './TaskSelector.css';


export interface TaskSelectorProps {
    className?: string;

    currentContest?: [string, string];
    updateCurrentContest: (value?: [string, string]) => void;

    currentTask?: number;
    updateCurrentTask: (value?: number) => void;

    updateCurrentSchema: (value?: number) => void;
    updateBotAnswer: (value?: [string, string]) => void;
    updateResultSet: (value?: string) => void;
    updateTaskText: (value?: string) => void;
}

const createContestOptions = (data: Array<ContestOption>): TreeNode[] => data.map(x => ({
    label: x.name,
    key: x.code,
    selectable: x.variants?.length === 1,
    data: (x.variants?.length === 1) ? [x.code, x.variants[0].id] : undefined,
    children: x.variants?.length === 1 ? undefined : x.variants?.map(c => ({
            label: c.name,
            key: c.id?.toString(),
            data: [x.code, c.id],
    }))
}));

const createTaskOptions = (data: Array<TaskAttempt>): TreeNode[] => data.map(x => ({
    label: x.taskEntity.name,
    key: x.taskEntity.id,
    icon: x.status === 'success' ? 'pi pi-check'
        : x.status === 'failure' ? 'pi pi-times'
        : x.status === 'testing' ? 'pi pi-spin pi-spinner'
        : 'pi',
    data: [x.taskEntity.id, x.taskEntity.schemaId, [x.status, x.errorMsg],
        x.resultSet, x.taskEntity.description],
}));

const emptyHeaderTemplate = () => null;

const cnTaskSelector = cn('TaskSelector');

export const TaskSelector: React.FC<TaskSelectorProps> =
    ({
        className,
        currentContest, updateCurrentContest,
        currentTask, updateCurrentTask,
        updateCurrentSchema,
        updateBotAnswer,
        updateResultSet,
        updateTaskText,
    }) => {
        const { availableContests, isLoading: isContestsLoading } = useAvailableContests();
        const { contestAttempts, isLoading: isAttemptsLoading } = useContestAttempts(currentContest?.[0]);

        const onContestSelect = useCallback((e: TreeSelectEventNodeParams) => {
            updateCurrentContest(e.node.data);
            updateCurrentTask(undefined);
            updateCurrentSchema(undefined);
            updateBotAnswer(undefined);
            updateResultSet(undefined);
            updateTaskText(undefined);
        }, [updateCurrentContest, updateCurrentTask, updateCurrentSchema,
            updateBotAnswer, updateResultSet, updateTaskText]);

        // TODO update selectedTask when attempts updated

        const onTaskSelect = useCallback((e: TreeSelectEventNodeParams) => {
            updateCurrentTask(e.node.data[0]);
            updateCurrentSchema(e.node.data[1]);
            updateBotAnswer(e.node.data[2]);
            updateResultSet(e.node.data[3]);
            updateTaskText(e.node.data[4]);
        }, [updateCurrentTask, updateCurrentSchema, updateBotAnswer, updateResultSet, updateTaskText]);

        const canSelectTask = currentContest && !isAttemptsLoading;

        const contestOptions = useMemo(() => createContestOptions(availableContests ?? []), [availableContests]);
        const taskOptions = useMemo(() => createTaskOptions(contestAttempts ?? []), [contestAttempts]);

        return (
            <div className={cnTaskSelector(null, [className])}>
                <TreeSelect
                    className={cnTaskSelector('Contest')}
                    options={contestOptions}
                    value={currentContest?.[0]} onNodeSelect={onContestSelect}
                    disabled={isContestsLoading} panelHeaderTemplate={emptyHeaderTemplate}
                    placeholder="Contest" selectionMode="single" />

                {canSelectTask && (
                    <TreeSelect
                        className={cnTaskSelector('Task')}
                        options={taskOptions}
                        value={currentTask?.toString()} onNodeSelect={onTaskSelect}
                        panelHeaderTemplate={emptyHeaderTemplate}
                        placeholder="Task" selectionMode="single" />
                )}
            </div>
        );
    };
