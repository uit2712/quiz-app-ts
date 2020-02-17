import _ from 'lodash';
import IAction from '../interfaces/IAction';
import Topic from '../models/Topic';
import {
    GET_ENGLISH_PARENT_TOPICS,
    GET_NOT_ENGLISH_PARENT_TOPICS,
    GET_PARENT_TOPICS
} from '../actions/HomeActions';

const initialState = {
    parentTopics: [],
    englishParentTopics: [],
    notEnglishParentTopics: []
};

export default function HomeReducer(state = initialState, action: IAction) {
    const { type, payload } = action;
    
    switch(type) {
        case GET_PARENT_TOPICS:
            return {
                ...state,
                parentTopics: payload.topics.filter((topic: Topic) => _.isNil(topic.parentTopicId))
            }
        case GET_ENGLISH_PARENT_TOPICS:
            return {
                ...state,
                englishParentTopics: state.parentTopics.filter((topic: Topic) => topic.isEnglishVocaTopic)
            }
        case GET_NOT_ENGLISH_PARENT_TOPICS:
            return {
                ...state,
                notEnglishParentTopics: state.parentTopics.filter((topic: Topic) => !topic.isEnglishVocaTopic)
            }
        default: return state;
    }
}