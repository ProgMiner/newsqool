import React, { useState } from 'react';
import { cn } from '@bem-react/classname';

import { Page } from '../../components/Page';
import { MainLayout } from '../../layouts/MainLayout/MainLayout';
import { TaskSeletor } from '../../components/TaskSelector/TaskSelector';

import './MainPage.css';


interface MainPageProps {
    className?: string;
}

const cnMainPage = cn('MainPage');

export const MainPage: React.FC<MainPageProps> = ({ className }) => {
    const [contests, _updateContests] = useState([{
        'code': 'homework_01_itmo',
        'name': 'Домашнее задание #1',
        'variantPolicy': 'ANY',
        'variants': [
            {
                'id': 43,
                'name': 'homework_01'
            },

            {
                'id': 44,
                'name': 'homework_02'
            }
        ],
        'chosenVariant': {
            'id': 43,
            'name': 'homework_01'
        }
    }, {
        'code': 'homework_02_itmo',
        'name': 'Домашнее задание #2',
        'variantPolicy': 'ANY',
        'variants': [
            {
                'id': 43,
                'name': 'homework_01'
            }
        ],
        'chosenVariant': {
            'id': 43,
            'name': 'homework_01'
        }
    }]);

    const [_currentContest, updateCurrentContest] = useState<[string, string]>(['', '']);
    return (
        <Page className={cnMainPage(null, [className])}>
            <MainLayout
                className={cnMainPage('Layout')}
                leftButtonsArea={<TaskSeletor contests={contests} updateSelectedContest={updateCurrentContest} />}
            />
        </Page >);
};
