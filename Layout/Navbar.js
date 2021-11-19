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
        <Offcanvas.Body style={{ padding: "0", backgroundColor: "#171717" }}>
          <Stack>
            <div className={pathName === "/" ? navItemsActive : navItems}>
              <div className={`fab fa-facebook-messenger ${navIcons}`}></div>
              Messages
            </div>
            <div
              className={pathName === "/explore" ? navItemsActive : navItems}
            >
              <div className={`fas fa-compass ${navIcons}`}></div> Explore
            </div>
            <div
              className={
                pathName === "/notifications" ? navItemsActive : navItems
              }
            >
              <div className={`fas fa-heart ${navIcons}`}></div> Notifications
            </div>

            <a
              href={`/${user.username}`}
              className={pathName === "/profile" ? navItemsActive : navItems}
            >
              <div className={`fas fa-heart ${navIcons}`}></div> Profile
            </a>

            <div className={pathName === "/logout" ? navItemsActive : navItems}>
              <i className={`fas fa-sign-out-alt ${navIcons}`}></i> logout
            </div>
            <div className={navItemBar}>
              <Searchbar />
            </div>
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Navbar;
