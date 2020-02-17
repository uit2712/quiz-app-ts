import Choice from '../view-models/Choice';

export const SHUFFLE_QUESTIONS = 'SHUFFLE_QUESTIONS';
export const GET_QUESTION_BY_INDEX = 'GET_QUESTION_BY_INDEX';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const RESET_WHEN_GO_BACK = 'RESET_WHEN_GO_BACK';
export const GENERATE_CHOICES = 'GENERATE_CHOICES';
export const CONFIRM_ANSWER = 'CONFIRM_ANSWER';
export const SELECT_CHOICE = 'SELECT_CHOICE';
export const DESELECT_CHOICE = 'DESELECT_CHOICE';
export const DO_TESTING_PART_AGAIN = 'DO_TESTING_PART_AGAIN';

export function shuffleQuestions<T>(questions: T[] = []) {
    return ({
        type: SHUFFLE_QUESTIONS,
        payload: {
            questions
        }
    });
}

export const getQuestionByIndex = (index: number) => ({
    type: GET_QUESTION_BY_INDEX,
    payload: {
        index
    }
});

export const nextQuestion = () => ({
    type: NEXT_QUESTION
});

export const resetWhenGoBack = () => ({
    type: RESET_WHEN_GO_BACK
});

export const generateChoices = (questionContent: string, choices: Choice[] = []) => ({
    type: GENERATE_CHOICES,
    payload: {
        questionContent,
        choices,
    }
});

export const confirmAnswer = (isRightAnswer: boolean) => ({
    type: CONFIRM_ANSWER,
    payload: {
        isRightAnswer
    }
});

export const selectChoice = (choice: Choice) => ({
    type: SELECT_CHOICE,
    payload: {
        choice
    }
});

export const deselectChoice = (choice: Choice) => ({
    type: DESELECT_CHOICE,
    payload: {
        choice
    }
});

export const doTestingPartAgain = () => ({
    type: DO_TESTING_PART_AGAIN
});