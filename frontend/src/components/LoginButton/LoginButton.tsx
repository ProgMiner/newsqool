import React from 'react';
import { Button } from 'primereact/button';
import { cn } from '@bem-react/classname';

import { useIsLoggedIn } from '../../hooks/queries/useIsLoggedIn';
import { useLogin } from '../../hooks/mutations/useLogin';
import { useLogout } from '../../hooks/mutations/useLogout';

import './LoginButton.css';


const cnLoginButton = cn('LoginButton');

export const LoginButton: React.FC = () => {
    const { isLoggedIn, isLoading } = useIsLoggedIn();

    const login = useLogin();
    const logout = useLogout();
    const onClick = isLoggedIn ? logout : login;

    return (
        <Button className={cnLoginButton('Button')}
                onClick={onClick} disabled={isLoading}>
            {isLoggedIn ? (
                <>Log out</>
            ) : (
                <>Log in</>
            )}
        </Button>
    );
};
