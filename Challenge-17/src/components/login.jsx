import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { loginWithEmailAndPassword } from "../store/thunks/loginAuth";
import { loginWithGoogle } from "../store/thunks/loginGoogle";
import { logoutAuth } from "../store/thunks/logoutAuth";
import { Link, useNavigate } from "react-router-dom"; // ✅ useNavigate agregado
import "../styles/_login.scss";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ hook para cambiar de ruta

  const { status, displayName } = useSelector((state) => state.auth);

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formState;

  const onInputChange = (evt) => {
    const { name, value } = evt.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(loginWithEmailAndPassword(email, password));
  };

  const onGoogleLogin = () => {
    dispatch(loginWithGoogle());
  };

  const onLogout = () => {
    dispatch(logoutAuth());
  };

  return (
    <>
      {status === "authenticated" ? (
        <div className="login-container">
          <h1>Bienvenido, {displayName} 👋</h1>

          <button onClick={() => navigate("/chat")} className="chat-btn">
            Ir al Chat 💬
          </button>

          <button onClick={onLogout} className="logout-btn">
            Cerrar sesión
          </button>
        </div>
      ) : (
        <div className="login-container">
          <h1>Iniciar sesión</h1>
          <hr />
          <form onSubmit={onLoginSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Correo"
              value={email}
              onChange={onInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={password}
              onChange={onInputChange}
            />
            <button type="submit">Entrar</button>
          </form>

          <button onClick={onGoogleLogin} className="google-btn">
            Iniciar con Google
          </button>

          <p>
            ¿No tienes cuenta?{" "}
            <Link to="/">Regístrate</Link>
          </p>
        </div>
      )}
    </>
  );
};