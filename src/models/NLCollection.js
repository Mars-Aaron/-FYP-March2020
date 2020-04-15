import Firebase from 'react-native-firebase';

export const Collections = {
  Profiles: 'profiles',
};

export default class NLCollection {
  ref = null;
  constructor(collection) {
    this._name = collection;
    this._db = Firebase.firestore();
  }

  getDocuments = callback => {
    this._db
      .collection(this._name)
      .get()
      .then(snapshot => {
        callback(snapshot.docs);
      });
  };

  addDocument = (key, data, callback) => {
    this._db
      .collection(this._name)
      .doc(key)
      .set(data)
      .then(callback);
  };

  /**
   * Fetch a document by using the document ID
   *
   * name: The ID of the document to fetch.
   * callback: snapshot => {}, action to perform after fetching the document successfully.
   */
  getDocument = (name, callback) => {
    let document = this._db.collection(this._name).doc(name);
    document.get().then(snapshot => callback(snapshot.data()));
  };

  singleValueComparisonQuery = (key, value, callback) => {
    this._db
      .collection(this._name)
      .where(key, '==', value)
      .get()
      .then(callback);
  };

  generateAutoId = () => {
    const CHARS =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let autoId = '';

    for (let i = 0; i < 20; i++) {
      autoId += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
    }
    return autoId;
  };
}
