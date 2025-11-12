import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { loginWithEmailAndPassword } from "../../store/Thunks/loginAuth";
import { loginWithGoogle } from "../../store/Thunks/loginGoogle";
import { logoutAuth } from "../../store/Thunks/logoutAuth";
import { Link, useNavigate } from "react-router-dom";
import styles from "./login.module.scss";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <div className={styles.login}>
      {status === "authenticated" ? (
        <div className={styles.welcome}>
          <h1>Bienvenido, {displayName} 👋</h1>

          <button
            className={`${styles.chatBtn}`}
            onClick={() => navigate("/chat")}
          >
            Ir al Chat 💬
          </button>

          <button className={`${styles.logoutBtn}`} onClick={onLogout}>
            Cerrar sesión
          </button>
        </div>
      ) : (
        <>
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

          <button className={styles.googleBtn} onClick={onGoogleLogin}>
            Iniciar con Google
          </button>

          <p>
            ¿No tienes cuenta? <Link to="/">Regístrate</Link>
          </p>
        </>
      )}
    </div>
  );
};
