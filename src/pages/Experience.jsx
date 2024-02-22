import "../assets/style/experience.scss";

const Experience = () => {
  const experience = [
    {
      brand: "Intel Corporation",
      position: "Frontend Developer Intern",
      period: "11/2021 - present",
      description: [
        `Creating a React web applications using Redux, CSS, Sass, Bootstrap, 
        React Bootstrap, Axios, Azureauthorization`,
        `Managing own React project - responsible for the project, assigning 
        tasks, cooperation with the backend team, managing new functionalities`,
        `Supporting projects - taking over someone's web application, working 
        with users, solving problems, taking over tickets and prioritizing them`,
        `Creating production and development versions of the web application`,
        `Working with REST API - code debugging, troubleshooting, creating 
        endpoints, handling asynchronous requests, using FastAPI`,
        `Designing a web application in Figma (collecting information from users, 
          conducting an interview, getting to know the principles of company 
          design, gathering feedback)`,
        `Working in a Scrum team - experience with JIRA`,
      ],
    },
  ];

  return (
    <span data-section id="experience">
      {experience.map((item) => (
        <div className="container">
          <span className="brand">
            <p className="name">{item.brand}</p>
            <p className="position">{item.position}</p>
            <p className="period">{item.period}</p>
          </span>
          <span className="description">
            <ul>
              {item.description.map((point) => (
                <li>{point}</li>
              ))}
            </ul>
          </span>
        </div>
      ))}
    </span>
  );
};

export default Experience;
