import React from 'react';
import { Panel } from 'primereact/panel';
import { cn } from '@bem-react/classname';

import './TaskPanel.css';


export interface TaskPanelProps {
    className?: string;
    taskText?: string;
}

const cnTaskPanel = cn('TaskPanel');

export const TaskPanel: React.FC<TaskPanelProps> = ({ className, taskText }) => (
    <div className={cnTaskPanel(null, [className])}>
        <Panel className={cnTaskPanel('Panel')}>
            <p>{taskText}</p>
        </Panel>
    </div>
);
