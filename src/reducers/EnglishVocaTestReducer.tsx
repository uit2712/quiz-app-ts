import _ from 'lodash';
import Choice from '../view-models/Choice';
import IAction from '../interfaces/IAction';
import RadioChoices from '../view-models/RadioChoices';
import {
    CONFIRM_ANSWER,
    DO_TESTING_PART_AGAIN,
    GENERATE_CHOICES,
    GET_QUESTION_BY_INDEX,
    NEXT_QUESTION,
    RESET_WHEN_GO_BACK,
    SELECT_CHOICE,
    SHUFFLE_QUESTIONS
    } from '../actions/SharedActions';
import { SET_IS_MEANING_QUESTION } from '../actions/EnglisVocaTestActions';

const initialState = {
    vocabularies: [],
    currentVocaIndex: 0,
    currentVoca: null,
    isNextQuestion: false,
    isRightAnswer: null,
    isMeaningQuestion: null,
    choices: new RadioChoices({
        questionContent: '',
        values: []
    }),
};

export default function EnglishVocaTestReducer(state = initialState, action: IAction) {
    const { type, payload } = action;

    switch (type) {
        case GET_QUESTION_BY_INDEX:
            return {
                ...state,
                currentVoca: state.vocabularies.find((voca, index) => index === payload.index)
            }
        case SHUFFLE_QUESTIONS:
            return {
                ...state,
                vocabularies: _.shuffle(payload.questions)
            }
        case GENERATE_CHOICES:
            return {
                ...state,
                choices: new RadioChoices({
                    values: _.shuffle(payload.choices)
                        .map((choice: Choice, index: number) =>
                            new Choice({
                                index,
                                value: choice.value,
                                isRightAnswer: choice.isRightAnswer
                            })
                        ),
                    questionContent: payload.questionContent,
                })
            }
        case SELECT_CHOICE:
            return {
                ...state,
                choices: new RadioChoices({
                    values: state.choices.values,
                    questionContent: state.choices.questionContent,
                    selectedChoice: payload.choice
                })
            }
        case CONFIRM_ANSWER:
            return {
                ...state,
                isRightAnswer: payload.isRightAnswer,
                isNextQuestion: true,
            }
        case NEXT_QUESTION:
            return {
                ...state,
                currentVocaIndex: state.currentVocaIndex + 1,
                isRightAnswer: null,
                isNextQuestion: false,
                isMeaningQuestion: null,
            }
        case DO_TESTING_PART_AGAIN:
            return {
                ...state,
                currentVocaIndex: 0,
                currentVoca: null,
                isNextQuestion: false,
                isRightAnswer: null,
                isMeaningQuestion: null,
                choices: new RadioChoices({
                    questionContent: '',
                    values: []
                }),
            }
        case SET_IS_MEANING_QUESTION:
            return {
                ...state,
                isMeaningQuestion: payload.isMeaningQuestion
            }
        case RESET_WHEN_GO_BACK: return initialState;
        default: return state;
    }
}