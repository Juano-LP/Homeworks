import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { enqueueMessage } from "../store/slices/dmQueueSlice";

export default function NewDM() {
  const [to, setTo] = useState("");
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!to.trim() || !text.trim()) return;

    dispatch(
      enqueueMessage({
        to: to.trim(),
        text: text.trim(),
        createdAt: Date.now(),
      })
    );

    setTo("");
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
      <h3>✉️ Enviar mensaje directo</h3>
      <input
        value={to}
        onChange={(e) => setTo(e.target.value)}
        placeholder="Destinatario"
        required
      />
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Mensaje"
        required
      />
      <button type="submit">Agregar a la cola</button>
    </form>
  );
}
