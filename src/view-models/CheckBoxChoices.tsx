import _ from 'lodash';
import Choice from './Choice';

export default class CheckBoxChoices {
    questionContent: string;
    values: Choice[] = [];
    selectedChoices: Choice[] = [];

    constructor({
        values,
        selectedChoices,
        questionContent,
    }: {
        values: Choice[],
        selectedChoices?: Choice[],
        questionContent: string,
    }) {
        this.values = _.isNil(values) ? [] : values;
        this.selectedChoices = _.isNil(selectedChoices) ? [] : selectedChoices;
        this.questionContent = _.isNil(questionContent) ? '' : questionContent;
    }

    isChoiceExists(choice: Choice) {
        if (_.isNil(choice))
            return false;

        return !_.isNil(this.selectedChoices.find((c: Choice) => c.index === choice.index));
    }
}