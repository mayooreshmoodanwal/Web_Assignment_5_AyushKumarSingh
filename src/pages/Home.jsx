import { Link } from "react-router";

function Home() {
  return (
    <main>
      <h1>Welcome to Blogify</h1>
      <p>Discover stories, explore ideas, and read discussions.</p>
      <Link to="/posts">Read Posts</Link>
    </main>
  );
}

export default Home;