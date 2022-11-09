import React from 'react';
import { cn } from '@bem-react/classname';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';

import 'prismjs/components/prism-sql';
import 'prismjs/themes/prism.css';

import './CodeEditor.css';


export interface CodeEditorProps {
    className?: string;

    value: string;
    onChange: (value: string) => void;

    disabled?: boolean;
}

const cnCodeEditor = cn('CodeEditor');

export const CodeEditor: React.FC<CodeEditorProps> = ({ className, value, onChange, disabled = false }) => {
    // TODO fix scroll
    // TODO add Ctrl+Enter

    return (
        <div className={cnCodeEditor(null, [className])}>
            <Editor className={cnCodeEditor('Editor')} padding={5} disabled={disabled}
                    highlight={text => Prism.highlight(text, Prism.languages.sql, 'sql')}
                    value={value} onValueChange={onChange} />
        </div>
    );
};
