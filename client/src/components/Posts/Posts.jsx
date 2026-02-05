import React from "react";
import { useEffect, useState } from "react";
import { API_URL } from "../../config.js";


export default function Posts() {
  
  const [posts, setPosts] = useState([]);

  async function fetchposts() {
    try {
            const res = await fetch(`${API_URL}/api/posts`);
            if (!res.ok) {
                throw new Error(`Failed to fetch posts (${res.status})`);
            }
            const data = await res.json();
            setPosts(data);
            console.log("Posts with author names:", data);

        } catch (err) {
            console.error("Error fetching posts:", err);
        }
    }

    useEffect(() => {
        fetchposts();
    }, []);

  return (
    <div>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map(post => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>{post.created_at}</p>
            <p>Name: {post.author_name}</p>
          </div>
        ))
      )}
    </div>
  );
}
