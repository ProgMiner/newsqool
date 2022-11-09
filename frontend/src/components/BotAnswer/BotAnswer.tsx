import React from 'react';
import { cn } from '@bem-react/classname';
import { LightAsync } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


import './BotAnswer.css';


export interface BotAnswerProps {
    className?: string;
    botAnswer: string;
    resultSet: string;
}

const cnBotAnswer = cn('BotAnswer');

const isResultSetEmpty = (result: string) => (
    result === null || result === '' || result === '[]'
);

const parseResultSet = (answer: string) => {
    console.log(answer);
    if (isResultSetEmpty(answer)) {
        return [undefined, undefined];
    }
    const result = JSON.parse(answer);
    const columns = Object.keys(result[0])
        .filter((c) => c !== 'query_id')
        .map((c) => (<Column key={c} field={c} header={c} />));

    return [result, columns];
};

export const BotAnswer: React.FC<BotAnswerProps> = ({ className, botAnswer, resultSet }) => {
    const [values, columns] = parseResultSet(resultSet);
    return (
        <div className={cnBotAnswer(null, [className])}>
            <LightAsync
                language="sql" style={docco} wrapLongLines
                PreTag="div" codeTagProps={{ className: cnBotAnswer('Panel') }}>
                {botAnswer ?? ''}
            </LightAsync>
            {isResultSetEmpty(resultSet) ? <></> :
                <DataTable header="Первые 10 строк Вашего результата:" value={values} responsiveLayout="scroll">
                    {columns}
                </DataTable>
            }

        </div>
    );
};
