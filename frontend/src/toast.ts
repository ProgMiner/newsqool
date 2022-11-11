import React, { useContext } from 'react';
import { Toast } from 'primereact/toast';


const toastContext = React.createContext<React.RefObject<Toast> | undefined>(undefined);

export const ToastProvider = toastContext.Provider;

export const useToast = () => {
    const toastRef = useContext(toastContext);

    return toastRef?.current!;
};

export const apiErrorToast = (toast: Toast, e: unknown) =>
    toast.show({ severity: 'error', summary: 'API Error', detail: e!.toString() });
