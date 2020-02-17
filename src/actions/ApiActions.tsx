import Topic from '../models/Topic';
import { TOPICS_BASE_URL, ENGLISH_VOCABULARIES_BASE_URL } from '../constants/UrlConstants';
import IAction from '../interfaces/IAction';
import EnglishVocabulary from '../models/EnglishVocabulary';

export const FETCH_TOPICS_SUCCESS = 'FETCH_TOPICS_SUCCESS';
export const FETCH_TOPICS_FAILURE = 'FETCH_TOPICS_FAILURE';
export const FETCH_TOPICS_BEGIN = 'FETCH_TOPICS_BEGIN';

export const FETCH_ENGLISH_VOCABULARIES_SUCCESS = 'FETCH_ENGLISH_VOCABULARIES_SUCCESS';
export const FETCH_ENGLISH_VOCABULARIES_FAILURE = 'FETCH_ENGLISH_VOCABULARIES_FAILURE';
export const FETCH_ENGLISH_VOCABULARIES_BEGIN = 'FETCH_ENGLISH_VOCABULARIES_BEGIN';

export const fetchTopics = () => {
    return (dispatch: any) => {
        dispatch(fetchTopicsBegin());
        return fetch(TOPICS_BASE_URL)
            .then((response: Response) => response.json())
            .then((responseData: Array<any>) => {
                let topics: Topic[] = [];
                for (let item of responseData) {
                    topics.push(new Topic(item));
                }
                dispatch(fetchTopicsSuccess(topics));
            }).catch((error: Error) => {
                dispatch(fetchTopicsFailure(error));
                return error;
            });
    }
}

const fetchTopicsBegin = (): IAction => ({
    type: FETCH_TOPICS_BEGIN
});

const fetchTopicsSuccess = (topics: Topic[]): IAction => ({
    type: FETCH_TOPICS_SUCCESS,
    payload: {
        topics
    }
});

const fetchTopicsFailure = (error: Error): IAction => ({
    type: FETCH_TOPICS_FAILURE,
    payload: {
        error
    }
});

export const fetchVocabularies = () => {
    return (dispatch: any) => {
        dispatch(fetchEnglishVocabulariesBegin());
        return fetch(ENGLISH_VOCABULARIES_BASE_URL)
            .then((response: Response) => response.json())
            .then((responseData: Array<any>) => {
                let vocabularies: EnglishVocabulary[] = [];
                for (let item of responseData) {
                    vocabularies.push(new EnglishVocabulary(item));
                }
                dispatch(fetchEnglishVocabulariesSuccess(vocabularies));
            }).catch((error: Error) => {
                dispatch(fetchEnglishVocabulariesFailure(error));
                return error;
            });
    }
}

const fetchEnglishVocabulariesBegin = (): IAction => ({
    type: FETCH_ENGLISH_VOCABULARIES_BEGIN
});

const fetchEnglishVocabulariesSuccess = (vocabularies: EnglishVocabulary[]): IAction => ({
    type: FETCH_ENGLISH_VOCABULARIES_SUCCESS,
    payload: {
        vocabularies
    }
});

const fetchEnglishVocabulariesFailure = (error: Error): IAction => ({
    type: FETCH_ENGLISH_VOCABULARIES_FAILURE,
    payload: {
        error
    }
});