import { useQuery } from 'react-query';

import { QueryKey } from '../../queryClient';
import { getAvailable } from '../../api/schema';


export interface UseSchemaResult {
    schema?: string;
    isLoading: boolean;
}

export const useSchema = (id: Number): UseSchemaResult => {
    const { data: schema, isLoading } = useQuery(
        [QueryKey.SCHEMA, id],
        () => getAvailable(id),
    );

    return { schema, isLoading };
};
