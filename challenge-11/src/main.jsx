import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Registro } from './components/registro.jsx'
import { Login } from './components/login.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Registro />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </Provider>
)