import { axios } from '../axios';


export const getAvailable = async (id: Number | undefined): Promise<string> => {
    try {
        if (id === undefined) {
            return '';
        }
        const { data } = await axios.get<string>('/script/body', { params: { id } });
        return data;
    } catch (e) {
        throw e;
        // TODO
    }
};
