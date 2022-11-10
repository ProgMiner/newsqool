import React from 'react';
import { cn } from '@bem-react/classname';
import { LightAsync } from 'react-syntax-highlighter';
import { Panel } from 'primereact/panel';
import { TabView, TabPanel } from 'primereact/tabview';

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

    let s = schema;
    let p = 'CREATE TABLE';
    let result: React.ReactNode = null;

    while (s?.includes(p)){
        let ind = s.indexOf(p) + p.length;
        s = s?.substring(ind);
        let end = s.indexOf('(');
        let name = s.substring(0, end);
        s = s.substring(end);
        let paramsEnd = s.indexOf(';');
        let params = s.substring(1, paramsEnd-1);
        while((/\(.+\)/).test(params)){
            params = params.replace(/\(.+\)/,'');
        }
        let lets = params.split(',');

        let table: React.ReactNode = null;

        s = s.substring(paramsEnd + 1);



        for (let i = 0; i < lets.length; i++){
            lets[i] = lets[i].trimStart();
            if (lets[i].length === 0){
                continue;
            }
            let words = lets[i].split(' ');
            if (words[0][0].toUpperCase() === words[0][0] ){
                continue;
            }
            let n = 20 - words[0].length;
            for (let j = 0; j < n; j++){
                words[0] += '\xa0';
            }

            table = <>{table}<div style={{ fontFamily: 'monospace' }}>
                <span style={{ color: '#C51D34' }}>{words[0]}:</span>
                <span style={{ color: '#FFFF99' }}>{words[1]}</span>
                </div></>;
        }
        result = <>{result}<Panel header={name}>{table}</Panel><div style={{ height: '10px' }}></div></>;
    }

    return (
        <TabView >
            <TabPanel header="Code" >
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
            </TabPanel>
            <TabPanel header="Table">
                {result}
            </TabPanel>
        </TabView>
    );
};
