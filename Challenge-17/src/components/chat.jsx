import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listenMessages, sendMessage } from "../store/Thunks/chatThunk";
import { logoutAuth } from "../store/thunks/logoutAuth";
import "../styles/_chat.scss";

export const Chat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { messages } = useSelector((state) => state.chat);
  const { displayName, email } = useSelector((state) => state.auth);

  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    dispatch(listenMessages());
  }, [dispatch]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const user = displayName || email;
    dispatch(sendMessage(text, user));
    setText("");
  };

  const handleLogout = () => {
    dispatch(logoutAuth());
    navigate("/login");
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>💬 Chat Realtime</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>

      <div className="messages-box">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${
              msg.user === (displayName || email) ? "own" : "other"
            }`}
          >
            <small>{msg.user}</small>
            <p>{msg.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};
