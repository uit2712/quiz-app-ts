import _ from 'lodash';
import AnsweringAlerts from '../../shared-components/AnsweringAlerts';
import CheckBoxChoices from '../../view-models/CheckBoxChoices';
import Choice from '../../view-models/Choice';
import Question from '../../models/Question';
import React, { useEffect } from 'react';
import {
    confirmAnswer,
    deselectChoice,
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
    showButtonConfirm,
    showButtonDoTestingPartAgain,
    showButtonGoBackToTestingPart,
    showButtonNext,
    showRightAnswerAlert,
    showWrongAnswerAlert
    } from '../../shared-functions/SharedFunctions';
import { Map } from 'react-lodash';
import { withRouter } from 'react-router-dom';
import './QuizTest.css';

function QuizTest({
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
    currentQuestionIndex,
    resetWhenGoBack,
    currentQuestion,
    questions,
    doTestingPartAgain,
    choices,
    confirmAnswer,
    nextQuestion,
}: {
    history: any,
    shuffleQuestions: Function,
    getQuestionByIndex: Function,
    resetWhenGoBack: Function,
    doTestingPartAgain: Function,
    confirmAnswer: Function,
    nextQuestion: Function,
    currentQuestionIndex: number,
    currentQuestion: Question,
    questions: Question[],
    choices: CheckBoxChoices,
}) {
    useEffect(() => {
        shuffleQuestions(part?.questions);
        getQuestionByIndex(currentQuestionIndex);

        return () => resetWhenGoBack();
    }, []);

    useEffect(() => {
        getQuestionByIndex(currentQuestionIndex);
    }, [currentQuestionIndex]);

    useEffect(() => {
        if (isTestingPartDone()) {
            showButtonDoTestingPartAgain();
            showButtonGoBackToTestingPart();
            hideButtonConfirm();
            hideButtonNext();
        }
    }, [currentQuestion]);

    function isTestingPartDone() {
        return questions.length > 0
            && currentQuestionIndex >= questions.length;
    }

    function _doTestingPartAgain() {
        doTestingPartAgain();

        hideButtonDoTestingPartAgain();
        hideButtonGoBackToTestingPart();
        showButtonConfirm();
    }

    function confirm() {
        confirmAnswer(checkIfRightAnswers());
        showRightAnswers();
    }

    function showRightAnswers() {
        choices.values.forEach((choice: Choice, index: number) => {
            let checkBoxElement = document.getElementById(`answer-${index}`) as HTMLInputElement;
            let labelForCheckBoxElement = document.querySelector(`label[for='answer-${index}']`);

            if (_.isNil(checkBoxElement)
                || _.isNil(labelForCheckBoxElement))
                return;

            if (choice.isRightAnswer) {
                checkBoxElement.classList.add('right-answer');
                labelForCheckBoxElement.classList.add('right-answer');
            } else {
                if (checkBoxElement.checked) {
                    checkBoxElement.classList.add('wrong-answer');
                    labelForCheckBoxElement.classList.add('wrong-answer');
                }
            }
        });
    }

    function resetAllCheckboxes() {
        currentQuestion.answers.forEach((answer: String, index: Number) => {
            let checkBoxElement = document.getElementById(`answer-${index}`) as HTMLInputElement;
            let labelForCheckBoxElement = document.querySelector(`label[for='answer-${index}']`)
            if (_.isNil(checkBoxElement) || _.isNil(labelForCheckBoxElement))
                return;

            checkBoxElement.checked = false;
            if (checkBoxElement.classList.contains('wrong-answer')) {
                checkBoxElement.classList.remove('wrong-answer');
                labelForCheckBoxElement.classList.remove('wrong-answer');
            }
            if (checkBoxElement.classList.contains('right-answer')) {
                checkBoxElement.classList.remove('right-answer');
                labelForCheckBoxElement.classList.remove('right-answer');
            }
        });
    }

    function checkIfRightAnswers() {
        for (let i = 0; i < choices.selectedChoices.length; i++) {
            let choice: Choice = choices.selectedChoices[i];
            if (!choice.isRightAnswer)
                return false;
        }

        let allSelectedChoicesAreRight
            = _.some(choices.selectedChoices,
                (choice: Choice) => choice.isRightAnswer
            );

        if (!allSelectedChoicesAreRight)
            return false;

        let notSelectedChoices = _.difference(choices.values, choices.selectedChoices);
        let allNotSelectedChoicesAreWrong
            = _.some(notSelectedChoices,
                (choice: Choice) => !choice.isRightAnswer
            );

        return allNotSelectedChoicesAreWrong;
    }

    function next() {
        resetAllCheckboxes();
        hideWrongAnswerAlert();
        hideRightAnswerAlert();
        showButtonConfirm();
        hideButtonNext();
        nextQuestion();
    }

    return (
        <div className='Quiz-Test'>
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
                <CurrentQuestion />
                <button
                    id='btn-confirm-answer'
                    type='submit'
                    className='btn btn-primary'
                    onClick={confirm}
                    disabled={choices.selectedChoices.length === 0}
                >
                    Chọn
                </button>
                <button
                    id='btn-next-question'
                    type='submit'
                    className='btn btn-primary'
                    onClick={next}
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

function _CurrentQuestion({
    currentQuestion,
    selectChoice,
    deselectChoice,
    currentQuestionIndex,
    isRightAnswer,
    isNextQuestion,
    choices,
    generateChoices,
}: {
    selectChoice: Function,
    deselectChoice: Function,
    generateChoices: Function,
    currentQuestion: Question,
    currentQuestionIndex: number,
    isRightAnswer: boolean,
    isNextQuestion: boolean,
    choices: CheckBoxChoices,
}) {
    function _generateChoices() {
        if (_.isNil(currentQuestion))
            return;

        let questionContent = currentQuestion.questionContent;
        let choices = currentQuestion.answers.map((value: string, index: number) =>
            new Choice({
                value,
                isRightAnswer: currentQuestion.rightAnswers.includes(`${index + 1}`)
            })
        );

        generateChoices(questionContent, choices);
    }

    useEffect(() => {
        _generateChoices();
    }, [currentQuestion]);

    function selectCheckBox(e: React.ChangeEvent<HTMLInputElement>, choice: Choice) {
        if (_.isNull(choice))
            return;

        let checked = e.target.checked;
        if (checked)
            selectChoice(choice);
        else deselectChoice(choice);
    }

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

    if (_.isNil(currentQuestion))
        return null;

    return (
        <div className='current-question'>
            <span><b>Câu {currentQuestionIndex + 1}:</b> {currentQuestion.questionContent}</span>
            <Map
                collection={choices.values}
                iteratee={(choice: Choice, index: number) =>
                    <div
                        key={index}
                        className={`${displayAnswer(choice.value)} custom-control custom-checkbox`}
                    >
                        <input
                            id={`answer-${index}`}
                            type='checkbox'
                            className='custom-control-input'
                            onChange={(e) => selectCheckBox(e, choice)}
                            disabled={isNextQuestion}
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
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        currentQuestionIndex: state.quizTest.currentQuestionIndex,
        selectedAnswers: state.quizTest.selectedAnswers,
        questions: state.quizTest.questions,
        currentQuestion: state.quizTest.currentQuestion,
        isRightAnswer: state.quizTest.isRightAnswer,
        isNextQuestion: state.quizTest.isNextQuestion,
        choices: state.quizTest.choices,
    }
}

const mapDispatchToProps = {
    shuffleQuestions,
    getQuestionByIndex,
    deselectChoice,
    selectChoice,
    confirmAnswer,
    nextQuestion,
    resetWhenGoBack,
    generateChoices,
    doTestingPartAgain,
};

const CurrentQuestion = connect(
    mapStateToProps,
    mapDispatchToProps
)(_CurrentQuestion);
export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(QuizTest)
);