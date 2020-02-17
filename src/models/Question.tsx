import _ from 'lodash';
import guidGenerator from '../shared-functions/guidGenerator';

export default class Question {
    questionId: number | string;
    questionContent: string;
    rightAnswers: string[] = [];
    imageUrl?: string;
    answers: string[] = [];
    topicId: number;

    constructor({
        questionContent,
        rightAnswers,
        imageUrl,
        answerA,
        answerB,
        answerC,
        answerD,
        topicId
    }: {
        questionContent: string,
        rightAnswers: string,
        imageUrl?: string,
        answerA?: string,
        answerB?: string,
        answerC?: string,
        answerD?: string,
        topicId: number,
    }) {
        this.questionId = guidGenerator();
        this.questionContent = questionContent;
        this.imageUrl = imageUrl;
        if (!_.isNil(answerA))
            this.answers.push(answerA);
        if (!_.isNil(answerB))
            this.answers.push(answerB);
        if (!_.isNil(answerC))
            this.answers.push(answerC);
        if (!_.isNil(answerD))
            this.answers.push(answerD);
        if (!_.isNil(rightAnswers))
            this.rightAnswers = _.split(rightAnswers, ',');
        this.topicId = topicId;
    }
}