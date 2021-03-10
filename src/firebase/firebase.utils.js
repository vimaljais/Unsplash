import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAO4TbNBO7Yl046sKRV5qJqHTrFr87RWhE",
  authDomain: "unsplash-df328.firebaseapp.com",
  projectId: "unsplash-df328",
  storageBucket: "unsplash-df328.appspot.com",
  messagingSenderId: "77663077478",
  appId: "1:77663077478:web:17d06bf4ec9b5177d3d9a7",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => {
  console.log("dadadadssss");
  auth.signInWithPopup(provider);
};

export default firebase;
