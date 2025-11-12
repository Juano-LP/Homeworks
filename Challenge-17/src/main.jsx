import { createRoot } from "react-dom/client";
import "./styles/main.scss"; 
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Registro } from "./components/registro/registro.jsx";
import { Login } from "./components/login/login.jsx";
import { Chat } from "./components/chat/chat.jsx";

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