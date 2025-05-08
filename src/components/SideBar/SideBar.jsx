import "./SideBar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import avatar from "../../assets/avatar.png";

function SideBar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Default Avatar" />
      <p className="sidebar__username">Terrence Tegegne</p>
    </div>
  );
}

export default SideBar;
