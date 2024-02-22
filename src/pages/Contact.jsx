import "../assets/style/contact.scss";

import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import MailIcon from "@mui/icons-material/Mail";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import BrushIcon from "@mui/icons-material/Brush";

const Contact = () => {
  const data = {
    phone: "+48 512-338-362",
    mail: "kasia.winkler99@gmail.com",
    linkedin: "linkedin.com/in/katarzyna-winkler",
    github: "github.com/kwinkler99",
    figma: "figma.com/portfolio",
    phoneHref: "+48512338362",
    figmaHref:
      "https://www.figma.com/file/svGxBneV4qgk7yZPMT0P3x/Portfolio?type=design&node-id=66%3A133&mode=design&t=pQleptISXK3lHNoY-1",
  };

  const Phone = () => (
    <>
      <PhoneIphoneIcon />
      <a href={`tel:${data.phoneHref}`}>{data.phone}</a>
    </>
  );

  const Mail = () => (
    <>
      <MailIcon />
      <a href={`mailto:${data.mail}`}>{data.mail}</a>
    </>
  );

  const Linkedin = () => (
    <>
      <LinkedInIcon />
      <a href={`https://${data.linkedin}`} target="_blank">
        {data.linkedin}
      </a>
    </>
  );

  const Github = () => (
    <>
      <GitHubIcon />
      <a href={`https://${data.github}`} target="_blank">
        {data.github}
      </a>
    </>
  );

  const Figma = () => (
    <>
      <BrushIcon />
      <a href={data.figmaHref} target="_blank">
        {data.figma}
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
