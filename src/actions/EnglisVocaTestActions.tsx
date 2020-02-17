export const SET_IS_MEANING_QUESTION = 'SET_IS_MEANING_QUESTION';

export const setIsMeaningQuestion = (isMeaningQuestion: boolean) => ({
    type: SET_IS_MEANING_QUESTION,
    payload: {
        isMeaningQuestion
    }
})