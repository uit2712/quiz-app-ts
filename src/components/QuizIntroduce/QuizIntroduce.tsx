import Question from '../../models/Question';
import QuizPart from '../../view-models/QuizPart';
import React, { useEffect } from 'react';
import Topic from '../../models/Topic';
import { connect } from 'react-redux';
import { getQuestionsByTopicId, getTopic, splitQuestionsIntoParts } from '../../actions/QuizIntroduceActions';
import { Link, withRouter } from 'react-router-dom';
import { Map } from 'react-lodash';
import './QuizIntroduce.css';

function QuizIntroduce({
    history: {
        location: {
            state: {
                topicId
            }
        }
    },
    getTopic,
    getQuestionsByTopicId,
    splitQuestionsIntoParts,
    topics,
    questions,
    topicQuestions,
    numberQuestionsPerAPart,
    topic
}: {
    history: any,
    getTopic: Function,
    getQuestionsByTopicId: Function,
    splitQuestionsIntoParts: Function,
    topics: Topic[],
    questions: Question[],
    topicQuestions: Question[],
    numberQuestionsPerAPart: number,
    topic: Topic,
}) {
    useEffect(() => {
        getTopic(topicId, topics);
        getQuestionsByTopicId(
            topicId,
            questions
        );
    }, []);

    useEffect(() => {
        splitQuestionsIntoParts(
            topicQuestions,
            numberQuestionsPerAPart
        );
    }, [topicQuestions]);

    return (
        <div className='Quiz-Introduce'>
            <div className='card-header'>{topic?.topicName}</div>
            <div className='card-body col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                <span className='topic-description col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>{topic?.topicDescription}</span>
                <Part />
            </div>
        </div>
    )
}

function _Part({
    parts,
    topic
}: {
    parts: QuizPart<Question>[],
    topic: Topic,
}) {
    return (
        <Map
            collection={parts}
            iteratee={(part: QuizPart<Question>, index: number) =>
                <Link
                    key={index}
                    className="quiz-part btn btn-primary col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                    to={{
                        pathname: '/quiz-test',
                        state: {
                            topic,
                            part
                        }
                    }}
                >
                    {part.quizPartName}
                </Link>
            }
        />
    )
}

const mapStateToProps = (state: any) => {
    return {
        topics: state.api.topics,
        topic: state.quizIntroduce.topic,
        numberQuestionsPerAPart: state.api.numberQuestionsPerAPart,
        questions: state.api.questions,
        topicQuestions: state.quizIntroduce.questions,
        parts: state.quizIntroduce.parts
    }
}

const mapDispatchToProps = {
    getTopic,
    getQuestionsByTopicId,
    splitQuestionsIntoParts
}

const Part = withRouter(
    connect(mapStateToProps)(_Part)
);
export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(QuizIntroduce)
);