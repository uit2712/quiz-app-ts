import IAction from '../interfaces/IAction';
import { FETCH_TOPICS_SUCCESS, FETCH_ENGLISH_VOCABULARIES_SUCCESS } from '../actions/ApiActions';

const initialState = {
    topics: [],
    questions: [],
    numberQuestionsPerAPart: 20,
    englishVocabularies: [],
    numberVocabulariesPerAPart: 20,
}

export default function ApiReducer(state = initialState, action: IAction) {
    const { type, payload } = action;
    
    switch(type) {
        case FETCH_TOPICS_SUCCESS:
            return {
                ...state,
                topics: payload.topics
            }
        case FETCH_ENGLISH_VOCABULARIES_SUCCESS:
            return {
                ...state,
                englishVocabularies: payload.vocabularies
            }
        default: return state;
    }
}