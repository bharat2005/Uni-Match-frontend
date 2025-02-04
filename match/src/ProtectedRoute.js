import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

export default function ProtectedRoute(props) {
  const { bool } = useContext(AuthContext);


  if (bool) {
    return props.children;
  }


  return <Navigate to="/" />;
}

