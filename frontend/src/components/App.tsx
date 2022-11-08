import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Router as RemixRouter } from '@remix-run/router';
import { QueryClient, QueryClientProvider } from 'react-query';


export interface AppProps {
    router: RemixRouter;
    queryClient: QueryClient;
}

export const App: React.FC<AppProps> = ({ router, queryClient }) => (
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>
);
