import React from 'react';
import { cn } from '@bem-react/classname';
import { LightAsync } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { useSchema } from '../../hooks/queries/useSchema';

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
                language="sql" style={docco} wrapLongLines
                PreTag="div" codeTagProps={{ className: cnSchema('Panel') }}>
                {schema ?? ''}
            </LightAsync>
        </div>
    );
};
