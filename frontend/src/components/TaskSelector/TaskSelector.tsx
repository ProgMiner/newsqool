import React from 'react';
import { cn } from '@bem-react/classname';
import { TreeSelect } from 'primereact/treeselect';
import TreeNode from 'primereact/treenode';

import { ContestOption } from '../../api/data/ContestOption';
import { useAvailableContests } from '../../hooks/queries/useAvailableContests';


export interface ITaskSeletor {
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
//remove this
class TaskOption {
    name?: string; id: Number = 0; status?: string;
}

const createTaskOptions = (data: Array<TaskOption>): TreeNode[] => {
    return data.map(x => ({
        label: x.name,
        key: x.id.toString(),
        icon: x.status === 'success' ? 'pi pi-check' : x.status === 'fail' ? 'pi pi-times' : undefined,
        data: x.id
    }));
};


const cnTaskSeletor = cn('TaskSeletor');

export const TaskSeletor: React.FC<ITaskSeletor> = ({ className, currentContest, currentTask, updateSelectedContest, updateSelectedTask }) => {

    const { availableContests } = useAvailableContests();
    const { availableTasks } = { availableTasks: [{ name: 'task1', id: 1, status: 'fail' }, { name: 'task2', id: 2, status: 'success' }, { name: 'task3', id: 3 }] };//useAvaliableTasks();
    return (
        <div className={cnTaskSeletor(null, [className])}>
            <TreeSelect
                placeholder='Contest'
                value={currentContest[0]}
                options={createContestOptions(availableContests ?? [])}
                selectionMode='single'
                onNodeSelect={e => updateSelectedContest(e.node.data)} />
            <TreeSelect
                placeholder='Task'
                value={currentTask.toString()}
                options={createTaskOptions(availableTasks ?? [])}
                selectionMode='single'
                onNodeSelect={e => updateSelectedTask(e.node.data)} />
        </div>
    );
};
