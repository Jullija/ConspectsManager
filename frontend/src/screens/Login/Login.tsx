import { useNavigate } from 'react-router-dom';
import { pathGenerator } from '../../router/paths';
import { Button, Dropdown, DropdownProps } from 'semantic-ui-react'
import { titleFontSize } from '../../utils/sizes';
import { colors } from '../../utils/colors';
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const [loginOptions, setLoginOptions] = useState([
    { key: "1", text: "Michael Scott", value: "Michael Scott" },
    { key: "2", text: "Prison Mike", value: "Prison Mike" }
  ]);
  
  const handleClick = () => {
    navigate(pathGenerator.SubjectsList);
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

  return (
    <>
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
            options={loginOptions}
          />
        </div>
      
      <div style={{ display: 'flex', flexDirection: 'row', margin: '0 345px' }}>
        <Button onClick={handleClick} style={{backgroundColor: colors.darkblue, color: colors.white }}>Login</Button>
      </div>
    </div>
    </>
  );
};

export default Login;
