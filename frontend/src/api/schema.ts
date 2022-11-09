import { axios } from '../axios';


export const getAvailable = async (id: Number): Promise<string> => {
    try {
        const { data } = await axios.get<string>('/script/body', { params: { id } });
        return data;
    } catch (e) {
        throw e;
        // TODO
    }
};
