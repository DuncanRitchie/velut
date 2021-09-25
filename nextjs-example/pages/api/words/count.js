// const count = function(req, res) {
// 	Word.estimatedDocumentCount().exec((err, count) => {
// 		if (err) {
// 			res.send(err);
// 			return;
// 		}

// 		res.json({ "count": count });
// 	})
// }

import dbConnect from '../../../lib/dbConnect'
import Word from '../../../models/Word'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const count = await Word.estimatedDocumentCount() /* count all the data in the database */
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
