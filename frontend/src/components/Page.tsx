import React, { useEffect } from 'react';
import { cn } from '@bem-react/classname';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';

import { sessionCookieName, title as mainTitle } from '../config';
import { setCookie } from '../utils/cookies';


export interface PageProps {
    className?: string;
    title?: string;

    children?: React.ReactNode;
}

const cnPage = cn('Page');

export const Page: React.FC<PageProps> = ({ className, title, children }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const cookie = searchParams.get(sessionCookieName);

    useEffect(() => {
        if (cookie) {
            setCookie(sessionCookieName, cookie);
            searchParams.delete(sessionCookieName);
            setSearchParams(searchParams);
        }
    }, [cookie, searchParams, setSearchParams]);

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
