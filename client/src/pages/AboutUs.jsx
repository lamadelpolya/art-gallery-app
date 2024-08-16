import React from "react";

const AboutUsPage = () => {
  return (
    <div className="container border-8 border-pallette-1 mx-auto my-10 p-6 bg-white rounded-2xl shadow-md">
      <h1 className="text-6xl text-center text-pallette-1 font-bold mb-8">About Us</h1>

      <section className="mb-12 flex flex-col text-pallette-1 text-xl md:flex-row items-center">
        <div className="md:w-1/3 mb-6 border-8 border-pallette-1 rounded-full md:mb-0">
          <img
            src="https://avatars.githubusercontent.com/u/172581975?s=400&u=142cb62f21a8ba2a132274edf5cfec0f73e1389a&v=4"
            alt="Polina Yukhymenko"
            className="w-full h-auto rounded-full shadow-lg"
          />
        </div>
        <div className="md:w-2/3 md:ml-10">
          <h2 className="text-3xl font-semibold mb-4">Polina Yukhymenko</h2>
          <p className="text-xl text-pallette-1 mb-4">
            I'm a Fullstack Developer based in Berlin, originally from Kyiv.
            With a passion for building dynamic, responsive web applications, I
            enjoy turning complex problems into simple, beautiful, and intuitive
            designs. My expertise spans various technologies, including React,
            Node.js, Express, and MongoDB.
          </p>
          <p className="text-xl text-pallette-1 mb-4">
            I've worked on numerous projects since my career started a few month ago.  I take pride
            in writing clean, efficient code and continuously improving my skills
            to stay up-to-date with the latest industry trends.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://github.com/lamadelpolya"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pallette-1 underline"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/polina-yukhymenko-43221323b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pallette-1 underline"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      <section className="mb-12">
       
      </section>

      <section className="mb-12">
        <h2 className="text-4xl text-pallette-1 font-semibold mb-4">What We Offer</h2>
        <ul className="list-disc list-inside text-lg text-pallette-1">
          <li>Custom web application development tailored to your needs</li>
          <li>Responsive and user-friendly design</li>
          <li>Integration of cutting-edge technologies</li>
          <li>Continuous support and maintenance for your projects</li>
        </ul>
      </section>

      <section className="mb-12">
        
       
      </section>

      <section className="mb-12">
        <h2 className="text-4xl text-pallette-1 font-semibold mb-4">Contact ARTRA Support</h2>
        <p className="text-lg text-pallette-1">
          If you have any questions or need assistance, please don't hesitate to
          contact our support team.
        </p>
        <p className="text-lg text-pallette-1 mt-2">
          Email us at:{" "}
          <a
            href="mailto:muse.artra@gmail.com"
            className="text-pallette-1 underline"
          >
            muse.artra@gmail.com
          </a>
        </p>
      </section>
    </div>
  );
};

export default AboutUsPage;
