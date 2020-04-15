import NLCollection from './NLCollection';

export default class NLNote extends NLCollection {
  constructor(subCollection, documentId) {
    super('topics');
    this._documentId = documentId;
    this._subName = subCollection;
  }

  addDocument = (key, data, callback) => {
    this._db
      .collection(this._name)
      .doc(this._documentId)
      .collection(this._subName)
      .doc(key)
      .set(data)
      .then(callback);
  };

  getDocuments = callback => {
    this._db
      .collection(this._name)
      .doc(this._documentId)
      .collection(this._subName)
      .get()
      .then(snapshot => {
        callback(snapshot.docs);
      });
  };
}
