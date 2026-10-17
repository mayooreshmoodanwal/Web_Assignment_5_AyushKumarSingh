import { Link } from "react-router";

function PostCard({ post }) {
  return (
    <article className="post-card">
      <h3>{post.title}</h3>
      <p>{post.body.slice(0, 80)}...</p>
      <Link to={`/posts/${post.id}`}>Read more</Link>
    </article>
  );
}

export default PostCard;