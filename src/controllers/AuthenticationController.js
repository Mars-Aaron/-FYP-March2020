import {
  EmailPasswordAuth,
  CreateEmailPassword,
  setLoggedInUser,
  Logout as AuthLogout,
} from '../models/NLAuthentication';

export const LoginFailureReasons = {
  EmailOrPasswordIncorrect: 'EPI',
  EmailNotVerified: 'ENV',
  AccountDeactivated: 'AD',
};

export const Logout = callback => {
  AuthLogout(callback);
};

export const Login = (email, password, callback) => {
  EmailPasswordAuth(email, password)
    .then(credential => {
      if (credential && credential.user.emailVerified) {
        setLoggedInUser(credential.user.uid).then(() => {
          callback(true, null);
        });
      } else {
        Logout(() => {
          callback(false, LoginFailureReasons.EmailNotVerified);
        });
      }
    })
    .catch(() => {
      callback(false, LoginFailureReasons.EmailOrPasswordIncorrect);
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
