const objectToArray = (object) => {
    let keysArray = Object.getOwnPropertyNames(object)
    // The keys and their values will go into a new array.
    let array = []
    // For every letter, add an array containing it and its frequency to array.
    for (let i = 0; i < keysArray.length; i++) {
        array[i] = [keysArray[i],object[keysArray[i]]]
    }
    return array
}

export default objectToArray

// let exampleObject = {
//     name: "Duncan Ritchie",
//     age: 23,
//     location: "Chester, England",
//     interests: ["coding","Latin","birdwatching","photography"]
// }

// console.log(objectToArray(exampleObject))