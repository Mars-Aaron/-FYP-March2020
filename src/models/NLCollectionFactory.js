// import {Collections} from './NLCollection';
import NLProfile from './NLProfile';
import NLTopic from './NLTopic';
import NLNote from './NLNote';

// export function CollectionNotFoundException(message) {
//   const error = new Error(message);
//   return error;
// }

// CollectionNotFoundException.prototype = Object.create(Error.prototype);

export class NLCollectionFactory {
  createProfileCollectionReference = () => {
    return new NLProfile();
  };

  createTopicCollectionReference = () => {
    return new NLTopic();
  };

  createNoteCollectionReference = topicId => {
    return new NLNote(topicId);
  };
}

const SingletonNLCollectionFactory = new NLCollectionFactory();
Object.freeze(SingletonNLCollectionFactory);

export default SingletonNLCollectionFactory;
