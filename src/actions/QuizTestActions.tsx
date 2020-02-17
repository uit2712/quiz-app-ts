export const SELECT_ANSWER = 'SELECT_ANSWER';
export const DESELECT_ANSWER = 'DESELECT_ANSWER';

export const deselectAnswer = (answer: string) => ({
    type: DESELECT_ANSWER,
    payload: {
        answer
    }
});

export const selectAnswer = (answer: string) => ({
    type: SELECT_ANSWER,
    payload: {
        answer
    }
});