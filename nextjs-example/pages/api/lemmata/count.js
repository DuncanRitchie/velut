// count: function(req, res) {
//   Lemma.estimatedDocumentCount().exec((err, count) => {
//     if (err) {
//       res.send(err);
//       return;
//     }

//     res.json({ "count": count });
//   })
// },

import dbConnect from '../../../lib/dbConnect'
import Lemma from '../../../models/Lemma'

export async function count() {
    try {
        await dbConnect()
        const count = await Lemma.estimatedDocumentCount()
        return { success: true, count: count }
    }
    catch (error) {
        return { success: false }
    }
}

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const data = await count()
            if (data.success) {
                res.status(200).json(data)
            }
            else {
                res.status(400).json(data)
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}
