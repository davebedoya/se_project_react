// ProtectedRoute.jsx
// import { useContext } from "react";
// import AppContext from "../../contexts/AppContext";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children, isLoggedIn }) {
  const location = useLocation();
  // const from = location.state?.from || "/";
  // const { isLoggedIn } = useContext(AppContext);
  // todo: you context has no any default state (but must be at least object, otherwise object.field fails)

  // if (anonymous && isLoggedIn) {
  //   return <Navigate to={from} />;
  // }

  // if (!anonymous && !isLoggedIn) {
  //   return <Navigate to="/login" state={{ from: location }} />;
  // }

  if (!isLoggedIn) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
