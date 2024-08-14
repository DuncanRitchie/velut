//// The regexes below are used in TextWithQuotedLatin.jsx

//// This string is interpolated into regexes for finding runs of characters that cannot be in Latin words.
//// Any piece of text in between such runs of characters will be treated as a Latin word (rendered with LatinLink).
//// Currently, the characters are whitespace, quote-marks, and some other punctuation.
//// If the need arises, more characters can be added between the square brackets.
//// The \\s here is \s meaning whitespace, with the backward slash escaped; likewise with \\[\\] meaning square brackets.
const punctuationSubregex = `[\\s‘’/,;?!\\[\\]]+`

//// This regex matches immediately before and immediately after a run of punctuation/whitespace — ie, at any word boundary.
//// (So it’s similar to /\b/ but better adapted for velut.)
const regexSplittingOnPunctuation = new RegExp(`(?=${punctuationSubregex})|(?<=${punctuationSubregex})`)
//// This regex simply matches a run of punctuation/whitespace.
const regexMatchingPunctuation = new RegExp(punctuationSubregex)

//// Similarly to above, here’s a string to interpolate into regexes for finding single-quoted text,
//// a regex that matches immediately before and immediately after single-quoted text,
//// and a regex that simply matches a piece of single-quoted text.
const quotedTextSubregex = `‘.+’`
const regexSplittingOnQuotedText = new RegExp(`(?=${quotedTextSubregex})|(?<=${quotedTextSubregex})`)
const regexMatchingQuotedText = new RegExp(quotedTextSubregex)

export { regexSplittingOnPunctuation, regexMatchingPunctuation, regexSplittingOnQuotedText, regexMatchingQuotedText }
