import _ from 'lodash';
import CheckBoxChoices from '../view-models/CheckBoxChoices';
import Choice from '../view-models/Choice';
import IAction from '../interfaces/IAction';
import {
    CONFIRM_ANSWER,
    DESELECT_CHOICE,
    DO_TESTING_PART_AGAIN,
    GENERATE_CHOICES,
    GET_QUESTION_BY_INDEX,
    NEXT_QUESTION,
    RESET_WHEN_GO_BACK,
    SELECT_CHOICE,
    SHUFFLE_QUESTIONS
    } from '../actions/SharedActions';

const initialState = {
    questions: [],
    currentQuestionIndex: 0,
    currentQuestion: null,
    isNextQuestion: false,
    isRightAnswer: null,
    choices: new CheckBoxChoices({
        questionContent: '',
        values: []
    })
};

export default function QuizTestReducer(state = initialState, action: IAction) {
    const { type, payload } = action;

    switch(type) {
        case SHUFFLE_QUESTIONS:
            return {
                ...state,
                questions: _.shuffle(payload.questions)
            };
        case GET_QUESTION_BY_INDEX:
            return {
                ...state,
                currentQuestion: state.questions.find((question, index) => index === payload.index)
            };
        case SELECT_CHOICE:
            return {
                ...state,
                choices:
                    (_.isNil(payload.choice) || state.choices.isChoiceExists(payload.choice))
                    ? state.choices
                    : new CheckBoxChoices({
                        values: state.choices.values,
                        questionContent: state.choices.questionContent,
                        selectedChoices: [...state.choices.selectedChoices, payload.choice]
                    })
            }
        case DESELECT_CHOICE:
            return {
                ...state,
                choices:
                    (_.isNil(payload.choice) || !state.choices.isChoiceExists(payload.choice))
                    ? state.choices
                    : new CheckBoxChoices({
                        values: state.choices.values,
                        questionContent: state.choices.questionContent,
                        selectedChoices: state.choices.selectedChoices.filter((choice: Choice) => choice.index !== payload.choice.index)
                    })
            };
        case CONFIRM_ANSWER:
            return {
                ...state,
                isRightAnswer: payload.isRightAnswer,
                isNextQuestion: true,
            };
        case NEXT_QUESTION:
            return {
                ...state,
                currentQuestionIndex: state.currentQuestionIndex + 1,
                isRightAnswer: null,
                isNextQuestion: false,
                choices: new CheckBoxChoices({
                    questionContent: '',
                    values: []
                })
            };
        case GENERATE_CHOICES:
            return {
                ...state,
                choices: new CheckBoxChoices({
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
        case DO_TESTING_PART_AGAIN:
            return {
                ...state,
                currentQuestionIndex: 0,
                currentQuestion: null,
                isNextQuestion: false,
                isRightAnswer: null,
                choices: new CheckBoxChoices({
                    questionContent: '',
                    values: []
                })
            }
        case RESET_WHEN_GO_BACK: return initialState;
        default: return state;
    }
}