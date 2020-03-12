import Firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';

const LOCAL_SESSION_KEY = '@NL_SESSION_UID';

export const EmailPasswordAuth = (email, password) => {
  return Firebase.auth().signInWithEmailAndPassword(email, password);
};

export const setLoggedInUser = async uid => {
  await AsyncStorage.setItem(LOCAL_SESSION_KEY, uid);
};

export const hasUserLoggedIn = async () => {
  let uid = await AsyncStorage.getItem(LOCAL_SESSION_KEY);
  console.log(uid);
  return uid != null;
};

export const getUser = async () => {
  let profile = null;
  let querySnapshot = await Firebase.firestore()
    .collection('profiles')
    .get();
  let uid = await AsyncStorage.getItem(LOCAL_SESSION_KEY);
  querySnapshot.docs.forEach(doc => {
    if (doc.id === uid) {
      profile = doc;
    }
  });
  return {user: Firebase.auth().currentUser, profile: profile};
};

export const CreateEmailPassword = (email, password) => {
  return Firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const Test = () => {
  Firebase.firestore()
    .collection('users')
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        console.log(doc.id);
      });
    });
};
