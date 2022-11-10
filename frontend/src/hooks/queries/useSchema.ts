import { useQuery } from 'react-query';

import { QueryKey } from '../../queryClient';
import { getById } from '../../api/schema';


export interface UseSchemaResult {
    schema?: string;
    isLoading: boolean;
}

export const useSchema = (id?: number): UseSchemaResult => {
    const { data: schema, isLoading } = useQuery(
        [QueryKey.SCHEMA, id],
        () => getById(id),
    );

    return { schema, isLoading };
};
