import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../store/slices/postsSlice";
import { addNotification } from "../store/slices/notificationsSlice";

export default function NewPost() {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newPost = {
      author: user?.displayName || user?.email || "Anónimo",
      content: content.trim(),
      createdAt: Date.now(),
    };

    dispatch(addPost(newPost));


    dispatch(
      addNotification({
        message: `Nuevo post de ${user?.displayName || user?.email || "Anónimo"}`,
        createdAt: Date.now(),
      })
    );

    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
      <h3>Crear nuevo post</h3>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="¿Qué estás pensando?"
        required
        style={{ width: "100%", height: 60 }}
      />
      <button type="submit">Publicar</button>
    </form>
  );
}
