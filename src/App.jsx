import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import PostDetails from "./pages/PostDetails";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import Author from "./pages/Author";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/users/:id" element={<Author />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;