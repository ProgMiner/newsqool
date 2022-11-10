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
    setCurrentAttempt: (value?: TaskAttempt) => void;
}

const createContestOptions = (data: Array<ContestOption>): TreeNode[] => data.map(co => ({
    label: co.name,
    key: co.code,
    selectable: co.variants?.length === 1,
    data: (co.variants?.length === 1) ? [co.code, co.variants[0].id] : undefined,
    children: co.variants?.length === 1 ? undefined : co.variants?.map(vo => ({
        label: vo.name,
        key: vo.id?.toString(),
        data: [co.code, vo.id],
    }))
}));

const createTaskOptions = (data: Array<TaskAttempt>): TreeNode[] => data.map(ta => ({
    label: ta.taskEntity.name,
    key: ta.taskEntity.id,
    icon: ta.status === 'success' ? 'pi pi-check'
        : ta.status === 'failure' ? 'pi pi-times'
        : ta.status === 'testing' ? 'pi pi-spin pi-spinner'
        : 'pi',
    data: ta,
}));

const emptyHeaderTemplate = () => null;

const cnTaskSelector = cn('TaskSelector');

export const TaskSelector: React.FC<TaskSelectorProps> =
    ({
        className,
        currentContest, updateCurrentContest,
        currentTaskId, setCurrentAttempt,
    }) => {
        const { availableContests, isLoading: isContestsLoading } = useAvailableContests();
        const { contestAttempts, isLoading: isAttemptsLoading } = useContestAttempts(currentContest?.[0]);

        const onContestSelect = useCallback((e: TreeSelectEventNodeParams) => {
            updateCurrentContest(e.node.data);
            setCurrentAttempt(undefined);
        }, [updateCurrentContest, setCurrentAttempt]);

        useEffect(() => {
            setCurrentAttempt(contestAttempts?.find((x) => x.taskEntity.id === currentTaskId));
        }, [contestAttempts, setCurrentAttempt, currentTaskId]);

        const onTaskSelect = useCallback((e: TreeSelectEventNodeParams) => {
            setCurrentAttempt(e.node.data);
        }, [setCurrentAttempt]);

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
                        value={currentTaskId?.toString()} onNodeSelect={onTaskSelect}
                        panelHeaderTemplate={emptyHeaderTemplate}
                        placeholder="Task" selectionMode="single" />
                )}
            </div>
        );
    };
