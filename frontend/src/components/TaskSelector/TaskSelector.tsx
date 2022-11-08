import React from 'react';
import { cn } from '@bem-react/classname';
// import { Dropdown } from 'primereact/dropdown';
import { TreeSelect } from 'primereact/treeselect';
import TreeNode from 'primereact/treenode';

import ContestDTO from '../../api/dto/ContestDTO';


export interface ITaskSeletor {
    className?: string;

    contests: Array<ContestDTO>;
}

const createOptions = (data: Array<ContestDTO>): TreeNode[] => {
    return data.map(x => ({
        label: x.name,
        key: x.code,
        children: x.variants?.length !== 1 ?
            x.variants?.map(c => ({ label: c.name, key: c.id?.toString() })) :
            undefined
    }));
};

const cnTaskSeletor = cn('TaskSeletor');

export const TaskSeletor: React.FC<ITaskSeletor> = ({ className, contests }) => (
    <div className={cnTaskSeletor(null, [className])}>
        <TreeSelect placeholder='Contest' options={createOptions(contests)} />
    </div>
);
