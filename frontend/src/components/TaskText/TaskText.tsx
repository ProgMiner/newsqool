import React from 'react';
import { cn } from '@bem-react/classname';
import { LightAsync } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import './TaskText.css';


export interface TaskTextProps {
    className?: string;
    taskText?: string;
}

const cnTaskText = cn('TaskText');

export const TaskText: React.FC<TaskTextProps> = ({ className, taskText }) => {
    return (
        <div className={cnTaskText(null, [className])}>
            <LightAsync
                language="sql" style={docco} wrapLongLines
                PreTag="div" codeTagProps={{ className: cnTaskText('Panel') }}>
                {taskText || '-- Choose a task'}
            </LightAsync>
        </div>
    );
};
