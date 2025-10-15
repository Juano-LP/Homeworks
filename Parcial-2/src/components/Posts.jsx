import React from "react";
import { useSelector } from "react-redux";
import NewPost from "./NewPost";

export default function Posts() {
  const posts = useSelector((s) => s.posts.posts);

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h2>📰 Lista de Posts</h2>
      <NewPost />

      <div style={{ marginTop: 20 }}>
        {posts.length === 0 ? (
          <p>No hay publicaciones aún.</p>
        ) : (
          posts.map((p, i) => (
            <div
              key={i}
              style={{
                border: "1px solid #ccc",
                padding: 10,
                borderRadius: 8,
                marginBottom: 10,
              }}
            >
              <strong>{p.author}</strong>
              <p>{p.content}</p>
              <small>{new Date(p.createdAt).toLocaleString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
