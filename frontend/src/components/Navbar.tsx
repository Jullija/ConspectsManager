import '../App.css';
import { pathGenerator } from '../router/paths';

const Navbar = () => {
  return (
    <div className="navbar">
      <a href={pathGenerator.Login}>
        <p>/login</p>
      </a>
      <a href={pathGenerator.SubjectsList}>
        <p>/subjects-list</p>
      </a>
      <a href={pathGenerator.subject(1)}>
        <p>/subject/1</p>
      </a>
      <a href={pathGenerator.AddSubject}>
        <p>/add-subject</p>
      </a>
      <a href={pathGenerator.Edition(1, 1)}>
        <p>/edition/1/1</p>
      </a>
      <a href={pathGenerator.AddEdition(1)}>
        <p>/add-edition/1</p>
      </a>
      <a href={pathGenerator.AccessRights(1, 1)}>
        <p>/access-rights-panel/1/1</p>
      </a>
    </div>
  );
};

export default Navbar;
