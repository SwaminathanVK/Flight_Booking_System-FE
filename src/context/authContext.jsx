import React, { createContext, useEffect, useReducer } from "react";


// Hardcoded admin credentials (for demonstration only, not secure)
const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "admin123";

const initialState = {
  user:
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  token: localStorage.getItem("token") || null,
  isAdmin: localStorage.getItem("isAdmin") || "true",
  isUserLoggedIn: !!localStorage.getItem("token"),
};

export const authContext = createContext(initialState);

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        token: null,
        isAdmin: false,
        isUserLoggedIn: false,
      };

    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        token: action.payload.token,
        isAdmin: action.payload.isAdmin || false,
        isUserLoggedIn: true,
      };

    case "LOGOUT":
      return {
        user: null,
        token: null,
        isAdmin: false,
        isUserLoggedIn: false,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("token", state.token);
    localStorage.setItem("isAdmin", state.isAdmin.toString());
    localStorage.setItem("isUserLoggedIn", state.isUserLoggedIn.toString());
  }, [state]);

  return (
    <authContext.Provider
      value={{
        user: state.user,
        token: state.token,
        isAdmin: state.isAdmin,
        isUserLoggedIn: state.isUserLoggedIn,
        dispatch,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
