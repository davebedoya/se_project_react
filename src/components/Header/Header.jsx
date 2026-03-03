import "./Header.css";
import logo from "../../assets/logo.svg";
// import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";

import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  onRegisterClick,
  onLoginClick,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);
  const userName = currentUser?.name || "";
  const userAvatar = currentUser?.avatar || "";
  const userInitial = (userName.trim()[0] || "?").toUpperCase();

  return (
    <div className="header">
      <NavLink to="/">
        <img className="header__logo" alt="WTWR logo" src={logo} />
      </NavLink>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      {isLoggedIn && (
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
      )}
      {isLoggedIn ? (
        <NavLink className="header__nav-link" to="/profile">
          <div className="header__user-container">
            <p className="header__username">{userName}</p>
            {userAvatar ? (
              <img src={userAvatar} alt={userName} className="header__avatar" />
            ) : (
              <div className="header__avatar-placeholder">{userInitial}</div>
            )}
          </div>
        </NavLink>
      ) : (
        <div className="header__user-container">
          <button
            type="button"
            className="header__auth-btn"
            onClick={onRegisterClick}
          >
            Sign Up
          </button>
          <button
            type="button"
            className="header__auth-btn"
            onClick={onLoginClick}
          >
            Log In
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
