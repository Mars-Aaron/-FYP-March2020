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
  return await AsyncStorage.getItem(LOCAL_SESSION_KEY);
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
