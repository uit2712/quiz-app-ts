export const GET_VOCABULARIES_BY_TOPIC_ID = 'GET_VOCABULARIES_BY_TOPIC_ID';

export const getVocabulariesByTopicId = (topicId: Number, vocabularies = []) => ({
    type: GET_VOCABULARIES_BY_TOPIC_ID,
    payload: {
        topicId,
        vocabularies
    }
});