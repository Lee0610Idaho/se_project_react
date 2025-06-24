import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, children, ...props }) => {
  return (
    <Route {...props}>
      {isLoggedIn ? children : <Navigate to="/signin" />}
    </Route>
  );
};

export default ProtectedRoute;
