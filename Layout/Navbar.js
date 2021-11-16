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

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleOpen = () => setShowNavbar(true);
  const handleClose = () => setShowNavbar(false);

  return (
    <>
      <i className={`fas fa-bars fa-2x ${homeIcon}`} onClick={handleOpen}></i>
      <Offcanvas show={showNavbar} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Instagram</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ padding: "0", backgroundColor: "#171717" }}>
          <Stack>
            <div className={navItemsActive}>
              <i className={`fab fa-facebook-messenger ${navIcons}`}></i>
              Messages
            </div>
            <div className={navItems}>
              <i className={`fas fa-compass ${navIcons}`}></i> Explore
            </div>
            <div className={navItems}>
              <i className={`fas fa-heart ${navIcons}`}></i> Notifications
            </div>

            <div className={navItems}>
              <i className={`fas fa-heart ${navIcons}`}></i> Profile
            </div>

            <div className={navItems}>
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
