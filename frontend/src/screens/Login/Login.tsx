import { useNavigate } from 'react-router-dom';
import { pathGenerator } from '../../router/paths';
import { Button, Dropdown, DropdownProps } from 'semantic-ui-react'
import { titleFontSize } from '../../utils/sizes';
import { colors } from '../../utils/colors';
import React, { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import app from '../../firebase/firebase-config';
import { axiosClient } from '../../api/axiosClient';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { user, login, logout, authenticated } = useAuth(); 

  const signInWithGoogle = () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            // Get the user's ID token as it is needed to authenticate with the backend.
            result.user.getIdToken().then((idToken) => {
                // Use Axios to send the ID token to your backend
                axiosClient.post('/google-login/', {
                    token: idToken,
                })
                .then((response) => {
                    localStorage.setItem("token", response.data.token);
                    axiosClient.defaults.headers.common['Authorization'] = `Token ${response.data.token}`;
                    const userName = result.user.displayName || result.user.email || 'Unknown User';
                    login(userName); 
                })
                .catch((error) => {
                    console.error("Error posting the ID token to backend:", error);
                });
            });
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error signing in with Google", errorMessage);
        });
  };
  const handleLogout = () => {
    axiosClient.defaults.headers.common['Authorization'] = ``;
    logout();
  };
  

  return (
    <div style={{ color: colors.blue, fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1 style={{ fontSize: '24px', textAlign: 'center', margin: '20px 0' }}>Login</h1>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#FFFFFF'
      }}>
        {/* Conditional rendering for Google sign-in/logout button */}
        {!authenticated ? (
          <Button color='violet' onClick={signInWithGoogle} style={{ margin: '10px 0' }}>
            Sign in with Google
          </Button>
        ) : (
          <>
          <div style={{ margin: '10px 0', fontSize: '16px' }}>
            Logged as {user} {/* Display the logged-in username */}
          </div>
          <Button color='violet' onClick={handleLogout} style={{ margin: '10px 0' }}>
            Logout
          </Button>
        </>
        )}
      </div>
    </div>
  );
};

export default Login;
