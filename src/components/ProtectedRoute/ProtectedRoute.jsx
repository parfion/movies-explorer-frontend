import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...props  }) => {
  
  return localStorage.getItem('token') ? <Component {...props} /> : <Navigate to="/" replace />
}
export default ProtectedRoute;