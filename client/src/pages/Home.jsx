// src/pages/Home.jsx
import React from "react";
import Posts from "../components/Posts/Posts.jsx";
import CreatePost from "../components/Posts/CreatePost.jsx";

export default function Home() {
  return (
    <div>
      <CreatePost />
      <Posts />
    </div>
  );
}
