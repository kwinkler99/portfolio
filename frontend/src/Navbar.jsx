import "./assets/style/navbar.scss";
import logo from "./assets/images/Logo.png";
import darkLogo from "./assets/images/LogoDark.png";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MenuIcon from "@mui/icons-material/Menu";
import ClearIcon from "@mui/icons-material/Clear";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [openMobileNavbar, setOpenMobileNavbar] = useState(false);
  const sections = useRef([]);

  const variants = {
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at calc(100% - 44.5px) 44.5px)`,
      transition: {
        type: "spring",
        stiffness: 10,
        restDelta: 2,
      },
    }),
    closed: {
      clipPath: "circle(0 at calc(100% - 44.5px) 44.5px)",
      transition: {
        delay: 0.2,
        type: "spring",
        stiffness: 400,
        damping: 70,
      },
    },
  };

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
            onClick={() => document.getElementById("home").scrollIntoView(true)}
            src={logo}
            alt="Logo"
            width={40}
            height={40}
          />
        </span>
        <MenuIcon onClick={() => setOpenMobileNavbar(true)} />
      </nav>

      <motion.div
        className="modal-navbar"
        animate={openMobileNavbar ? "open" : "closed"}
        variants={variants}
      >
        <nav className="mobile-navbar">
          <span className="logo">
            <img
              onClick={() =>
                !openMobileNavbar &&
                document.getElementById("home").scrollIntoView(true)
              }
              src={darkLogo}
              alt="Logo"
              width={40}
              height={40}
            />
          </span>
          <ClearIcon
            className="clear-icon"
            onClick={() => setOpenMobileNavbar(false)}
          />
        </nav>
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
      </motion.div>

      {(activeSection === "experience" || activeSection === "contact") && (
        <motion.div
          animate={{
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className="arrow-mobile-up"
        >
          <KeyboardArrowUpIcon />
        </motion.div>
      )}

      {(activeSection === "home" || activeSection === "experience") && (
        <motion.div
          animate={{
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className="arrow-mobile-down"
        >
          <KeyboardArrowDownIcon />
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
