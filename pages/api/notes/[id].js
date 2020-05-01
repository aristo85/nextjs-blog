import dbConnect from "../../../utils/dbConnect";
import Note from '../../../models/note';

dbConnect();

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req;

    switch (method) {
        case 'GET':
            try {
                const note = await Note.findById(id);

                if(!note) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: note });
            }catch (e) {
                res.status(400).json({ success: false });
            }
            break;
        case 'PUT':
            try {
                const note = await Note.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });

                if(!note) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: note });
            }catch (e) {
                res.status(400).json({ success: false });
            }
            break;
        case 'DELETE':
            try {
                const deltetedNote = await Note.deleteOne({ _id: id });

                if(!deltetedNote) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: {} });
            }catch (e) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}