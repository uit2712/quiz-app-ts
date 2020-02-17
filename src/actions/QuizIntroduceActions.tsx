import Topic from '../models/Topic';

export const GET_TOPIC = 'GET_TOPIC';
export const GET_QUESTIONS_BY_TOPIC_ID = 'GET_QUESTIONS_BY_TOPIC_ID';
export const SPLIT_QUESTIONS_INTO_PARTS = 'SPLIT_QUESTIONS_INTO_PARTS';

export const getTopic = (topicId: number, topics: Topic[] = []) => ({
    type: GET_TOPIC,
    payload: {
        topicId,
        topics
    }
});

export function getQuestionsByTopicId<T>(topicId: number, questions: T[]) {
    return ({
        type: GET_QUESTIONS_BY_TOPIC_ID,
        payload: {
            topicId,
            questions,
        }
    });
}

export function splitQuestionsIntoParts<T>(questions: T[], numberQuestionsPerAPart: number) {
    return ({
        type: SPLIT_QUESTIONS_INTO_PARTS,
        payload: {
            questions,
            numberQuestionsPerAPart
        }
    });
}