import "./SideBar.css";
// import avatar from "../../assets/avatar.png";

import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function SideBar({ onEditProfile, onLogout }) {
  // const username = "Terrence Tegegne";
  const currentUser = useContext(CurrentUserContext);
  const userName = currentUser?.name || "";
  const userAvatar = currentUser?.avatar || "";
  return (
    <aside>
      <div className="sidebar__profile">
        <p className="sidebar__username">{userName}</p>
        <img src={userAvatar} alt="user avatar" className="sidebar__avatar" />
      </div>
      <div className="sidebar__buttons">
        <button
          className="sidebar__button sidebar__button_edit-profile-btn"
          type="button"
          onClick={onEditProfile}
        >
          Change profile data
        </button>
        <button
          className="sidebar__button sidebar__button_logout-btn"
          type="button"
          onClick={onLogout}
        >
          Log out
        </button>
      </div>
    </aside>
  );
}
