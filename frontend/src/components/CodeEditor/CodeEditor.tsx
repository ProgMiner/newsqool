import React, { useCallback } from 'react';
import { cn } from '@bem-react/classname';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';

import 'prismjs/components/prism-sql';

import './CodeEditor.css';


export interface CodeEditorProps {
    className?: string;

    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;

    disabled?: boolean;
}

const cnCodeEditor = cn('CodeEditor');

export const CodeEditor: React.FC<CodeEditorProps> = ({ className, value, onChange, onSubmit, disabled = false }) => {
    // TODO fix scroll

    const highlight = useCallback((text: string) => Prism.highlight(text, Prism.languages.sql, 'sql'), []);

    const onKeyDown = useCallback((ev: React.KeyboardEvent) => {
        if (ev.ctrlKey && ev.key === 'Enter') {
            onSubmit();
            ev.preventDefault();
            ev.stopPropagation();
        }
    }, [onSubmit]);

    return (
        <div className={cnCodeEditor(null, [className])}>
            <Editor className={cnCodeEditor('Editor')} padding={5}
                    disabled={disabled} highlight={highlight} onKeyDown={onKeyDown}
                    value={value} onValueChange={onChange} />
        </div>
    );
};
