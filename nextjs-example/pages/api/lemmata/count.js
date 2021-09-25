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

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const count = await Lemma.estimatedDocumentCount() /* count all the lemmata in the database */
        res.status(200).json({ success: true, count: count })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
