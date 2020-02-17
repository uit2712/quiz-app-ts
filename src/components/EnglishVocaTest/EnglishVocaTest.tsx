import _ from 'lodash';
import AnsweringAlerts from '../../shared-components/AnsweringAlerts';
import Choice from '../../view-models/Choice';
import EnglishVocabulary from '../../models/EnglishVocabulary';
import RadioChoices from '../../view-models/RadioChoices';
import React, { useEffect } from 'react';
import {
    confirmAnswer,
    doTestingPartAgain,
    generateChoices,
    getQuestionByIndex,
    nextQuestion,
    resetWhenGoBack,
    selectChoice,
    shuffleQuestions
    } from '../../actions/SharedActions';
import { connect } from 'react-redux';
import {
    displayAnswer,
    hideButtonConfirm,
    hideButtonDoTestingPartAgain,
    hideButtonGoBackToTestingPart,
    hideButtonNext,
    hideRightAnswerAlert,
    hideWrongAnswerAlert,
    replaceNumberCharacters,
    replaceSpecialCharacters,
    showButtonConfirm,
    showButtonDoTestingPartAgain,
    showButtonGoBackToTestingPart,
    showButtonNext,
    showRightAnswerAlert,
    showWrongAnswerAlert
    } from '../../shared-functions/SharedFunctions';
import { Form } from 'react-bootstrap';
import { Map } from 'react-lodash';
import { setIsMeaningQuestion } from '../../actions/EnglisVocaTestActions';
import { withRouter } from 'react-router-dom';
import './EnglishVocaTest.css';
const Speech = require('speak-tts').default;
const speech = new Speech();
speech.setLanguage('en-US');
function EnglishVocaTest({
    history: {
        location: {
            state: {
                topic,
                part
            }
        },
        goBack
    },
    shuffleQuestions,
    getQuestionByIndex,
    currentVocaIndex,
    resetWhenGoBack,
    vocabularies,
    currentVoca,
    doTestingPartAgain,
    choices,
    confirmAnswer,
    nextQuestion,
}: {
    history: any,
    shuffleQuestions: Function,
    getQuestionByIndex: Function,
    currentVocaIndex: number,
    resetWhenGoBack: Function,
    vocabularies: EnglishVocabulary[],
    currentVoca: EnglishVocabulary,
    doTestingPartAgain: Function,
    choices: RadioChoices,
    confirmAnswer: Function,
    nextQuestion: Function,
}) {
    useEffect(() => {
        shuffleQuestions(part?.questions);
        getQuestionByIndex(currentVocaIndex);

        return () => {
            resetWhenGoBack();
            speech.cancel();
        }
    }, []);

    useEffect(() => {
        getQuestionByIndex(currentVocaIndex);
    }, [currentVocaIndex]);

    useEffect(() => {
        if (isTestingPartDone()) {
            showButtonDoTestingPartAgain();
            showButtonGoBackToTestingPart();
            hideButtonNext();
            hideButtonConfirm();
        }
    }, [currentVoca]);

    function isTestingPartDone() {
        return vocabularies.length > 0
            && currentVocaIndex >= vocabularies.length;
    }

    function _doTestingPartAgain() {
        doTestingPartAgain();

        hideButtonDoTestingPartAgain();
        hideButtonGoBackToTestingPart();
        showButtonConfirm();
    }

    function resetAllRadioButtons() {
        choices.values.forEach((choice: Choice, index: number) => {
            let radioElement = document.getElementById(`answer-${index}`) as HTMLInputElement;
            let labelForRadioElement = document.querySelector(`label[for='answer-${index}']`)
            if (_.isNil(radioElement) || _.isNil(labelForRadioElement))
                return;

            radioElement.checked = false;
            if (radioElement.classList.contains('wrong-answer'))
                radioElement.classList.remove('wrong-answer');
            if (radioElement.classList.contains('right-answer'))
                radioElement.classList.remove('right-answer');
            if (labelForRadioElement.classList.contains('wrong-answer'))
                labelForRadioElement.classList.remove('wrong-answer');
            if (labelForRadioElement.classList.contains('right-answer'))
                labelForRadioElement.classList.remove('right-answer');
        });
    }

    function confirm() {
        if (choices.selectedChoice) {
            confirmAnswer(choices.selectedChoice.isRightAnswer);
            showRightAnswers();
        }
    }

    function showRightAnswers() {
        choices.values.forEach((choice: Choice, index: number) => {
            let radioElement = document.getElementById(`answer-${index}`);
            let labelForRadioElement = document.querySelector(`label[for='answer-${index}']`)
            if (_.isNil(radioElement) || _.isNil(labelForRadioElement))
                return;

            if (choice.isRightAnswer) {
                radioElement.classList.add('right-answer');
                labelForRadioElement.classList.add('right-answer');
            } else {
                if (choices.selectedChoice
                    && choice.index === choices.selectedChoice.index) {
                    radioElement.classList.add('wrong-answer');
                    labelForRadioElement.classList.add('wrong-answer');
                }
            }
        });
    }

    function _nextQuestion() {
        resetAllRadioButtons();
        hideWrongAnswerAlert();
        hideRightAnswerAlert();
        showButtonConfirm();
        hideButtonNext();
        nextQuestion();
        speech.cancel();
    }

    return (
        <div className='English-Voca-Test'>
            <div className='card-header'>
                <span>{topic?.topicName}</span>
                <span>></span>
                <span>{part?.quizPartName}</span>
            </div>
            <div className='card-body col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                <AnsweringAlerts
                    rightAlertMessage='Bạn trả lời đúng rồi, tốt lắm :)'
                    wrongAlertMessage='Bạn trả lời sai rồi, cố gắng chục lần sau nha :)'
                />
                <CurrentVoca />
                <button
                    id='btn-confirm-answer'
                    type='submit'
                    className='btn btn-primary'
                    onClick={confirm}
                    disabled={_.isNil(choices.selectedChoice)}
                >
                    Chọn
                </button>
                <button
                    id='btn-next-question'
                    type='submit'
                    className='btn btn-primary'
                    onClick={_nextQuestion}
                >
                    Tiếp
                </button>
                <button
                    id='btn-do-testing-part-again'
                    type='submit'
                    className='btn btn-primary'
                    onClick={_doTestingPartAgain}
                >
                    Học lại
                </button>
                <button
                    id='btn-go-back-to-testing-part'
                    type='submit'
                    className='btn btn-primary'
                    onClick={goBack}
                >
                    Trở lại
                </button>
            </div>
        </div>
    )
}

function _CurrentVoca({
    currentVoca,
    currentVocaIndex,
    isRightAnswer,
    isNextQuestion,
    choices,
    generateChoices,
    vocabularies,
    selectChoice,
    isMeaningQuestion,
    setIsMeaningQuestion,
}: {
    currentVoca: EnglishVocabulary,
    currentVocaIndex: number,
    isRightAnswer: boolean,
    isNextQuestion: boolean,
    choices: RadioChoices,
    generateChoices: Function,
    vocabularies: EnglishVocabulary[],
    selectChoice: Function,
    isMeaningQuestion: boolean,
    setIsMeaningQuestion: Function,
}) {
    useEffect(() => {
        setIsMeaningQuestion(_.random(0, 1));
    }, [currentVoca]);

    function _generateChoices() {
        if (_.isNil(vocabularies)
            || _.isNil(currentVoca)
            || _.isNil(isMeaningQuestion))
            return;

        let shuffleVocabularies = _.shuffle(vocabularies.filter((voca: EnglishVocabulary) => voca?.vocabularyId !== currentVoca.vocabularyId));
        let wrongVocabularies = shuffleVocabularies.slice(0, 3);
        let wrongChoices = [];
        let rightChoice = '';
        let questionContent = '';

        if (isMeaningQuestion) {
            questionContent = currentVoca?.meaning;
            rightChoice = currentVoca?.vocabulary;
            wrongChoices = wrongVocabularies.map((voca: EnglishVocabulary) => voca.vocabulary);
        } else {
            questionContent = currentVoca.vocabulary;
            rightChoice = currentVoca.meaning;
            wrongChoices = wrongVocabularies.map((voca: EnglishVocabulary) => voca.meaning);
        }
        let choices = [rightChoice, ...wrongChoices].map((value: string, index: number) =>
            new Choice({ value, isRightAnswer: index === 0 })
        );

        generateChoices(questionContent, choices);
    }

    useEffect(() => {
        _generateChoices();
    }, [isMeaningQuestion]);

    useEffect(() => {
        if (_.isNil(isRightAnswer))
            return;

        if (isRightAnswer) {
            showRightAnswerAlert();
            hideWrongAnswerAlert();
        } else {
            hideRightAnswerAlert();
            showWrongAnswerAlert();
        }

        hideButtonConfirm();
        showButtonNext();
    }, [isRightAnswer]);

    function _selectChoice(choice: Choice) {
        if (_.isNil(choice))
            return;

        selectChoice(choice);
        if (isMeaningQuestion)
            speak(choice.value);
    }

    function speak(text: String) {
        let newText = replaceSpecialCharacters(replaceNumberCharacters(text));
        if (newText === '')
            return;

        speech.cancel();
        speech.speak({
            text: newText
        }).then(() => console.log('success'))
            .catch((error: Error) => console.error("An error occurred :", error));
    }

    if (_.isNil(currentVoca))
        return null;

    return (
        <div className='current-question'>
            <span onClick={() => {
                if (!isMeaningQuestion)
                    speak(choices.questionContent)
            }}>
                <b>Câu {currentVocaIndex + 1}: </b>
                <span>{choices?.questionContent}</span>
            </span>
            <Form>
                <Map
                    collection={choices.values}
                    iteratee={(choice: Choice, index: number) =>
                        <div
                            key={index}
                            className={`${displayAnswer(choice.value)} custom-control custom-radio custom-control-inline`}
                        >
                            <input
                                id={`answer-${index}`}
                                type='radio'
                                className='custom-control-input'
                                onChange={() => _selectChoice(choice)}
                                disabled={isNextQuestion}
                                name='radio'
                            />
                            <label
                                className='custom-control-label'
                                htmlFor={`answer-${index}`}
                            >
                                {choice.value}
                            </label>
                        </div>
                    }
                />
            </Form>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        vocabularies: state.englishVocaTest.vocabularies,
        currentVocaIndex: state.englishVocaTest.currentVocaIndex,
        choices: state.englishVocaTest.choices,
        currentVoca: state.englishVocaTest.currentVoca,
        isNextQuestion: state.englishVocaTest.isNextQuestion,
        isRightAnswer: state.englishVocaTest.isRightAnswer,
        isMeaningQuestion: state.englishVocaTest.isMeaningQuestion,
    }
}

const mapDispatchToProps = {
    shuffleQuestions,
    getQuestionByIndex,
    nextQuestion,
    resetWhenGoBack,
    generateChoices,
    selectChoice,
    confirmAnswer,
    doTestingPartAgain,
    setIsMeaningQuestion,
}

const CurrentVoca = connect(
    mapStateToProps,
    mapDispatchToProps
)(_CurrentVoca);
export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(EnglishVocaTest)
);