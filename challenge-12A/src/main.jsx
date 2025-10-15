import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/login.jsx";
import { Registro } from "./components/Registro.jsx";
import { Crud } from "./components/firebaseCrud.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/crud" element={<Crud />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);