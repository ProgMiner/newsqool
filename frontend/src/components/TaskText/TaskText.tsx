import React from 'react';
import { cn } from '@bem-react/classname';
import { LightAsync } from 'react-syntax-highlighter';

import { reactSyntaxHighlightStyle } from '../../config';

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
                language="sql" style={reactSyntaxHighlightStyle} wrapLongLines
                PreTag="div" codeTagProps={{ className: cnTaskText('Panel') }}>
                {taskText || '-- Choose a task'}
            </LightAsync>
        </div>
    );
};
