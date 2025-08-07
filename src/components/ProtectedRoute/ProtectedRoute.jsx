import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({
  children,
  anonymous = false,
  isLoggedIn,
  isLoggedInLoading,
}) {
  const location = useLocation();
  console.log(location);
  const from = location.state?.from || "/";

  //Proceed
  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  //Send Back to Main
  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return children;
}
