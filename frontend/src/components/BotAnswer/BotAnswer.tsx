import React from 'react';
import { cn } from '@bem-react/classname';
import { LightAsync } from 'react-syntax-highlighter';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { reactSyntaxHighlightStyle } from '../../config';
import { TaskAttempt } from '../../api/data/TaskAttempt';

import './BotAnswer.css';


export interface BotAnswerProps {
    className?: string;
    currentAttempt?: TaskAttempt;
}

const cnBotAnswer = cn('BotAnswer');

const isResultSetEmpty = (result?: string) => !result || result === '[]';

const parseResultSet = (answer?: string) => {
    if (isResultSetEmpty(answer)) {
        return [undefined, undefined];
    }

    const result = JSON.parse(answer!!);
    const columns = Object.keys(result[0])
        .filter((c) => c !== 'query_id')
        .map((c) => (
            <Column key={c} field={c} header={c} />
        ));

    return [result, columns];
};

const RawBotAnswer: React.FC<BotAnswerProps> = ({ className, currentAttempt }) => {
    const resultSet = currentAttempt?.resultSet ?? undefined;

    const [values, columns] = parseResultSet(resultSet);

    return (
        <div className={cnBotAnswer(null, [className])}>
            <LightAsync
                language="sql" style={reactSyntaxHighlightStyle} wrapLongLines
                PreTag="div" codeTagProps={{ className: cnBotAnswer('Panel') }}>
                {!currentAttempt ? (
                    '-- Bot answer'
                ) : currentAttempt.errorMsg ? (
                    '-- Bot answer:\n\n' + currentAttempt.errorMsg
                ) : currentAttempt.status === 'testing' ? (
                    '-- Testing...'
                ) : (
                    '-- Passed!'
                )}
            </LightAsync>

            {!isResultSetEmpty(resultSet) && (
                <DataTable className={cnBotAnswer('Table')}
                           header="Первые 10 строк Вашего результата:"
                           value={values} responsiveLayout="scroll">
                    {columns}
                </DataTable>
            )}
        </div>
    );
};

export const BotAnswer = React.memo(RawBotAnswer,
    (prevProps, nextProps) => prevProps.className === nextProps.className
        && prevProps.currentAttempt?.status === nextProps.currentAttempt?.status
        && prevProps.currentAttempt?.errorMsg === nextProps.currentAttempt?.errorMsg
        && prevProps.currentAttempt?.resultSet === nextProps.currentAttempt?.resultSet);
