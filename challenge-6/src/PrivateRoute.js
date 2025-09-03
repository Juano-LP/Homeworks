import { useContext } from "react";
import { MyContext } from "./Context.js";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const { user } = useContext(MyContext);
  return user ? <Outlet /> : <Navigate to="/" replace />;
}