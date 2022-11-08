import React from 'react';
import { Button } from 'primereact/button';

import { useIsLoggedIn } from '../hooks/queries/useIsLoggedIn';
import { useLogin } from '../hooks/mutations/useLogin';
import { useLogout } from '../hooks/mutations/useLogout';


export const LoginButton: React.FC = () => {
    const { isLoggedIn, isLoading } = useIsLoggedIn();

    const login = useLogin();
    const logout = useLogout();
    const onClick = isLoggedIn ? logout : login;

    console.log(isLoggedIn);

    return (
        <Button onClick={onClick} disabled={isLoading}>
            {isLoggedIn ? (
                <>Выйти</>
            ) : (
                <>Войти</>
            )}
        </Button>
    );
};
