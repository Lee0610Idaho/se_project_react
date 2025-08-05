import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({ onCreateModal, city, openRegisterModal, openLoginModal }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isLoggedIn = currentUser && currentUser.name;

  const [currentDate, setCurrentDate] = useState("");

  const getInitial = (name) => {
    if (name) {
      return name[0].toUpperCase();
    }
    return "?";
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

      <ToggleSwitch />
      {isLoggedIn ? (
        <div className="header__user-container">
          <button
            onClick={onCreateModal}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
          <Link to="/profile" className="header__link">
            <p className="header__username">{currentUser.name}</p>
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt="Profile avatar"
                className="header__avatar"
              />
            ) : (
              <div className="header__placeholder">
                {getInitial(currentUser.name)}
              </div>
            )}
          </Link>
        </div>
      ) : (
        <div className="header__guest-nav">
          <button
            onClick={openRegisterModal}
            type="button"
            className="header__signup"
          >
            Sign Up
          </button>
          <button
            type="button"
            className="header__signin"
            onClick={openLoginModal}
          >
            Log In
          </button>
        </div>
      )}
    </header>
  );
}
export default Header;
