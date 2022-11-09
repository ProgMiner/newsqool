import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { MainPage } from './pages/MainPage/MainPage';


export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage className='MainLayout-WholeSize'/>,
    },
]);
