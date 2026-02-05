import React from "react";
import { useState } from "react";
import { API_URL } from "../../config.js";
import { useAuth } from "../../auth/AuthProvider.jsx";

export default function CreatePost() {
    const { isAuthed, me } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        setLoading(true);
        
        fetch(`${API_URL}/api/posts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: e.target.title.value,
                content: e.target.content.value,
                author_id: me?.user?.id
            }),
        })
        .then(res => {
            if (!res.ok) throw new Error("Failed to create post");
            return res.json();
        })
        .then(() => {
            setSuccess(true);
            e.target.reset();
        })
        .catch(err => {
            setError(err.message);
        })
        .finally(() => {
            setLoading(false);
        });
    }

    if (!isAuthed) {
        return <p>Please log in to create a post.</p>;
    }

  return (
    <form onSubmit={handleSubmit}>
        <div>
            <input type="text" name="title" id="title" placeholder="Title" required />
        </div>
        <div>
            <input type="text" name="content" id="content" placeholder="Content" required />
        </div>
        <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Post"}
        </button>
        {error && <p>{error}</p>}
        {success && <p>Post created successfully!</p>}
    </form>
  );
}
