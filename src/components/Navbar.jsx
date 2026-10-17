import { Link } from "react-router";

function Navbar() {
  return (
    <nav>
      <h2>Blogify</h2>
      <Link to="/">Home</Link> | <Link to="/posts">Posts</Link>
      <hr />
    </nav>
  );
}

export default Navbar;