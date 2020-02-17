import IAction from '../interfaces/IAction';
import Topic from '../models/Topic';

export const GET_PARENT_TOPICS = 'GET_PARENT_TOPICS';
export const GET_ENGLISH_PARENT_TOPICS = 'GET_ENGLISH_PARENT_TOPICS';
export const GET_NOT_ENGLISH_PARENT_TOPICS = 'GET_NOT_ENGLISH_PARENT_TOPICS';

export const getParentTopics = (topics: Topic[]): IAction => ({
    type: GET_PARENT_TOPICS,
    payload: {
        topics
    }
});

export const getEnglishParentTopics = (): IAction => ({
    type: GET_ENGLISH_PARENT_TOPICS
});

export const getNotEnglishParentTopics = (): IAction => ({
    type: GET_NOT_ENGLISH_PARENT_TOPICS
});