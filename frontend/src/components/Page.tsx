import React from 'react';
import { cn } from '@bem-react/classname';
import { Helmet } from 'react-helmet';

import { title as mainTitle } from '../config';


export interface PageProps {
    className?: string;
    title?: string;

    children?: React.ReactNode;
}

const cnPage = cn('Page');

export const Page: React.FC<PageProps> = ({ className, title, children }) => {
    const realTitle = title
        ? `${title} — ${mainTitle}`
        : mainTitle;

    return (
        <div className={cnPage(null, [className])}>
            <Helmet>
                <title>{realTitle}</title>
            </Helmet>

            {children}
        </div>
    );
};
