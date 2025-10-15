import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginWithEmailAndPassword } from "../store/thunks/loginAuth";
import { loginWithGoogle } from "../store/thunks/loginGoogle";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email: userEmail, displayName } = useSelector((state) => state.auth);

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formState;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") return alert("Completa todos los campos");

    try {
      await dispatch(loginWithEmailAndPassword(email, password));
      alert("Inicio de sesión exitoso");
      navigate("/crud");
    } catch (error) {
      alert("Error al iniciar sesión ❌");
      console.error(error);
    }
  };


  const handleGoogleLogin = async () => {
    try {
      await dispatch(loginWithGoogle());
      alert("Inicio de sesión con Google exitoso");
      navigate("/crud");
    } catch (error) {
      alert("Error con Google Login ❌");
      console.error(error);
    }
  };

  const goToRegister = () => {
    navigate("/"); 
  };

  return (
    <div style={{ width: "320px", margin: "40px auto", textAlign: "center" }}>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Correo"
          value={email}
          onChange={onInputChange}
          style={{ display: "block", width: "95%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={onInputChange}
          style={{ display: "block", width: "95%", marginBottom: "10px", padding: "8px" }}
        />
        <button
          type="submit"
          style={{
            width: "95%",
            padding: "8px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Iniciar sesión
        </button>
      </form>

      <hr style={{ margin: "20px 0" }} />

      <button
        onClick={handleGoogleLogin}
        style={{
          width: "100%",
          padding: "8px",
          backgroundColor: "#DB4437",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Iniciar sesión con Google
      </button>

      {userEmail && (
        <div style={{ marginTop: "25px" }}>
          <h3>Bienvenido {displayName || userEmail}</h3>
          <button
            onClick={() => navigate("/crud")}
            style={{
              marginTop: "10px",
              width: "100%",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              padding: "8px",
              cursor: "pointer",
            }}
          >
            Ir al CRUD
          </button>
        </div>
      )}

      <p style={{ marginTop: "25px" }}>
        ¿No tienes una cuenta?{" "}
        <button
          onClick={goToRegister}
          style={{
            background: "none",
            border: "none",
            color: "#007BFF",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Regístrate aquí
        </button>
      </p>
    </div>
  );
};