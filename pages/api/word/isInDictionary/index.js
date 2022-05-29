import { findOneWordSelectOnlyWord } from "../../../../lib/words/word";

export default async function findOneWord(req, res) {
    const foundWord = await findOneWordSelectOnlyWord(req.query.word);
    res.send(foundWord);
}
