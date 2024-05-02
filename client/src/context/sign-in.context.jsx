import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { loginUserService } from '../../src/services';
import { Link, useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const initialState = {
  dataLogin: {},
  isLoading: false,
  isLoggedIn: false,
  error: null,
};

const loginReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, isLoading: true, error: null };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        dataLogin: action.dataLogin,
      };
    case 'LOGIN_ERROR':
      return { ...state, isLoading: false, error: action.error };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authState, dispatch] = useReducer(loginReducer, initialState);

  const handleLogin = async (email, password) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
      const data = await loginUserService({ email, password });

      const token = data.token;
      if (token) {
        navigate('/user-content');
        localStorage.setItem('token', token);
      }

      dispatch({ type: 'LOGIN_SUCCESS', dataLogin: data });
    } catch (error) {
      if (error.message.includes("This user doesn't have an account")) {
        console.error("User doesn't have an account");
        dispatch({ type: 'LOGIN_ERROR', error: error.message });
      } else {
        dispatch({ type: 'LOGIN_ERROR', error: error.message });
        console.error('An error occurred:', error.message);
      }
    }
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('token');
    navigate('/sign-in');
  };
  return (
    <AuthContext.Provider
      value={{ authState, dispatch, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
