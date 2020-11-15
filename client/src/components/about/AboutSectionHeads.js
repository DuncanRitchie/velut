const sectionHeads = [
    "Backstory",
    "Web development",
    "Spelling",
    "Scansion",
    "Rhymes",
    "Consonyms, anagrams, and subwords",
    "Lemmata",
    "English to Latin",
    "Advanced Search",
    "Word compilation",
    "Future plans"
]
const sectionIds = sectionHeads.map((head=>{return head.replace(/ /g,"-").replace(/&\w*;/g,"").replace(/[;,.]/g,"").toLowerCase()}));

export {sectionHeads, sectionIds}