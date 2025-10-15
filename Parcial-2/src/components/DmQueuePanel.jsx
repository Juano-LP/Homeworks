import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { dequeueMessage } from "../store/slices/dmQueueSlice";
import NewDM from "./NewDM";

export default function DMQueuePanel() {
  const queue = useSelector((s) => s.dmQueue.queue);
  const dispatch = useDispatch();

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h2>Cola de mensajes directos</h2>
      <NewDM />
      {queue.length === 0 ? (
        <p>No hay mensajes pendientes.</p>
      ) : (
        queue.map((msg, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: 10,
              marginTop: 10,
            }}
          >
            <p>
              <strong>Para:</strong> {msg.to}
            </p>
            <p>{msg.text}</p>
            <small>{new Date(msg.createdAt).toLocaleString()}</small>
            <br />
            <button onClick={() => dispatch(dequeueMessage())}>
              Enviar 
            </button>
          </div>
        ))
      )}
    </div>
  );
}


