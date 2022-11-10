import React from 'react';
import { Panel } from 'primereact/panel';


const createTable = 'CREATE TABLE';

export const visualizeSchema = (schema: string): React.ReactNode => {
    const result: React.ReactNode[] = [];

    while (schema?.includes(createTable)) {
        const ind = schema.indexOf(createTable) + createTable.length;

        schema = schema?.substring(ind);

        const end = schema.indexOf('(');
        const name = schema.substring(0, end);
        schema = schema.substring(end);

        const paramsEnd = schema.indexOf(';');
        let params = schema.substring(1, paramsEnd - 1);
        while ((/\(.+\)/).test(params)) {
            params = params.replace(/\(.+\)/,'');
        }

        const lets = params.split(',');
        const table: React.ReactNode[] = [];

        schema = schema.substring(paramsEnd + 1);

        for (let i = 0; i < lets.length; i++){
            lets[i] = lets[i].trimStart();

            if (lets[i].length === 0) {
                continue;
            }

            const words = lets[i].split(' ');
            if (words[0][0].toUpperCase() === words[0][0]) {
                continue;
            }

            const n = 20 - words[0].length;
            for (let j = 0; j < n; j++) {
                words[0] += '\xa0';
            }

            table.push(
                <div key={`${name}|${words[0]}`} style={{
                    fontFamily: 'var(--monospace-font-family)',
                    fontSize: 'var(--monospace-font-size)',
                }}>
                    <span style={{ color: '#C51D34' }}>{words[0]}:</span>
                    <span style={{ color: '#FFFF99' }}>{words[1]}</span>
                </div>
            );
        }

        result.push(
            <React.Fragment key={name}>
                <Panel header={name}>
                    {table}
                </Panel>

                <div style={{ height: '10px' }}></div>
            </React.Fragment>
        );
    }

    return result;
};
