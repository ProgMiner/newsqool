import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

import { QueryKey } from '../../queryClient';
import { deleteCookie } from '../../utils/cookies';
import { sessionCookieName } from '../../config';


export const useLogout = (): () => void => {
    const { removeQueries } = useQueryClient();

    return useCallback(() => {
        deleteCookie(sessionCookieName);
        setTimeout(() => removeQueries(QueryKey.AVAILABLE_CONTESTS), 1);
    }, [removeQueries]);
};
