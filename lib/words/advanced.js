import dbConnect from '../dbConnect'
import Word from '../../models/Word'

export default async function findAdvanced({ spelling, scansion, elision, sort }) {
    await dbConnect()
	//// { spelling: String, scansion: String, elision: "on"|"", sort: String }
	let findObject = {};
	let criteriaAreValid = false;
	let elisionAllowed = elision == "on";
	const sortStrings = {
		"alphabetical": "NoMacraLowerCase NoMacra Word",
		"classical": "Sort",
		"ecclesiastical": "EcclesSort"
	}
	let sortOrDefaultSort = sort
	if (!sortStrings.hasOwnProperty(sortOrDefaultSort)) {
		sortOrDefaultSort = "alphabetical";
	}

	// If there is anything in the scansion input…
	if (scansion) {
		let scansionAsRegex = scansion
			.replace(/[^lsx\.~_–⏑]/gi, "")  // Discard any invalid characters.
			.replace(/\./g, "x")            // x and . both mean an anceps syllable (can be long or short).
			.replace(/(?<![lsx])~/gi, "")  // ~ has no effect if not preceded by a letter.
			.replace(/(?:.~)+_/g, "_")      // Tokens made optional have no effect before _.
			.replace(/_(?:.~)+/g, "_")      // Tokens made optional have no effect after _.
			.replace(/[_]+/gi, "_")         // Collapse consecutive underscores into one underscore.
			.replace(/l/gi, "–")            // Long syllable.
			.replace(/s/gi, "⏑")            // Short syllable.
			.replace(/^_$/, "")             // Queries that would return all words should not proceed.
			.replace(/^x_$/i, "")           // Queries that would return all words should not proceed.
			.replace(/^_x$/i, "")           // Queries that would return all words should not proceed.
			.replace(/x/gi, "[–⏑]")         // Anceps syllable can be a long or a short.
			.replace(/~/g, "?")             // ~ makes the preceding token optional.
			.replace(/_/g, ".*");           // Zero or more of anything.

		// If the `scansion` is now the empty string, we do not use it in the search. Otherwise, we do.
		if (scansionAsRegex) {
			scansionAsRegex = `^${scansionAsRegex}$`;
			if (elisionAllowed) {
				findObject.ScansionWithElision = {"$regex": scansionAsRegex};
			}
			else {
				findObject.Scansion = {"$regex": scansionAsRegex};
			}
			criteriaAreValid = true;
		}
	}

	// If there is anything in the spelling input…
	if (spelling) {
		let spellingAsRegex = spelling
			.replace(/[^abcdefghiklmnopqrstuvxyzCV~._]/g, "")  // Discard invalid characters.
			.replace(/C/g, "[bcdfghklmnpqrstvxz]")             // Any consonant.
			.replace(/V/g, "[aeiouy]")                         // Any vowel.
			.replace(/(?<![A-Za-z.])~/g, "")                   // ~ has no effect if not preceded by a letter.
			.replace(/(?:.~)+_/g, "_")                         // Tokens made optional have no effect before _.
			.replace(/_(?:.~)+/g, "_")                         // Tokens made optional have no effect after _.
			.replace(/^_$/, "")                                // Searches that would return everything are not allowed.
			.replace(/~/g, "?")                                // ~ makes the preceding token optional.
			.replace(/_/g, ".*");                              // Zero or more of anything.

		// If the `spelling` is now the empty string, we do not use it in the search. Otherwise, we do.
		if (spellingAsRegex) {
			spellingAsRegex = `^${spellingAsRegex}$`;
			findObject.NoMacraLowerCase = {"$regex": spellingAsRegex};

			criteriaAreValid = true;
		}
	}

	if (criteriaAreValid) {
		const foundWordObjects = await Word.find(findObject)
            .sort(sortStrings[sortOrDefaultSort])
            .limit(1000)
            .select({"Word": 1, "_id": 0})
            .exec()

        const words = foundWordObjects.map(word=>word.toObject().Word)

        return {
            success: true,
            error: null,
            words,
        }
	}
	else {
        return {
            success: false,
            //// `error` is displayed on the front-end so needs to be user-friendly.
            error: "Please specify scansion or spelling.",
            words: null,
        }
	}
}
