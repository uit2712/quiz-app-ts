export default class Topic {
    topicId: number;
    topicName: string;
    topicDescription: string;
    parentTopicId?: number | null;
    isEnglishVocaTopic: boolean;

    constructor({
        topicId,
        topicName,
        topicDescription,
        parentTopicId,
        isEnglishVocaTopic
    }: {
        topicId: number,
        topicName: string,
        topicDescription: string,
        parentTopicId?: number | null,
        isEnglishVocaTopic: boolean
    }) {
        this.topicId = topicId;
        this.topicName = topicName;
        this.topicDescription = topicDescription;
        this.parentTopicId = parentTopicId;
        this.isEnglishVocaTopic = isEnglishVocaTopic;
    }
}