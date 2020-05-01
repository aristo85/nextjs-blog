import axios from 'axios';

export const getAllNotes = async () => {
    const res = await axios.get(process.env.URI);
    const { data } = await res;
    // console.log(res.data);
    return data.data;
};