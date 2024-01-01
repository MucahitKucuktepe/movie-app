import React, { createContext, useContext } from "react";
import { auth } from "../auth/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
export const AuthContext = createContext();
export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const createUser = async (email, password,displayName) => {
    try {
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(userCredential)
        console.log(displayName)
    } catch (error) {
        console.log(error)
    }
  };
  const values={
    createUser
  }
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
