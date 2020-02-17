export default class QuizPart<T> {
    quizPartName: string;
    questions: T[];

    constructor({
        quizPartName,
        questions
    }: {
        quizPartName: string,
        questions: T[]
    }) {
        this.quizPartName = quizPartName;
        this.questions = questions;
    }
}