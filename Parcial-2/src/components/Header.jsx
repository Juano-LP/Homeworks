import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAuth } from "../store/thunks/logoutAuth";

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);
  const notifCount = useSelector((s) => s.notifications.stack.length);
  const dmCount = useSelector((s) => s.dmQueue.queue.length);

  const handleLogout = () => {
    dispatch(logoutAuth());
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 20px",
        backgroundColor: "#f5f5f5",
        borderBottom: "1px solid #ddd",
      }}
    >
      <nav style={{ display: "flex", gap: "20px" }}>
        <Link to="/">🏠 Posts</Link>
        <Link to="/notifications">🔔 Notificaciones ({notifCount})</Link>
        <Link to="/dm-queue">📨 Mensajes ({dmCount})</Link>
      </nav>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {user ? (
          <>
            <span>
              👤 {user.displayName || user.email}
            </span>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link to="/login">Iniciar sesión</Link>
            <Link to="/register">Registrarse</Link>
          </>
        )}
      </div>
    </header>
  );
}

