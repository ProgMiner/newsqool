import React, { useEffect } from 'react';
import { cn } from '@bem-react/classname';
import { useSearchParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { Helmet } from 'react-helmet';

import { sessionCookieName, title as mainTitle } from '../config';
import { setCookie } from '../utils/cookies';
import { QueryKey } from '../queryClient';


export interface PageProps {
    className?: string;
    title?: string;

    children?: React.ReactNode;
}

const cnPage = cn('Page');

export const Page: React.FC<PageProps> = ({ className, title, children }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const cookie = searchParams.get(sessionCookieName);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (cookie) {
            setCookie(sessionCookieName, cookie);
            setTimeout(() => queryClient.resetQueries(QueryKey.AVAILABLE_CONTESTS), 1);

            searchParams.delete(sessionCookieName);
            setSearchParams(searchParams);
        }
    }, [cookie, queryClient, searchParams, setSearchParams]);

    const realTitle = title ? `${title} — ${mainTitle}` : mainTitle;

    return (
        <div className={cnPage(null, [className])}>
            <Helmet>
                <title>{realTitle}</title>
            </Helmet>

            {children}
        </div>
    );
};
