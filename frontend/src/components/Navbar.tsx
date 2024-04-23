import { pathGenerator } from '../router/paths';
import CenteredMenu from './Menu';

const menuPaths = [pathGenerator.Login, pathGenerator.SubjectsList, pathGenerator.TemplatesList];

const Navbar = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100vw'
      }}>
      <CenteredMenu
        itemTitles={['Login', 'Przedmioty', 'Templatki']}
        paths={menuPaths}
        styles={{ width: '100vw' }}
      />
    </div>
  );
};

export default Navbar;
