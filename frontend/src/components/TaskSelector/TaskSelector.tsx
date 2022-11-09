import React, { useCallback } from 'react';
import { cn } from '@bem-react/classname';
import { TreeSelect, TreeSelectEventNodeParams } from 'primereact/treeselect';
import TreeNode from 'primereact/treenode';

import { ContestOption } from '../../api/data/ContestOption';
import { useAvailableContests } from '../../hooks/queries/useAvailableContests';
import { useAttemptsContest } from '../../hooks/queries/useAttemptsContest';
import { TaskAttempt } from '../../api/data/TaskAttempt';

import './TaskSelector.css';


export interface TaskSelectorProps {
    className?: string;

    currentContest: [string, string];

    currentTask?: number;

    updateCurrentContest: (value: [string, string]) => void;
    updateCurrentTask: (value: number) => void;
    updateCurrentSchema: (value: number) => void;
    updateBotAnswer: (value: string) => void;
    updateResultSet: (value: string) => void;
    updateTaskText: (value: string) => void;
}

const createContestOptions = (data: Array<ContestOption>): TreeNode[] => {
    return data.map(x => ({
        label: x.name,
        key: x.code,
        selectable: x.variants?.length === 1,
        data: (x.variants?.length === 1) ? [x.code, x.variants[0].id] : undefined,
        children: x.variants?.length !== 1 ?
            x.variants?.map(c => ({ label: c.name, key: c.id?.toString(), data: [x.code, c.id] })) :
            undefined
    }));
};

const createTaskOptions = (data: Array<TaskAttempt>): TreeNode[] => {
    return data.map(x => ({
        label: x.taskEntity.name,
        key: x.taskEntity.id,
        icon: x.status === 'success' ? 'pi pi-check'
            : x.status === 'failure' ? 'pi pi-times' : 'pi',
        data: [x.taskEntity.id, x.taskEntity.schemaId, x.errorMsg, x.resultSet, x.taskEntity.description]
    }));
};

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
        const { attemptsContest, isLoading: isAttemptsLoading } = useAttemptsContest(currentContest[0]);

        const onContestSelect = useCallback((e: TreeSelectEventNodeParams) => {
            updateCurrentContest(e.node.data);
        }, [updateCurrentContest]);

        const onTaskSelect = useCallback((e: TreeSelectEventNodeParams) => {
            updateCurrentTask(e.node.data[0]);
            updateCurrentSchema(e.node.data[1]);
            updateBotAnswer(e.node.data[2]);
            updateResultSet(e.node.data[3]);
            updateTaskText(e.node.data[4]);
        }, [updateCurrentTask, updateCurrentSchema, updateBotAnswer, updateResultSet, updateTaskText]);

        return (
            <div className={cnTaskSelector(null, [className])}>
                <TreeSelect
                    disabled={isContestsLoading}
                    panelHeaderTemplate={emptyHeaderTemplate}
                    placeholder="Contest"
                    value={currentContest[0]}
                    options={createContestOptions(availableContests ?? [])}
                    selectionMode="single"
                    onNodeSelect={onContestSelect} />
                <TreeSelect
                    disabled={currentContest[0] === '' || isAttemptsLoading}
                    panelHeaderTemplate={emptyHeaderTemplate}
                    placeholder="Task"
                    value={currentTask?.toString()}
                    options={createTaskOptions(attemptsContest ?? [])}
                    selectionMode="single"
                    onNodeSelect={onTaskSelect} />
            </div>
        );
    };
