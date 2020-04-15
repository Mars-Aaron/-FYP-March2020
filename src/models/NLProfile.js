import NLCollection from './NLCollection';
import {getLoggedInUserID as getLoggedInUserId} from './NLAuthentication';

export default class NLProfile extends NLCollection {
  static Fields = {
    FamilyName: 'FamilyName',
    GivenName: 'GivenName',
    UserType: 'UserType',
    Username: 'Username',
  };

  constructor() {
    super('profiles');
  }

  GetProfile = callback => {
    getLoggedInUserId().then(uid => {
      this.getDocument(uid, callback);
    });
  };

  CreateProfile = (uid, profile, callback) => {
    profile[NLProfile.Fields.Username] = `@${
      profile[NLProfile.Fields.Username]
    }`.toLowerCase();
    this.addDocument(uid, profile, callback);
  };

  IsUniqueUsername = (username, callback) => {
    // check if username is taken
    this.singleValueComparisonQuery(
      NLProfile.Fields.Username,
      username,
      snapshot => callback(snapshot.empty),
    );
  };
}
