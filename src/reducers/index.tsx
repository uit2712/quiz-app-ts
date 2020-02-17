import ApiReducer from './ApiReducer';
import EnglishVocaIntroduceReducer from './EnglishVocaIntroduceReducer';
import EnglishVocaTestReducer from './EnglishVocaTestReducer';
import HomeReducer from './HomeReducer';
import QuizIntroduceReducer from './QuizIntroduceReducer';
import QuizTestReducer from './QuizTestReducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
    api: ApiReducer,
    home: HomeReducer,
    quizIntroduce: QuizIntroduceReducer,
    quizTest: QuizTestReducer,
    englishVocaIntroduce: EnglishVocaIntroduceReducer,
    englishVocaTest: EnglishVocaTestReducer
});

export default reducers;