import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../auth/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helpers/ToastNotify";
export const AuthContext = createContext();
export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);
  useEffect(() => {
    userObserver();
  }, []);

  const navigate = useNavigate();
  const createUser = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      console.log(userCredential);
      navigate("/");
      toastSuccessNotify("Registered Succesfuly");
    } catch (error) {
      console.log(error);
      toastErrorNotify(error.message);
    }
  };
  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      toastSuccessNotify("Logged in Succesfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toastErrorNotify(error.message);
    }
  };
  const userObserver = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, displayName, photoUrl } = user;
        setCurrentUser({ email, displayName, photoUrl });
      } else {
        setCurrentUser(false);
      }
    });
  };
  const logOut = () => {
    signOut(auth);
    toastSuccessNotify("Logged Out Succesfully!");
  };

  const signUpWithGoogle = () => {
       //* => Authentication => sign-in-method => enable Google
    //! Google ile girişi enable yap
    //! projeyi deploy ettikten sonra google sign in çalışması için domain listesine deploy linkini ekle
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        navigate("/");
        toastSuccessNotify("Logged in succesfuly");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signUpProviderGithub = () => {
    //* => Authentication => sign-in-method => enable Github
    //! Github ile girişi enable yap
 
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        navigate("/");
        toastSuccessNotify("Logged in succesfuly");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const values = {
    createUser,
    signIn,
    currentUser,
    logOut,
    signUpWithGoogle,
    signUpProviderGithub,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
