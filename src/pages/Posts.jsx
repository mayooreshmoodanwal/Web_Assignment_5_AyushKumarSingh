import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import SearchBar from "../components/SearchBar";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        return response.json();
      })
      .then((data) => setPosts(data))
      .catch(() => setError("Could not load posts"))
      .finally(() => setLoading(false));
  }, []);

  const filteredPosts = posts.filter((post) =>
  post.title.toLowerCase().includes(search.toLowerCase())
);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>All Posts</h1>
      <SearchBar search={search} setSearch={setSearch} />
      <div className="posts-grid">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
    </div>
    </div>
  );
}

export default Posts;