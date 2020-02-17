import _ from 'lodash';
import React, { useEffect } from 'react';
import Topic from '../../models/Topic';
import { connect } from 'react-redux';
import { fetchTopics, fetchVocabularies } from '../../actions/ApiActions';
import { getEnglishParentTopics, getNotEnglishParentTopics, getParentTopics } from '../../actions/HomeActions';
import { Link, withRouter } from 'react-router-dom';
import { Map } from 'react-lodash';
import './Home.css';

function Home({
    topics,
    getEnglishParentTopics,
    getNotEnglishParentTopics,
    englishParentTopics,
    notEnglishParentTopics,
    getParentTopics,
    parentTopics,
    fetchTopics,
    fetchVocabularies
}: {
    fetchTopics: Function,
    getEnglishParentTopics: Function,
    getNotEnglishParentTopics: Function,
    getParentTopics: Function,
    fetchVocabularies: Function,
    topics: Topic[],
    englishParentTopics: Topic[],
    notEnglishParentTopics: Topic[],
    parentTopics: Topic[],
}) {
    useEffect(() => {
        fetchTopics();
        fetchVocabularies();
    }, []);

    useEffect(() => {
        getParentTopics(topics);
    }, [topics]);

    useEffect(() => {
        getEnglishParentTopics();
        getNotEnglishParentTopics();
    }, [parentTopics]);

    return (
        <div className='Home'>
            <ul className='list-group'>
                <li className='list-group-item list-group-item-primary'>Chủ đề</li>
                <Map
                    collection={englishParentTopics}
                    iteratee={(topic: Topic, key: number) =>
                        <ParentTopics
                            key={key}
                            topic={topic}
                            introducingPageLink={'/english-voca-introduce'}
                        />
                    }
                />
                <Map
                    collection={notEnglishParentTopics}
                    iteratee={(topic: Topic, key: number) =>
                        <ParentTopics
                            key={key}
                            topic={topic}
                            introducingPageLink={'/quiz-introduce'}
                        />
                    }
                />
            </ul>
        </div>
    )
}

function getChildTopics(parentTopicId: Number, topics: Topic[] = []): Topic[] {
    const childTopics = topics.filter((topic: Topic) => topic.parentTopicId === parentTopicId);
    return childTopics;
}

function hasChildTopics(parentTopicId: Number, topics: Topic[] = []): boolean {
    return getChildTopics(parentTopicId, topics).length > 0;
}

function _ParentTopics({
    topic,
    topics,
    introducingPageLink
}: {
    topic: Topic,
    topics: Topic[],
    introducingPageLink: string,
}) {
    return (
        <>
            <li
                className='list-group-item list-group-item-action'
                onClick={() => showChildTopicsList(topic.topicId)}>
                {topic.topicName}
                <IconDoQuiz
                    topicId={topic.topicId}
                    hide={hasChildTopics(topic.topicId, topics)}
                    introducingPageLink={introducingPageLink}
                />
            </li>
            <ChildTopics
                parentTopicId={topic.topicId}
                topics={topics}
                introducingPageLink={introducingPageLink}
            />
        </>)
}

function ChildTopics({
    topics,
    parentTopicId,
    introducingPageLink
}: {
    topics: Topic[],
    parentTopicId: number,
    introducingPageLink: string,
}) {
    return (
        <ul id={`child-topics-${parentTopicId}`}>
            <Map
                collection={getChildTopics(parentTopicId, topics)}
                iteratee={(childTopic: Topic, key: number) =>
                    <div key={key}>
                        <li
                            className='list-group-item list-group-item-action'
                            onClick={() => showChildTopicsList(childTopic.topicId)}>
                            {childTopic.topicName}
                            <IconDoQuiz
                                topicId={childTopic.topicId}
                                hide={hasChildTopics(childTopic.topicId, topics)}
                                introducingPageLink={introducingPageLink}
                            />
                        </li>
                        {
                            hasChildTopics(childTopic.topicId, topics)
                            && <ChildTopics
                                    topics={topics}
                                    parentTopicId={childTopic.topicId}
                                    introducingPageLink={introducingPageLink}
                                />
                        }
                    </div>
                }
            />
        </ul>
    )
}

function IconDoQuiz({
    topicId,
    hide,
    introducingPageLink
}: {
    topicId: number,
    hide: boolean,
    introducingPageLink: string,
}) {
    if (hide || _.isNil(introducingPageLink))
        return null;

    return (<Link
            to={{
                pathname: introducingPageLink,
                state: {
                    topicId
                }
            }}>
            <i className='fa fa-book'></i>
        </Link>
    )
}

function showChildTopicsList(topicId: Number) {
    let childTopicsList = document.getElementById(`child-topics-${topicId}`);
    if (childTopicsList) {
        let childTopicsListDisplay = childTopicsList.style.display;
        if (!childTopicsListDisplay
            || childTopicsListDisplay === 'none') {
            childTopicsList.style.display = 'block';
        } else {
            childTopicsList.style.display = 'none';
        }
    }
}

const mapStateToProps = (state: any) => {
    return {
        topics: state.api.topics,
        parentTopics: state.home.parentTopics,
        englishParentTopics: state.home.englishParentTopics,
        notEnglishParentTopics: state.home.notEnglishParentTopics,
    }
}

const mapDispatchToProps = {
    fetchTopics,
    getEnglishParentTopics,
    getNotEnglishParentTopics,
    getParentTopics,
    fetchVocabularies,
}

const ParentTopics = connect(mapStateToProps)(_ParentTopics);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));