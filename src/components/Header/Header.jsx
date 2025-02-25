import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Header({ onCreateModal, city }) {
  const [currentDate, setCurrentDate] = useState("");

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
      <button
        onClick={onCreateModal}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>

      <Link to="/profile" className="header__link">
        <div className="header__user-container">
          <p className="header__username">Terrence Tegegne</p>
          <img
            src={avatar}
            alt="Terrence Tegenene"
            className="header__avatar"
          />
        </div>
      </Link>
    </header>
  );
}

export default Header;
