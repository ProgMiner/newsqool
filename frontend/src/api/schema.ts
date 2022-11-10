import { axios } from '../axios';


export const getById = async (id?: number): Promise<string> => {
    if (id === undefined) {
        return '';
    }

    const { data } = await axios.get<string>('/script/body', { params: { id } });
    return data;
};
