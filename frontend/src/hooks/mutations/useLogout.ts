import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

import { QueryKey } from '../../queryClient';
import { deleteCookie } from '../../utils/cookies';
import { sessionCookieName } from '../../config';


export const useLogout = (): () => void => {
    const queryClient = useQueryClient();

    return useCallback(() => {
        deleteCookie(sessionCookieName);
        setTimeout(() => queryClient.setQueryData(QueryKey.LOGGED_IN, false), 1);
    }, [queryClient]);
};
