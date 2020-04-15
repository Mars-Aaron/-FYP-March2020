import NLSubCollection from './NLSubCollection';

export default class NLNote extends NLSubCollection {
  static Fields = {
    Title: 'title',
    NoteType: 'type',
  };

  static NoteTypes = {
    Header: 'header',
  };

  constructor(topicId) {
    super('notes', topicId);
  }

  AddNote = (data, callback) => {
    // topicData[NLTopic.Fields.CreatedOn] = new Date();
    this.addDocument(this.generateAutoId(), data, callback);
  };

  GetAllNotes = callback => {
    this.getDocuments(callback);
  };
}
