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

  if (anonymous && isLoggedIn) {
    console.log("correct user");
    return <Navigate to={from} />;
  }
  if (!anonymous && !isLoggedIn) {
    console.log("incorrect user");
    return <Navigate to="/" state={{ from: location }} />;
  }
  return children;
}
