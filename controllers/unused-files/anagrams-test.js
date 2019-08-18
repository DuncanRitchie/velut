// This file can be deleted.
// It was useful in rewriting findAnagrams() to use recursion.

const findAnagrams = require('../findAnagrams')
const flatten = require('flat')

subwordsWord = ["nūda","nūdā","nunc","unca","uncā","unda","undā","acū","anū","dūc","ūda","ūdā","ūna","ūnā","ac","ad","an","au","dā","nā","nū","ā","ū"]

subwords = [
    {Word: "nūda", NoMacra: "nuda"},
    {Word: "nūdā", NoMacra: "nuda"},
    {Word: "nunc", NoMacra: "nunc"},
    {Word: "unca", NoMacra: "unca"},
    {Word: "uncā", NoMacra: "unca"},
    {Word: "unda", NoMacra: "unda"},
    {Word: "undā", NoMacra: "unda"},
    {Word: "acū", NoMacra: "acu"},
    {Word: "anū", NoMacra: "anu"},
    {Word: "dūc", NoMacra: "duc"},
    {Word: "ūda", NoMacra: "uda"},
    {Word: "ūdā", NoMacra: "uda"},
    {Word: "ūna", NoMacra: "una"},
    {Word: "ūnā", NoMacra: "una"},
    {Word: "ac", NoMacra: "ac"},
    {Word: "ad", NoMacra: "ad"},
    {Word: "an", NoMacra: "an"},
    {Word: "au", NoMacra: "au"},
    {Word: "dā", NoMacra: "da"},
    {Word: "nā", NoMacra: "na"},
    {Word: "nū", NoMacra: "nu"},
    {Word: "ā", NoMacra: "a"},
    {Word: "ū", NoMacra: "u"}
]

anagramsObject = findAnagrams("duncan",subwords)
anagrams = Object.getOwnPropertyNames(flatten(anagramsObject))

console.log(anagramsObject)
console.log(anagrams)