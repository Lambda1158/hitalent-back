import { types } from "../types";
import { firebase, googleAuthProvider, facebookAuthProvider } from "../firebase/firebase-config";

export const login = (uid, displayName) => ({
  type: types.LOGIN,
  payload: { uid, displayName },
});

export const logout = () => ({
  type: types.LOGOUT,
});

export const startGoogleAuth = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const startGoogleLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();
    dispatch(logout());
  };
};

export const startFacebookAuth = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(facebookAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const startFacebookLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();
    dispatch(logout());
  };
};
