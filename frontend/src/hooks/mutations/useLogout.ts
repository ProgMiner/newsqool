import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

import { deleteCookie } from '../../utils/cookies';
import { sessionCookieName } from '../../config';


export const useLogout = (): () => void => {
    const queryClient = useQueryClient();

    return useCallback(() => {
        deleteCookie(sessionCookieName);
        setTimeout(() => {
            // noinspection JSIgnoredPromiseFromCall
            queryClient.resetQueries();
        }, 1);
    }, [queryClient]);
};
