import axios from 'axios';

export const getAllNotes = async () => {
    const res = await axios.get(`${process.env.URI}/api/notes`);
    const { data } = await res.data;

    return data;
};

export const getAllPaths = async () => {
    const data = await getAllNotes();
    return data.map(note => {
        return {
            params: {
                id: note._id
            }
        }
    });
};

export const getNoteById = async (id) => {
    const res = await axios.get(`${process.env.URI}/${id}`);
    return res.data;
};