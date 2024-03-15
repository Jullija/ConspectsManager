import "../App.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <a href="/login">
        <p>/login</p>
      </a>
      <a href="/courses-list">
        <p>/courses-list</p>
      </a>
      <a href="/course/1">
        <p>/course/1</p>
      </a>
      <a href="/add-course">
        <p>/add-course</p>
      </a>
      <a href="/edition/1/1">
        <p>/edition/1/1</p>
      </a>
      <a href="/add-edition/1">
        <p>/add-edition/1</p>
      </a>
      <a href="/access-rights-panel/1/1">
        <p>/access-rights-panel/1/1</p>
      </a>
    </div>
  );
};

export default Navbar;
