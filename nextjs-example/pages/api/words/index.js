import dbConnect from '../../../lib/dbConnect'
import Word from '../../../models/Word'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const words = await Word.find({"Word": "fūlmārus"}) /* find all the data in our database */
        res.status(200).json({ success: true, data: words })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const word = await Word.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: word })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
