import subwordObjects from './Subwords'

// In these two functions, wordObjects is an array of objects, such as words.json

// These two functions are not actually used anywhere in velut!

// subwordStrings() returns an array of strings, e.g. subwordStrings("duncanusrichardus",words) = 
// ["charādrius","Dīnarchus","Hadriacus","Hadriānus","Rīchardus","cachinnās","cachinnus","candidāns", ...]

const subwordStrings = (input,wordObjects) => {
    return subwordObjects(input,wordObjects).map((object,index)=>{
        return object.Word
    })
}

// subwordStringsNoMacra() returns an array of demacronized strings, e.g. subwordStrings("duncanusrichardus") = 
// ["charadrius","Dinarchus","Hadriacus","Hadrianus","Richardus","cachinnas","cachinnus","candidans", ...]

const subwordStringsNoMacra = (input,wordObjects) => {
    return subwordObjects(input,wordObjects).map((object,index)=>{
        return object.NoMacra
    })
}

// The two functions are not actually used anywhere, but let’s make them available regardless.
export default {subwordStrings, subwordStringsNoMacra}