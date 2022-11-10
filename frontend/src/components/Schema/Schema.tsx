import React, { useMemo } from 'react';
import { cn } from '@bem-react/classname';
import { LightAsync } from 'react-syntax-highlighter';
import { TabView, TabPanel } from 'primereact/tabview';

import { useSchema } from '../../hooks/queries/useSchema';
import { reactSyntaxHighlightStyle } from '../../config';
import { visualizeSchema } from './visualizeSchema';

import './Schema.css';


export interface SchemaProps {
    className?: string;
    currentSchemaId?: number;
}

const cnSchema = cn('Schema');

export const Schema: React.FC<SchemaProps> = ({ className, currentSchemaId }) => {
    const { schema } = useSchema(currentSchemaId);

    const tables = useMemo(() => schema && visualizeSchema(schema), [schema]);

    const code = (
        <LightAsync
            language="sql" style={reactSyntaxHighlightStyle} wrapLongLines
            PreTag="div" codeTagProps={{ className: cnSchema('Code') }}>
            {schema ? (
                '-- Schema:\n\n' + schema
            ) : (
                '-- Schema'
            )}
        </LightAsync>
    );

    if (!schema) {
        return (
            <div className={cnSchema(null, [cnSchema('CodeWrapper'), className])}>
                {code}
            </div>
        );
    }

    return (
        <TabView className={cnSchema(null, [className])}>
            <TabPanel header="Code" className={cnSchema('CodeWrapper')}>
                {code}
            </TabPanel>

            <TabPanel header="Tables">
                {tables}
            </TabPanel>
        </TabView>
    );
};
