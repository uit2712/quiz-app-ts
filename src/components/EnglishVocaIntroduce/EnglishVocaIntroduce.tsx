import EnglishVocabulary from '../../models/EnglishVocabulary';
import QuizPart from '../../view-models/QuizPart';
import React, { useEffect } from 'react';
import Topic from '../../models/Topic';
import { connect } from 'react-redux';
import { getTopic, splitQuestionsIntoParts } from '../../actions/QuizIntroduceActions';
import { getVocabulariesByTopicId } from '../../actions/EnglishVocaIntroduceActions';
import { Link, withRouter } from 'react-router-dom';
import { Map } from 'react-lodash';
import './EnglishVocaIntroduce.css';

function EnglishVocaIntroduce({
    history: {
        location: {
            state: {
                topicId
            }
        }
    },
    getTopic,
    getVocabulariesByTopicId,
    vocabularies,
    topicVocabularies,
    numberVocabulariesPerAPart,
    splitQuestionsIntoParts,
    topic,
    topics,
}: {
    getTopic: Function,
    getVocabulariesByTopicId: Function,
    vocabularies: EnglishVocabulary[],
    topicVocabularies: EnglishVocabulary[],
    numberVocabulariesPerAPart: Number,
    splitQuestionsIntoParts: Function,
    topic: Topic,
    topics: Topic[],
    history: any,
}) {
    useEffect(() => {
        getTopic(topicId, topics);
        getVocabulariesByTopicId(
            topicId,
            vocabularies
        );
    }, []);

    useEffect(() => {
        splitQuestionsIntoParts(
            topicVocabularies,
            numberVocabulariesPerAPart
        );
    }, [topicVocabularies]);

    return (
        <div className='English-Voca-Introduce'>
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
    parts: QuizPart<EnglishVocabulary>[],
    topic: Topic
}) {
    return (
        <Map
            collection={parts}
            iteratee={(part: QuizPart<EnglishVocabulary>, index: number) =>
                <Link
                    key={index}
                    className="quiz-part btn btn-primary col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                    to={{
                        pathname: '/english-voca-test',
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
        vocabularies: state.api.englishVocabularies,
        topicVocabularies: state.englishVocaIntroduce.vocabularies,
        parts: state.englishVocaIntroduce.parts,
        numberVocabulariesPerAPart: state.api.numberVocabulariesPerAPart,
        topic: state.englishVocaIntroduce.topic,
        topics: state.api.englishVocaTopics
    }
}

const mapDispatchToProps = {
    getTopic,
    getVocabulariesByTopicId,
    splitQuestionsIntoParts,
}

const Part = withRouter(
    connect(mapStateToProps)(_Part)
);
export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(EnglishVocaIntroduce)
)