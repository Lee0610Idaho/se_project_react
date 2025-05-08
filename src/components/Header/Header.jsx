import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Header({
  onCreateModal,
  openRegisterModal,
  openLoginModal,
  city,
  isLoggedIn,
  currentUser,
}) {
  const [currentDate, setCurrentDate] = useState("");

  //Variable to store initial of username for filler avatar photo
  const initial = currentUser.name
    ? Array.from(currentUser.name)[0].toUpperCase()
    : "";

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    window.location.replace("/signin");
  };

  useEffect(() => {
    const getCurrentDate = () => {
      const date = new Date();
      const options = {
        month: "long",
        day: "numeric",
      };

      return date.toLocaleDateString(undefined, options);
    };

    setCurrentDate(getCurrentDate());
  }, []);

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" alt="header logo" src={logo} />
      </Link>

      <p className="header__date-and-location">
        {currentDate}, {city}
      </p>
      <div className="header__navigation">
        <ToggleSwitch />
        {isLoggedIn ? (
          <div className="header__navigation">
            <button
              className="header__button"
              type="text"
              onClick={handleLogOut}
            >
              Log Out
            </button>
            <button
              className="header__button"
              type="text"
              onClick={onCreateModal}
            >
              + Add Clothes
            </button>
            <Link to="/profile">{currentUser.name}</Link>
            <div>
              {currentUser.avatar ? (
                <img
                  className="header__avatar-logo"
                  src={currentUser.avatar}
                  alt="avatar"
                />
              ) : (
                <div className="header__avatar-logo">{initial}</div>
              )}
            </div>
          </div>
        ) : (
          <div className="header__navigation">
            <button
              className="header__button"
              type="text"
              onClick={openRegisterModal}
            >
              Sign Up
            </button>
            <button
              className="header__button"
              type="text"
              onClick={openLoginModal}
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
