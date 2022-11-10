import { useQuery } from 'react-query';
import { AxiosError } from 'axios';

import { QueryKey } from '../../queryClient';
import { getById } from '../../api/schema';
import { apiErrorToast, useToast } from '../../toast';


export interface UseSchemaResult {
    schema?: string;
    isLoading: boolean;
}

export const useSchema = (id?: number): UseSchemaResult => {
    const toast = useToast();

    const { data: schema, isLoading } = useQuery(
        [QueryKey.SCHEMA, id],
        () => getById(id),
        {
            onError: err => {
                if (err instanceof AxiosError) {
                    apiErrorToast(toast, err);
                    console.log(err);
                }
            },
        },
    );

    return { schema, isLoading };
};
