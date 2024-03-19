import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { pathGenerator } from '../../router/paths';
import './styles/SubjectMenuStyle.css'; // Make sure the path to your CSS file is correct

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
    <Menu style={{ display: 'flex', justifyContent: 'center'}}>
      {items.map((item) => (
        <Menu.Item
          key={item.key}
          name={item.name}
          as={item.key === 'addSubject' ? Link : 'a'}
          to={item.key === 'addSubject' ? pathGenerator.AddSubject : undefined}
          className={item.key === activeItem ? 'custom-menu-item-active' : 'custom-menu-item'}
          onClick={() => setActiveItem(item.key)}
        />
      ))}
    </Menu>
  );
};

export default CenteredMenu;
