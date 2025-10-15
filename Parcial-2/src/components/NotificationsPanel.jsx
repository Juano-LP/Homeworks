import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { popNotification, clearNotifications } from "../store/slices/notificationsSlice";

export default function NotificationsPanel() {
  const stack = useSelector((s) => s.notifications.stack);
  const dispatch = useDispatch();

  const handlePop = () => dispatch(popNotification());
  const handleClear = () => dispatch(clearNotifications());

  return (
    <div>
      <h2>Notificaciones (pila)</h2>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button onClick={handlePop} disabled={stack.length === 0}>
          Pop (consumir top)
        </button>
        <button onClick={handleClear}>Vaciar</button>
      </div>

      {stack.length === 0 ? (
        <p>No hay notificaciones.</p>
      ) : (
        <div>
          {stack
            .slice()
            .reverse()
            .map((n, idx) => (
              <div
                key={n.id || idx} 
                style={{
                  border: "1px solid #eee",
                  borderRadius: 6,
                  padding: 10,
                  marginBottom: 8,
                  background: "#fafafa",
                }}
              >
                <div style={{ fontSize: 12, color: "#666" }}>
                  {n.createdAt
                    ? new Date(n.createdAt).toLocaleString()
                    : "Sin fecha"}
                </div>
                <div>{n.message || "Notificación sin mensaje"}</div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
