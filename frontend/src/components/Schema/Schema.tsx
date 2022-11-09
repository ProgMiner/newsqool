import React from 'react';
import { cn } from '@bem-react/classname';
import { LightAsync } from 'react-syntax-highlighter';

import { useSchema } from '../../hooks/queries/useSchema';
import { reactSyntaxHighlightStyle } from '../../config';

import './Schema.css';


export interface SchemaProps {
    className?: string;
    currentSchemaId?: number;
}

const cnSchema = cn('Schema');

export const Schema: React.FC<SchemaProps> = ({ className, currentSchemaId }) => {
    const { schema } = useSchema(currentSchemaId);

    return (
        <div className={cnSchema(null, [className])}>
            <LightAsync
                language="sql" style={reactSyntaxHighlightStyle} wrapLongLines
                PreTag="div" codeTagProps={{ className: cnSchema('Panel') }}>
                {schema ? (
                    '-- Schema:\n\n' + schema
                ) : (
                    '-- Schema'
                )}
            </LightAsync>
        </div>
    );
};
