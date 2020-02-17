import Choice from './Choice';

export default class RadioChoices {
    questionContent: string;
    values: Choice[] = [];
    selectedChoice?: Choice;

    constructor({
        values,
        selectedChoice,
        questionContent,
    }: {
        values: Choice[],
        selectedChoice?: Choice,
        questionContent: string,
    }) {
        this.values = values || [];
        this.selectedChoice = selectedChoice;
        this.questionContent = questionContent || '';
    }
}