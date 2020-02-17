import _ from 'lodash';

export function displayAnswer(value: any) {
    if (_.isNil(value))
        return 'hidden-answer';
    else return 'visible-answer';
}

export function hideButtonConfirm() {
    let buttonConfirmElement = document.getElementById('btn-confirm-answer');
    if (buttonConfirmElement)
        buttonConfirmElement.style.display = 'none';
}

export function showButtonConfirm() {
    let buttonConfirmElement = document.getElementById('btn-confirm-answer');
    if (buttonConfirmElement)
        buttonConfirmElement.style.display = 'block';
}

export function hideButtonNext() {
    let buttonNextElement = document.getElementById('btn-next-question');
    if (buttonNextElement)
        buttonNextElement.style.display = 'none';
}

export function showButtonNext() {
    let buttonNextElement = document.getElementById('btn-next-question');
    if (buttonNextElement)
        buttonNextElement.style.display = 'block';
}

export function showRightAnswerAlert() {
    let rightAnswerAlertElement = document.getElementById('right-answer-alert');
    if (rightAnswerAlertElement)
        rightAnswerAlertElement.style.display = 'block';
}

export function showWrongAnswerAlert() {
    let wrongAnswerAlertElement = document.getElementById('wrong-answer-alert');
    if (wrongAnswerAlertElement)
        wrongAnswerAlertElement.style.display = 'block';
}

export function hideRightAnswerAlert() {
    let rightAnswerAlertElement = document.getElementById('right-answer-alert');
    if (rightAnswerAlertElement)
        rightAnswerAlertElement.style.display = 'none';
}

export function hideWrongAnswerAlert() {
    let wrongAnswerAlertElement = document.getElementById('wrong-answer-alert');
    if (wrongAnswerAlertElement)
        wrongAnswerAlertElement.style.display = 'none';
}

export function showButtonDoTestingPartAgain() {
    let buttonDoTestingPartAgainElement
        = document.getElementById('btn-do-testing-part-again');
    if (buttonDoTestingPartAgainElement)
        buttonDoTestingPartAgainElement.style.display = 'block';
}

export function showButtonGoBackToTestingPart() {
    let buttonGoBackToTestingPartElement
        = document.getElementById('btn-go-back-to-testing-part');
    if (buttonGoBackToTestingPartElement)
        buttonGoBackToTestingPartElement.style.display = 'block';
}

export function hideButtonDoTestingPartAgain() {
    let buttonDoTestingPartAgainElement
        = document.getElementById('btn-do-testing-part-again');
    if (buttonDoTestingPartAgainElement)
        buttonDoTestingPartAgainElement.style.display = 'none';
}

export function hideButtonGoBackToTestingPart() {
    let buttonGoBackToTestingPartElement
        = document.getElementById('btn-go-back-to-testing-part');
    if (buttonGoBackToTestingPartElement)
        buttonGoBackToTestingPartElement.style.display = 'none';
}

export function replaceSpecialCharacters(text: String, replacedText = '') {
    if (_.isNil(text) || _.isNil(replacedText))
        return '';

    return text.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, replacedText);
}

export function replaceNumberCharacters(text: String, replacedText = '') {
    if (_.isNil(text) || _.isNil(replacedText))
        return '';

    return text.replace(/[0-9]/g, replacedText);
}