import { axios } from '../axios';


export const getAvailable = async (id: Number): Promise<string> => {
    try {
        const { data } = await axios.get<string>('/script/body?id=' + id);
        return data;
    } catch (e) {
        throw e;
        // TODO
    }

    // TODO bad type
    throw new Error();
};
