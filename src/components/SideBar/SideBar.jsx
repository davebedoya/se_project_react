import "./SideBar.css";
import avatar from "../../assets/avatar.png";

export default function SideBar() {
  const username = "Terrence Tegegne";

  return (
    <aside>
      <div className="sidebar__profile">
        <p className="sidebar__username">{username}</p>
        <img src={avatar} alt="Terrence Tegegne" className="sidebar__avatar" />
      </div>
    </aside>
  );
}
