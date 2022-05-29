import { findOneWordSelectOnlyWord } from "../../../../lib/words/word";

//// Currently this is only used in ManyCSR.
export default async function findOneWord(req, res) {
    const foundWord = await findOneWordSelectOnlyWord(req.query.word);
    res.send(foundWord);
}
