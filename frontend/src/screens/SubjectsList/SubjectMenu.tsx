import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { pathGenerator } from '../../router/paths';
import { colors } from '../../utils/colors';

export type MenuItemType = {
  key: string;
  name: string;
};

type CenteredMenuProps = {
  items: MenuItemType[];
};

const CenteredMenu: React.FC<CenteredMenuProps> = ({ items }) => {
  const [activeItem, setActiveItem] = useState<string>('');

  return (
    <Menu style={{ display: 'flex', justifyContent: 'center' }}>
      {items.map((item) => (
        <Menu.Item
          key={item.key}
          name={item.name}
          as={item.key === 'addSubject' ? Link : 'a'}
          to={item.key === 'addSubject' ? pathGenerator.AddSubject : undefined}
          style={
            item.key === activeItem
              ? { backgroundColor: colors.darkblue, color: colors.white }
              : { color: colors.darkblue }
          }
          onClick={() => setActiveItem(item.key)}
          //style={{border: "1px solid " + colors.grey}}
        />
      ))}
    </Menu>
  );
};

export default CenteredMenu;
