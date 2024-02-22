import "../assets/style/contact.scss";

import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import MailIcon from "@mui/icons-material/Mail";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import BrushIcon from "@mui/icons-material/Brush";

const Contact = () => {
  const Phone = () => (
    <>
      <PhoneIphoneIcon />
      <a href="tel:+48512338362">+48 512-338-362</a>
    </>
  );

  const Mail = () => (
    <>
      <MailIcon />
      <a href="mailto:kasia.winkler99@gmail.com">kasia.winkler99@gmail.com</a>
    </>
  );

  const Linkedin = () => (
    <>
      <LinkedInIcon />
      <a href="https://linkedin.com/in/katarzyna-winkler" target="_blank">
        linkedin.com/in/katarzyna-winkler
      </a>
    </>
  );

  const Github = () => (
    <>
      <GitHubIcon />
      <a href="https://github.com/kwinkler99" target="_blank">
        github.com/kwinkler99
      </a>
    </>
  );

  const Figma = () => (
    <>
      <BrushIcon />
      <a href="www.github.com/kwinkler99" target="_blank">
        figma.com/portfolio
      </a>
    </>
  );

  const components = [<Phone />, <Mail />, <Linkedin />, <Github />, <Figma />];

  return (
    <span data-section id="contact">
      <div className="container">
        {components.map((component, index) => (
          <span key={`contact_${index}`} className="link">
            {component}
          </span>
        ))}
      </div>
    </span>
  );
};

export default Contact;
