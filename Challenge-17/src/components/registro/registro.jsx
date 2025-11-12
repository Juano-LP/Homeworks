import { useDispatch } from "react-redux";
import { registerAuth } from "../../store/thunks/registerAuth";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from './Registro.module.scss';


export const Registro = () => {
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
    displayName: "",
  });

  const { email, password, displayName } = formState;

  const onInputChange = (evt) => {
    const { name, value } = evt.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(registerAuth(email, password, displayName));
  };

    return (
    <div className={styles.registro}>
      <h1>Registro</h1>
      <hr />
      <form onSubmit={onSubmit}>
        <input name="email" type="email" placeholder="Correo" onChange={onInputChange} value={email} />
        <input name="password" type="password" placeholder="Contraseña" onChange={onInputChange} value={password} />
        <input name="displayName" type="text" placeholder="Nombre completo" onChange={onInputChange} value={displayName} />
        <button type="submit">Registrarse</button>
      </form>
      <p>
        ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </div>
  );
};