import React, { useCallback, useEffect, useMemo } from 'react';
import { TreeSelect, TreeSelectEventNodeParams, TreeSelectValueTemplateType } from 'primereact/treeselect';
import { cn } from '@bem-react/classname';

import { ContestOption } from '../../api/data/ContestOption';
import { useAvailableContests } from '../../hooks/queries/useAvailableContests';
import { useContestAttempts } from '../../hooks/queries/useContestAttempts';
import { TaskAttempt } from '../../api/data/TaskAttempt';

import './TaskSelector.css';


export interface TaskSelectorProps {
    className?: string;

    currentContest?: readonly [string, string];
    setCurrentContest: (value?: readonly [string, string]) => void;

    currentTaskId?: number;
    setCurrentAttempt: (value?: TaskAttempt) => void;
}

const createContestOptions = (data?: ContestOption[]) => data && data.map(co => ({
    label: co.name,
    key: co.code,
    selectable: co.variants?.length === 1,
    data: (co.variants?.length === 1) ? [co.code, co.variants[0].id] : undefined,
    children: co.variants?.length === 1 ? undefined : co.variants?.map(vo => ({
        label: vo.name,
        key: vo.id?.toString(),
        data: [co.code, vo.id],
    }))
}));

const createTaskOptions = (data?: TaskAttempt[]) => data && data.map(ta => ({
    label: (<>
        {ta.taskEntity.name}
        &nbsp;&nbsp;&nbsp;<i className="pi pi-star-fill" />
        &nbsp;{ta.taskEntity.difficulty}
        &nbsp;&nbsp;&nbsp;<i className="pi pi-wallet" />
        &nbsp;{ta.taskEntity.score}
    </>) as unknown as string,
    key: ta.taskEntity.id,
    icon: ta.status === 'success' ? 'pi pi-check'
        : ta.status === 'failure' ? 'pi pi-times'
        : ta.status === 'testing' ? 'pi pi-spin pi-spinner'
        : 'pi',
    data: ta,
}));

const emptyHeaderTemplate = () => null;

const taskOptionValueTemplate: TreeSelectValueTemplateType = data => Array.isArray(data)
    ? data.length === 0 ? 'Task' : data[0].data.taskEntity.name : '';

const cnTaskSelector = cn('TaskSelector');

export const TaskSelector: React.FC<TaskSelectorProps> =
    ({
        className,
        currentContest, setCurrentContest,
        currentTaskId, setCurrentAttempt,
    }) => {
        const { availableContests } = useAvailableContests();
        const { contestAttempts } = useContestAttempts(currentContest?.[0]);

        const onContestSelect = useCallback((e: TreeSelectEventNodeParams) => {
            setCurrentContest(e.node.data);
            setCurrentAttempt();
        }, [setCurrentContest, setCurrentAttempt]);

        useEffect(() => {
            if (!currentContest) {
                return;
            }

            const exists = availableContests?.some(co => co.code === currentContest[0]
                && co.variants.some(vo => vo.id === +currentContest[1]));

            if (!exists) {
                setCurrentContest();
            }
        }, [availableContests, currentContest, setCurrentContest]);

        useEffect(() => {
            setCurrentAttempt(contestAttempts?.find((x) => x.taskEntity.id === currentTaskId));
        }, [contestAttempts, setCurrentAttempt, currentTaskId]);

        const onTaskSelect = useCallback((e: TreeSelectEventNodeParams) => {
            setCurrentAttempt(e.node.data);
        }, [setCurrentAttempt]);

        const contestOptions = useMemo(() => createContestOptions(availableContests), [availableContests]);
        const taskOptions = useMemo(() => createTaskOptions(contestAttempts), [contestAttempts]);

        return (
            <div className={cnTaskSelector(null, [className])}>
                <TreeSelect
                    className={cnTaskSelector('Contest')}
                    options={contestOptions}
                    value={currentContest?.[0]} onNodeSelect={onContestSelect}
                    disabled={!availableContests} panelHeaderTemplate={emptyHeaderTemplate}
                    placeholder="Contest" selectionMode="single" />

                {taskOptions && (
                    <TreeSelect
                        className={cnTaskSelector('Task')}
                        panelClassName={cnTaskSelector('TaskPanel')}
                        options={taskOptions}
                        value={currentTaskId?.toString()} onNodeSelect={onTaskSelect}
                        panelHeaderTemplate={emptyHeaderTemplate}
                        valueTemplate={taskOptionValueTemplate}
                        placeholder="Task" selectionMode="single" />
                )}
            </div>
        );
    };
