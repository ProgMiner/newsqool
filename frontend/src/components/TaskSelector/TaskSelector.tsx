import React from 'react';
import { cn } from '@bem-react/classname';
import { TreeSelect } from 'primereact/treeselect';
import TreeNode from 'primereact/treenode';

import ContestDTO from '../../api/dto/ContestDTO';


export interface ITaskSeletor {
    className?: string;

    contests: Array<ContestDTO>;

    updateSelectedContest: React.Dispatch<React.SetStateAction<[string, string]>>;
}

const createOptions = (data: Array<ContestDTO>): TreeNode[] => {
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



const cnTaskSeletor = cn('TaskSeletor');

export const TaskSeletor: React.FC<ITaskSeletor> = ({ className, contests, updateSelectedContest }) => (
    <div className={cnTaskSeletor(null, [className])}>
        <TreeSelect
            placeholder='Contest'
            options={createOptions(contests)}
            selectionMode='single'
            onNodeSelect={e => updateSelectedContest(e.node.data)} />
    </div>
);
