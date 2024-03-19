import { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { colors } from '../../utils/colors';

const CenteredMenu = () => {
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);
  const itemTitles = ['Sortuj po przedmiocie', 'Sortuj po roku'];

  const getItemStyle = (isActive: boolean) => {
    return {
      backgroundColor: isActive ? colors.darkblue : '',
      color: isActive ? colors.white : colors.darkblue,
      borderRadius: 0
    };
  };

  return (
    <Menu style={{ display: 'flex', justifyContent: 'center' }}>
      {itemTitles.map((title, index) => (
        <Menu.Item
          key={index}
          name={title}
          as="a"
          style={getItemStyle(index === activeItemIndex)}
          onClick={() => setActiveItemIndex(index)}
        />
      ))}
    </Menu>
  );
};

export default CenteredMenu;
