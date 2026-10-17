import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
   
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentsError, setCommentsError] = useState("");

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Post not found");
        }
        return response.json();
      })
      .then((data) => {
        if (!data.id) throw new Error("Post not found");
        setPost(data);
      })
      .catch(() => setError("Could not load post"))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
  setCommentsLoading(true);
  setCommentsError("");

  fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      return response.json();
    })
    .then((data) => setComments(data))
    .catch(() => setCommentsError("Could not load comments"))
    .finally(() => setCommentsLoading(false));
}, [id]);

  if (loading) return <p>Loading post...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <button onClick={() => navigate("/posts")}>Back to Posts</button>
      <h1>{post.title}</h1>
      <p>
  <Link to={`/users/${post.userId}`}>
    View Author Profile
  </Link>
</p>
      <p>{post.body}</p>
      <h2>Comments</h2>

{commentsLoading && <p>Loading comments...</p>}
{commentsError && <p>{commentsError}</p>}

{!commentsLoading && !commentsError && comments.map((comment) => (
  <div key={comment.id}>
    <h3>{comment.name}</h3>
    <p>{comment.email}</p>
    <p>{comment.body}</p>
    <hr />
  </div>
))}
    </div>
  );
}

export default PostDetails;