import React, { useRef } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Router as RemixRouter } from '@remix-run/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toast } from 'primereact/toast';

import { ToastProvider } from '../toast';


export interface AppProps {
    router: RemixRouter;
    queryClient: QueryClient;
}

export const App: React.FC<AppProps> = ({ router, queryClient }) => {
    const toastRef = useRef<Toast>(null);

    return (
        <QueryClientProvider client={queryClient}>
            <Toast ref={toastRef} />

            <ToastProvider value={toastRef}>
                <RouterProvider router={router} />
            </ToastProvider>
        </QueryClientProvider>
    );
};
