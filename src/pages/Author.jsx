import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";

function Author() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);

    Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`),
      fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
    ])
      .then(async ([userResponse, postsResponse]) => {
        if (!userResponse.ok || !postsResponse.ok) {
          throw new Error("Failed to load author");
        }

        const userData = await userResponse.json();
        const postsData = await postsResponse.json();

        if (!userData.id) {
          throw new Error("Author not found");
        }

        setUser(userData);
        setPosts(postsData);
      })
      .catch(() => setError("Could not load author"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading author...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Company: {user.company.name}</p>

      <h2>Posts by {user.name}</h2>

      {posts.map((post) => (
        <div key={post.id}>
          <Link to={`/posts/${post.id}`}>
            {post.title}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Author;