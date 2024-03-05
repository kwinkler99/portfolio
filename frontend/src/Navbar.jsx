import "./assets/style/navbar.scss";
import logo from "./assets/images/Logo.png";

import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState(null);
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

  return (
    <nav>
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
        <li
          onClick={() =>
            document.getElementById("experience").scrollIntoView(true)
          }
          id="nav-button-experience"
          style={activeSection === "experience" ? activeStyle : {}}
        >
          Experience
        </li>
        <li
          onClick={() => document.getElementById("snake").scrollIntoView(true)}
          id="nav-button-snake"
          style={activeSection === "snake" ? activeStyle : {}}
        >
          Let's play!
        </li>
        <li
          onClick={() =>
            document.getElementById("contact").scrollIntoView(true)
          }
          id="nav-button-contact"
          style={activeSection === "contact" ? activeStyle : {}}
        >
          Contact
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
