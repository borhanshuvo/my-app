import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';

export const initializeLoginFramework = () =>{
    // firebase.initializeApp(firebaseConfig);
    if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    }
    else {
        firebase.app();
    }
} 


export  const handelGoogleSignIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth().signInWithPopup(googleProvider)
      .then(res => {
        const { displayName, email, photoURL } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
          success: true
        }
        return signedInUser;
      })
      .catch(err => {

      })
  }
export const handelGithubSignIn = () => {
    const githubProvider = new firebase.auth.GithubAuthProvider();
    return firebase.auth().signInWithPopup(githubProvider)
    .then((result) => {
      const credential = result.credential;
      const token = credential.accessToken;
      const user = result.user;
      user.success = true;
      return user;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  }

  export const handelFacebookSignIn = () => {
    console.log("Facebook");
  }

export const handelSignOut = () => {
    return firebase.auth().signOut()
    .then(res => {
    const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
    }
    return signedOutUser;
    })
    .catch(err => {

    })
  }

export const createUserWithEmailAndPassword = (name, email, password) =>{
    return firebase.auth().createUserWithEmailAndPassword(name, email, password)
    .then(res => {
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        updateUserName(name);
        return newUserInfo;
    })
    .catch(error => {
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
    });
}

export const signInWithEmailAndPassword = (email, password) =>{
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        return newUserInfo;
    })
    .catch((error) => {
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
    });
}

export const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    })
      .then(function () {
        console.log('Successfully');
      })
      .catch(function (error) {
        console.log(error);
      });
  }