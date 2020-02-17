import guidGenerator from "../shared-functions/guidGenerator";

export default class EnglishVocabulary {
    vocabularyId: string | number;
    vocabulary: string;
    transliteration?: string;
    meaning: string;
    image?: string;
    topicId: number;

    constructor({
        vocabulary,
        transliteration,
        meaning,
        image,
        topicId
    }: {
        vocabulary: string,
        transliteration?: string,
        meaning: string,
        image?: string,
        topicId: number,
    }) {
        this.vocabularyId = guidGenerator();
        this.vocabulary = vocabulary;
        this.transliteration = transliteration;
        this.meaning = meaning;
        this.image = image;
        this.topicId = topicId;
    }
}