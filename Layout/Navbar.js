import { useState } from "react";
import {
  Offcanvas,
  Button,
  Stack,
  Grid,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import {
  homeIcon,
  navItems,
  navIcons,
  navItemsActive,
  navItemBar,
} from "../styles/Navbar.module.css";
import Searchbar from "./Searchbar";
import { useRouter } from "next/router";

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
          <Offcanvas.Title>Instagram</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ padding: "0" }}>
          <Stack>
            <a
              href="/messages"
              className={pathName === "/" ? navItemsActive : navItems}
            >
              <div className={`fab fa-facebook-messenger ${navIcons}`}></div>
              Messages
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
              <div className={`fas fa-heart ${navIcons}`}></div> Notifications
            </a>

            <a
              href={`/${user.username}`}
              className={pathName === `/[username]` ? navItemsActive : navItems}
            >
              <div className={`fas fa-heart ${navIcons}`}></div> Profile
            </a>
            {/* Change it later */}
            <a
              href={`/logout`}
              className={pathName === "/logout" ? navItemsActive : navItems}
            >
              <i className={`fas fa-sign-out-alt ${navIcons}`}></i> logout
            </a>
            <div className={navItemBar}>
              <Searchbar router={router} />
            </div>
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Navbar;
