import React, { useCallback, useEffect, useMemo } from 'react';
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

    currentTaskId?: number;
    updateCurrentAttempt: (value?: TaskAttempt) => void;
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
    data: x,
}));

const emptyHeaderTemplate = () => null;

const cnTaskSelector = cn('TaskSelector');

export const TaskSelector: React.FC<TaskSelectorProps> =
    ({
        className,
        currentContest, updateCurrentContest,
        currentTaskId: currentTask,
        updateCurrentAttempt,
    }) => {
        const { availableContests, isLoading: isContestsLoading } = useAvailableContests();
        const { contestAttempts, isLoading: isAttemptsLoading } = useContestAttempts(currentContest?.[0]);

        const onContestSelect = useCallback((e: TreeSelectEventNodeParams) => {
            updateCurrentContest(e.node.data);
            updateCurrentAttempt(undefined);
        }, [updateCurrentContest, updateCurrentAttempt]);

        useEffect(() => {
            updateCurrentAttempt(contestAttempts?.find((x) => x.taskEntity.id === currentTask));
        }, [contestAttempts, updateCurrentAttempt, currentTask]);

        const onTaskSelect = useCallback((e: TreeSelectEventNodeParams) => {
            updateCurrentAttempt(e.node.data);
        }, [updateCurrentAttempt]);

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
