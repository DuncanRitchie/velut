import dbConnect from '../../../lib/dbConnect'
import Word from '../../../models/Word'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const word = await Word.findById(id)
        if (!word) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: word })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const word = await Word.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!word) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: word })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedWord = await Word.deleteOne({ _id: id })
        if (!deletedWord) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
