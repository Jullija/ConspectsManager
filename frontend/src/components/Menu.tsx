import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { colors } from '../utils/colors'

interface CenteredMenuProps {
  itemTitles: string[];
  paths?: string[];
  styles?: React.CSSProperties;
}

const CenteredMenu: React.FC<CenteredMenuProps> = ({ itemTitles, paths=[], styles={}}) => {
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);
  const navigate = useNavigate();

  const getItemStyle = (isActive: boolean) => {
    return {
      backgroundColor: isActive ? colors.darkblue : '',
      color: isActive ? colors.white : colors.darkblue,
      borderRadius: 0,
    };
  };

  return (
    <Menu style={{ display: 'flex', justifyContent: 'center', borderRadius: "5px", ...styles}}>
      {itemTitles.map((title, index) => (
        <Menu.Item
          key={index}
          name={title}
          as="a"
          style={{ ...getItemStyle(index === activeItemIndex), flexGrow: 1, borderRadius: "5px" }}
          onClick={() => {
            setActiveItemIndex(index);
            navigate(paths[index]); 
          }}
         
        />
      ))}
    </Menu>
  );
};

export default CenteredMenu;
