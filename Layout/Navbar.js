import { useState } from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import {
  homeIcon,
  navItems,
  navIcons,
  navItemsActive,
  navItemBar,
  navImage,
} from "../styles/Navbar.module.css";
import Searchbar from "./Searchbar";
import { useRouter } from "next/router";

import { logoutUser } from "../actions/client/authUser";

const Navbar = ({ user }) => {
  const router = useRouter();

  const [showNavbar, setShowNavbar] = useState(false);

  const handleOpen = () => setShowNavbar(true);
  const handleClose = () => setShowNavbar(false);

  const pathName = router.pathname;

  return (
    <>
      <i className={`fas fa-bars fa-2x ${homeIcon}`} onClick={handleOpen}></i>
      <Offcanvas show={showNavbar} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Connectify</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ padding: "0" }}>
          <Stack>
            <a
              href="/"
              className={pathName === "/" ? navItemsActive : navItems}
            >
              <div className={`fas fa-home ${navIcons}`}></div>
              Feed
            </a>

            <a
              href="/explore"
              className={pathName === "/explore" ? navItemsActive : navItems}
            >
              <div className={`fas fa-compass ${navIcons}`}></div> Explore
            </a>
            <a
              href="/notifications"
              className={
                pathName === "/notifications" ? navItemsActive : navItems
              }
            >
              <div
                style={{ color: user.unreadNotification ? "red" : "inherit" }}
                className={`fas fa-heart ${navIcons}`}
              ></div>{" "}
              Notifications
            </a>

            <a
              href={`/${user.username}`}
              className={pathName === `/[username]` ? navItemsActive : navItems}
            >
              <img src={user.profilePicUrl} className={navImage}></img> Profile
            </a>

            {/* Change it later */}
            <div
              onClick={logoutUser}
              className={pathName === "/logout" ? navItemsActive : navItems}
            >
              <i className={`fas fa-sign-out-alt ${navIcons}`}></i> logout
            </div>
            <div className={navItemBar}>
              <Searchbar router={router} />
            </div>
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

//TODO ADD spinner to login and singin modal

export default Navbar;
