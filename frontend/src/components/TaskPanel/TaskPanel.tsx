import React from 'react';
import { cn } from '@bem-react/classname';
import { ScrollPanel } from 'primereact/scrollpanel';

import './TaskPanel.css';


export interface TaskPanelProps {
    className?: string;
    taskText?: string;
}

const cnTaskPanel = cn('TaskPanel');

export const TaskPanel: React.FC<TaskPanelProps> = ({ className, taskText }) => (
    <ScrollPanel className={cnTaskPanel(null, [className])}>
        {taskText}
    </ScrollPanel>
);
