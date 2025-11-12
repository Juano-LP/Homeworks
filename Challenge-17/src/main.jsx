import { createRoot } from "react-dom/client";
import "./styles/main.scss"; 
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Registro } from "./components/Registro.jsx";
import { Login } from "./components/Login.jsx";
import { Chat } from "./components/chat.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);