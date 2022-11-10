import { useQueryClient } from 'react-query';
import { useCallback } from 'react';

import { QueryKey } from '../../queryClient';
import { sessionCookieName } from '../../config';
import { setCookie } from '../../utils/cookies';


export const useLogin = (): () => void => {
    const { refetchQueries } = useQueryClient();

    // TODO remove prompt
    return useCallback(() => {
        const cookie = prompt(`Введите значение cookie ${sessionCookieName} с сайта sqool:`);

        if (!cookie) {
            return;
        }

        setCookie(sessionCookieName, cookie);
        setTimeout(() => refetchQueries(QueryKey.AVAILABLE_CONTESTS), 1);
    }, [refetchQueries]);
};
