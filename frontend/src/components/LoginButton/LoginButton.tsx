import React from 'react';
import { Button } from 'primereact/button';
import { cn } from '@bem-react/classname';

import { useIsLoggedIn } from '../../hooks/queries/useIsLoggedIn';
import { useLogin } from '../../hooks/mutations/useLogin';
import { useLogout } from '../../hooks/mutations/useLogout';

import './LoginButton.css';


export interface LoginButtonProps {
    className?: string;
}

const cnLoginButton = cn('LoginButton');

export const LoginButton: React.FC<LoginButtonProps> = ({ className }) => {
    const { isLoggedIn, isLoading } = useIsLoggedIn();

    const login = useLogin();
    const logout = useLogout();

    const onClick = isLoggedIn ? logout : login;
    const buttonLabel = isLoggedIn ? 'Log out' : 'Log in';

    return (
        <Button className={cnLoginButton(null, [className])}
                onClick={onClick} disabled={isLoading} label={buttonLabel} />
    );
};
