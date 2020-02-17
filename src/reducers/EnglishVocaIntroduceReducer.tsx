import _ from 'lodash';
import EnglishVocabulary from '../models/EnglishVocabulary';
import IAction from '../interfaces/IAction';
import QuizPart from '../view-models/QuizPart';
import Topic from '../models/Topic';
import { GET_TOPIC, SPLIT_QUESTIONS_INTO_PARTS } from '../actions/QuizIntroduceActions';
import { GET_VOCABULARIES_BY_TOPIC_ID } from '../actions/EnglishVocaIntroduceActions';

const initialState = {
    topic: null,
    vocabularies: [],
    parts: []
};

export default function EnglishVocaIntroduceReducer(state = initialState, action: IAction) {
    const { type, payload } = action;
    
    switch(type) {
        case GET_TOPIC:
            return {
                ...state,
                topic: payload.topics.find((topic: Topic) => topic.topicId === payload.topicId)
            }
        case GET_VOCABULARIES_BY_TOPIC_ID:
            return {
                ...state,
                vocabularies: payload.vocabularies.filter((voca: EnglishVocabulary) => voca.topicId === payload.topicId)
            };
        case SPLIT_QUESTIONS_INTO_PARTS:
            return {
                ...state,
                parts: _.map(_.chunk(payload.questions, payload.numberQuestionsPerAPart),
                        (newQuestions: EnglishVocabulary[], index: number) => new QuizPart({ quizPartName: `Phần ${index + 1}`, questions: newQuestions })),
            };
        default: return state;
    }
}