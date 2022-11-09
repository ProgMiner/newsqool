import React, { useState } from 'react';
import { cn } from '@bem-react/classname';

import { Page } from '../../components/Page';
import { MainLayout } from '../../layouts/MainLayout/MainLayout';
import { TaskSeletor } from '../../components/TaskSelector/TaskSelector';
import { LoginButton } from '../../components/LoginButton';

import './MainPage.css';
import { useAvailableContests } from '../../hooks/queries/useAvailableContests';


interface MainPageProps {
    className?: string;
}

const cnMainPage = cn('MainPage');

export const MainPage: React.FC<MainPageProps> = ({ className }) => {
    const { availableContests, isLoading } = useAvailableContests();

    const [currentContest, updateCurrentContest] = useState<[string, string]>(['', '']);
    return (
        <Page className={cnMainPage(null, [className])}>
            <MainLayout
                className={cnMainPage('Layout')}
                leftButtonsArea={<TaskSeletor contests={availableContests ?? []} currentContest={currentContest} updateSelectedContest={updateCurrentContest} />}
                rightButtonsArea={<LoginButton />}
            />
        </Page >);
};
