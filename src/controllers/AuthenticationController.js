import {EmailPasswordAuth, CreateEmailPassword} from '../models/NLFirebase';

export const Login = (email, password, callback) => {
  EmailPasswordAuth(email, password)
    .then(credential => {
      if (credential) {
        callback(true);
        console.log('default app user ->', credential.user.toJSON());
      }
    })
    .catch(() => {
      callback(false);
    });
};

export const Register = (
  email,
  password,
  givenName,
  familyName,
  displayName,
  userName,
  photoURL,
  callback,
) => {
  CreateEmailPassword(email, password)
    .then(credential => {
      if (credential) {
        credential.user
          .updateProfile({
            displayName: displayName,
            photoURL: photoURL,
          })
          .then(() => {
            callback(true);
          })
          .catch(() => {
            callback(false);
          });
      }
    })
    .catch(() => {
      callback(false);
    });
};
