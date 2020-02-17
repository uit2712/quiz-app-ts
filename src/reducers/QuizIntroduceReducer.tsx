import _ from 'lodash';
import IAction from '../interfaces/IAction';
import Question from '../models/Question';
import QuizPart from '../view-models/QuizPart';
import Topic from '../models/Topic';
import { GET_QUESTIONS_BY_TOPIC_ID, GET_TOPIC, SPLIT_QUESTIONS_INTO_PARTS } from '../actions/QuizIntroduceActions';

const initialState = {
    topic: null,
    questions: [],
    parts: []
};

export default function QuizIntroduceReducer(state = initialState, action: IAction) {
    const { payload, type } = action;
    
    switch(type) {
        case GET_TOPIC:
            return {
                ...state,
                topic: payload.topics.find((topic: Topic) => topic.topicId === payload.topicId)
            }
        case GET_QUESTIONS_BY_TOPIC_ID:
            return {
                ...state,
                questions: payload.questions.filter((question: Question) => question.topicId === payload.topicId)
            }
        case SPLIT_QUESTIONS_INTO_PARTS:
            return {
                ...state,
                parts: _.map(_.chunk(payload.questions, payload.numberQuestionsPerAPart),
                        (newQuestions: Question[], index: number) => new QuizPart({ quizPartName: `Phần ${index + 1}`, questions: newQuestions })),
            }
        default: return state;
    }
}