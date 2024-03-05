import "./assets/style/navbar.scss";
import logo from "./assets/images/Logo.png";
import darkLogo from "./assets/images/LogoDark.png";

import { useState, useEffect, useRef } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MenuIcon from "@mui/icons-material/Menu";
import ClearIcon from "@mui/icons-material/Clear";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [openMobileNavbar, setOpenMobileNavbar] = useState(false);
  const sections = useRef([]);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    let newActiveSection = null;

    sections.current.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionOffsetTop = section.offsetTop - sectionHeight / 2;

      if (
        scrollY >= sectionOffsetTop &&
        scrollY < sectionOffsetTop + sectionHeight
      ) {
        newActiveSection = section.id;
      }
    });

    setActiveSection(newActiveSection);
  };

  useEffect(() => {
    sections.current = document.querySelectorAll("[data-section]");
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const activeStyle = {
    textDecoration: "underline var(--gold)",
  };

  const mobileActiveStyle = {
    textDecoration: "underline var(--dark-blue)",
  };

  const navbarList = [
    {
      title: "Experience",
      section: "experience",
    },
    {
      title: "Let's play!",
      section: "snake",
    },
    {
      title: "Contact",
      section: "contact",
    },
  ];

  const DefaultList = () =>
    navbarList.map((item) => (
      <li
        key={item.section}
        onClick={() =>
          document.getElementById(item.section).scrollIntoView(true)
        }
        id={`nav-button-${item.section}`}
        style={activeSection === item.section ? activeStyle : {}}
      >
        {item.title}
      </li>
    ));

  const MobileList = () =>
    navbarList.map((item) => (
      <li
        key={item.section}
        onClick={() => {
          document.getElementById(item.section).scrollIntoView(true);
          setOpenMobileNavbar(false);
        }}
        id={`nav-button-${item.section}`}
        style={activeSection === item.section ? mobileActiveStyle : {}}
      >
        {item.title}
      </li>
    ));

  return (
    <>
      <nav className="default-navbar">
        <span className="logo">
          <img
            onClick={() => document.getElementById("home").scrollIntoView(true)}
            src={logo}
            alt="Logo"
            width={40}
            height={40}
          />
        </span>
        <ul>
          <DefaultList />
        </ul>
      </nav>

      <nav className="mobile-navbar">
        <span className="logo">
          <img
            onClick={() =>
              !openMobileNavbar &&
              document.getElementById("home").scrollIntoView(true)
            }
            src={openMobileNavbar ? darkLogo : logo}
            alt="Logo"
            width={40}
            height={40}
          />
        </span>
        {!openMobileNavbar ? (
          <MenuIcon onClick={() => setOpenMobileNavbar(true)} />
        ) : (
          <ClearIcon
            className="clear-icon"
            onClick={() => setOpenMobileNavbar(false)}
          />
        )}
      </nav>

      {openMobileNavbar && (
        <span className="modal-navbar">
          <ul>
            <li
              onClick={() => {
                document.getElementById("home").scrollIntoView(true);
                setOpenMobileNavbar(false);
              }}
              id={`nav-button-home`}
              style={activeSection === "home" ? mobileActiveStyle : {}}
            >
              My name is...
            </li>
            <MobileList />
          </ul>
        </span>
      )}

      {(activeSection === "experience" || activeSection === "contact") && (
        <span className="arrow-mobile-up">
          <KeyboardArrowUpIcon />
        </span>
      )}

      {(activeSection === "home" || activeSection === "experience") && (
        <span className="arrow-mobile-down">
          <KeyboardArrowDownIcon />
        </span>
      )}
    </>
  );
};

export default Navbar;
