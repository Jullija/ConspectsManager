import { pathGenerator } from '../router/paths';
import CenteredMenu from './Menu';

const menuPaths = [
  pathGenerator.Login,
  pathGenerator.SubjectsList,
  pathGenerator.subject(1),
  pathGenerator.AddSubject,
  pathGenerator.Edition(1, 1),
  pathGenerator.AddEdition(1),
  pathGenerator.AccessRights(1, 1)
];

const Navbar = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100vw'
      }}>
      <CenteredMenu
        itemTitles={[
          'Login',
          'SubjectsList',
          'Subject',
          'Add subject',
          'Edition',
          'Add edition',
          'Access right panel'
        ]}
        paths={menuPaths}
        styles={{ width: '100vw' }}
      />
    </div>
  );
};

export default Navbar;
