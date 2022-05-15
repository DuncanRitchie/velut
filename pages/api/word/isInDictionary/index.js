import { findOneWordSelectOnlyWord } from "../../../../lib/words/word";

export default async function findOneWord(req, res) {
    const foundWord = await findOneWordSelectOnlyWord(req.query.word);
    res.send(foundWord);
    // if (foundWord.success) {
    //     const subwordsAsWords = foundWord.subwords.map((object)=>{
    //         return object.Word
    //     })
    //     return { success: true, subwords: subwordsAsWords }
    // }
    // else {
    //     return foundWord
    // }
}
