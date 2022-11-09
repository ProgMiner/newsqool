import React from 'react';
import { cn } from '@bem-react/classname';
import { TreeSelect } from 'primereact/treeselect';
import TreeNode from 'primereact/treenode';

import { ContestOption } from '../../api/data/ContestOption';
import { useAvailableContests } from '../../hooks/queries/useAvailableContests';
import { useAttemptsContest } from '../../hooks/queries/useAttemptsContest';
import { TaskAttempt } from '../../api/data/TaskAttempt';


export interface TaskSelectorProps {
    className?: string;

    currentContest: [string, string];

    currentTask: Number;

    updateSelectedContest: React.Dispatch<React.SetStateAction<[string, string]>>;
    updateSelectedTask: React.Dispatch<React.SetStateAction<Number>>;
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
        data: x.taskEntity.id
    }));
};


const cnTaskSelector = cn('TaskSelector');

export const TaskSelector: React.FC<TaskSelectorProps> = ({ className, currentContest, currentTask, updateSelectedContest, updateSelectedTask }) => {
    const { availableContests } = useAvailableContests();
    const { attemptsContest } = useAttemptsContest(currentContest[0]);

    return (
        <div className={cnTaskSelector(null, [className])}>
            <TreeSelect
                placeholder='Contest'
                value={currentContest[0]}
                options={createContestOptions(availableContests ?? [])}
                selectionMode='single'
                onNodeSelect={e => updateSelectedContest(e.node.data)} />
            <TreeSelect
                placeholder='Task'
                value={currentTask.toString()}
                options={createTaskOptions(attemptsContest ?? [])}
                selectionMode='single'
                onNodeSelect={e => updateSelectedTask(e.node.data)} />
        </div>
    );
};
