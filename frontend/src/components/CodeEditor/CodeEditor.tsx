import React, { useCallback } from 'react';
import { cn } from '@bem-react/classname';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';

import 'prismjs/components/prism-sql';
import 'dracula-prism/dist/css/dracula-prism.css';

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

    const highlight = useCallback((text: string) => Prism.highlight(text, Prism.languages.sql, 'sql'), []);

    return (
        <div className={cnCodeEditor(null, [className])}>
            <Editor className={cnCodeEditor('Editor')} padding={5}
                    disabled={disabled} highlight={highlight}
                    value={value} onValueChange={onChange} />
        </div>
    );
};
