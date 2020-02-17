import _ from 'lodash';

export default class Choice {
    index: number = -1;
    value: string;
    isRightAnswer: boolean;

    constructor({
        index,
        value,
        isRightAnswer
    }: {
        index?: number,
        value: string,
        isRightAnswer: boolean,
    }) {
        this.index = _.isNil(index) ? -1 : index;
        this.value = value || '';
        this.isRightAnswer = isRightAnswer || false;
    }
}