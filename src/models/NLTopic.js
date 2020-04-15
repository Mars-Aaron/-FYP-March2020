import NLCollection from './NLCollection';
import {getLoggedInUserID as getLoggedInUserId} from './NLAuthentication';

export default class NLTopic extends NLCollection {
  static Fields = {
    TopicName: 'name',
    theme: 'theme',
    Tags: 'tags',
    CreatedOn: 'createdOn',
  };

  constructor() {
    super('topics');
  }

  CreateTopic = (topicData, callback) => {
    topicData[NLTopic.Fields.CreatedOn] = new Date();
    this.addDocument(this.generateAutoId(), topicData, callback);
  };

  GetAllTopics = callback => {
    this.getDocuments(callback);
  };
}
