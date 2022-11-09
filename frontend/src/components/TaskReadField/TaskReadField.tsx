import React from 'react';
import { Panel } from 'primereact/panel';
import { cn } from '@bem-react/classname';
import './TaskReadField.css';


export interface ITaskReadField {
    className?: string;
    taskText?: string;
}

const cnTaskSeletor = cn('TaskReadField');

export const TaskReadField: React.FC<ITaskReadField> = ({ className, taskText }) => (
    <div className={cnTaskSeletor(null, [className])}>
        <Panel>
            <p>{taskText}</p>
        </Panel>
    </div>
);