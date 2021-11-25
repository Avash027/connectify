import {
  headerContainer,
  heading,
  iconSet,
  navItems,
  navItemsActive,
  navIcons,
  navImage,
} from "../styles/Header.module.css";
import Searchbar from "./Searchbar";
import { useRouter } from "next/router";

import { logoutUser } from "../actions/client/authUser";

const Header = ({ user }) => {
  const router = useRouter();

  const pathName = router.pathname;

  return (
    <div className={headerContainer}>
      <div className={heading} onClick={() => (window.location.href = "/")}>
        Connectify
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Searchbar header={true}></Searchbar>
      </div>
      <div className={iconSet}>
        <a href="/" className={pathName === "/" ? navItemsActive : navItems}>
          <div className={`fas fa-home ${navIcons}`}></div>
        </a>

        <a
          href="/explore"
          className={pathName === "/explore" ? navItemsActive : navItems}
        >
          <div className={`fas fa-compass ${navIcons}`}></div>
        </a>
        <a
          href="/notifications"
          className={pathName === "/notifications" ? navItemsActive : navItems}
        >
          <div
            style={{ color: user.unreadNotification ? "red" : "inherit" }}
            className={`fas fa-heart ${navIcons}`}
          ></div>{" "}
        </a>

        <a
          href={`/${user.username}`}
          className={pathName === `/[username]` ? navItemsActive : navItems}
        >
          <img src={user.profilePicUrl} className={navImage}></img>
        </a>

        {/* Change it later */}
        <div
          onClick={logoutUser}
          className={pathName === "/logout" ? navItemsActive : navItems}
        >
          <i className={`fas fa-sign-out-alt ${navIcons}`}></i>
        </div>
      </div>
    </div>
  );
};

export default Header;
