import mongoose from 'mongoose'

const lemmaSchema = new mongoose.Schema(
  {
    // Ord: Number,
    Word: String,
    PartOfSpeech: String,
    Meanings: String,
    Notes: String,
    Transliterations: String,
    // Scansion: String,
    // SyllableCount: Number,
    Root: String,
    // FormCount: Number,
    NoTypeTag: String,
    NoMacra: String,
    NoMacraLowerCase: String,
    Forms: Object,
    // Whether generated forms (`Forms`) are displayed depends on the
    // NEXT_PUBLIC_SHOW_GENERATED_FORMS_FOR env var, which lists the
    // parts of speech for which all forms have been checked.
    // But for parts of speech where some lemmata have had their forms checked
    // and some haven’t, it’s useful to have a property distinguishing those lemmata.
    // This is temporary while I’m checking forms — eventually all parts of speech
    // will be in the env var and all lemmata will have `FormsHaveBeenChecked`
    // equal to true, making both the env var and the property unnecessary.
    FormsHaveBeenChecked: Boolean,
  },
  { collection: 'lemmata' },
)

//// If Lemma is already on the Mongoose model, we use it, otherwise add it.
export default mongoose.models?.Lemma || mongoose.model('Lemma', lemmaSchema)
