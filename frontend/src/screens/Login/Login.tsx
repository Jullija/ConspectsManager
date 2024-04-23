import { useNavigate } from 'react-router-dom';
import { pathGenerator } from '../../router/paths';
import { Button, Dropdown, DropdownProps } from 'semantic-ui-react'
import { titleFontSize } from '../../utils/sizes';
import { colors } from '../../utils/colors';
import { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import app from '../../firebase/firebase-config';
import { axiosClient } from '../../api/axiosClient';
import axios from 'axios';


const Login = () => {




  const navigate = useNavigate();
  const [loginOptions, setLoginOptions] = useState([
    { key: "1", text: "Michael Scott", value: "Michael Scott" },
    { key: "2", text: "Prison Mike", value: "Prison Mike" }
  ]);
  const [selectedUser, setSelectedUser] = useState('');
  const [showSelectUserMessage, setShowSelectUserMessage] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);


  const handleDropdownChange = (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
    setSelectedUser(data.value as string);
    setShowSelectUserMessage(false);
  };
  
  const handleClick = () => {
    if (selectedUser) {
      navigate(pathGenerator.SubjectsList);
    } else {
      setShowSelectUserMessage(true); 
    }
  };

  const handleAddition = (
    event: React.SyntheticEvent<HTMLElement>,
    data: DropdownProps 
  ) => {
    const newValue = data.value as string; 
    setLoginOptions(prevOptions => [
      ...prevOptions,
      { key: newValue, text: newValue, value: newValue },
    ]);
  };

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
                    axiosClient.defaults.headers.common['Authorization'] = `Token ${response.data.token}`;
                    // Handle response or navigate as needed
                    navigate(pathGenerator.SubjectsList); // Example navigation
                })
                .catch((error) => {
                    console.error("Error posting the ID token to backend:", error);
                });
            });
            setAuthenticated(true);
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error signing in with Google", errorMessage);
        });
  };
  const handleLogout = () => {
    axiosClient.defaults.headers.common['Authorization'] = ``;
    setAuthenticated(false);
  };
  

  return (
    <div style={{ color: colors.darkblue }}>
      <div style={{ fontSize: titleFontSize, margin: '24px 20px' }}>Login</div>
        <div style={{ margin: '0 20px 24px 20px' }}>
          <Dropdown style={{ width: 400, color: colors.darkblue}}
            placeholder='Select User'
            fluid
            search
            selection
            allowAdditions
            hideAdditions
            onAddItem={handleAddition}
            onChange={handleDropdownChange} 
            options={loginOptions}
            value={selectedUser} 
          />
        </div>
        
        {showSelectUserMessage && <p style={{ color: colors.orange, position: 'absolute', margin: '0 20px',}}>Please select a user to proceed.</p>}
      <div style={{ display: 'flex', flexDirection: 'row', margin: '0 345px' }}>
      
        <Button onClick={handleClick} style={{backgroundColor: colors.darkblue, color: colors.white }}>Login</Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 20px' }}>
        {/* Existing login button and other components */}

        {/* Google sign-in button */}
        {(<Button onClick={signInWithGoogle} style={{ backgroundColor: '#5541A9', color: colors.white, marginTop: '10px' }}>
          Sign in with Google
        </Button>)}
        {/* {authenticated && (<Button onClick={handleLogout} style={{ backgroundColor: '#5541A9', color: colors.white, marginTop: '10px' }}>
          Logout
        </Button>)} */}
        

        {showSelectUserMessage && <p style={{ color: colors.orange, position: 'relative', marginTop: '10px'}}>Please select a user to proceed.</p>}
      </div>
    </div>
  );
};

export default Login;
