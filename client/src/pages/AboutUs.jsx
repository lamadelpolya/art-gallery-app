import React from "react";

const AboutUsPage = () => {
  return (
    <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-8xl text-center text-pallette-1 font-medium mb-8">About Us</h1>

      <section className="mb-12 flex flex-col md:flex-row items-center">
        <div className="md:w-1/3 mb-6 md:mb-0">
          <img
            src="https://avatars.githubusercontent.com/u/172581975?s=400&u=142cb62f21a8ba2a132274edf5cfec0f73e1389a&v=4" // Your GitHub profile picture
            alt="Polina Yukhymenko"
            className="w-full h-auto rounded-full shadow-lg"
          />
        </div>
        <div className="md:w-2/3 md:ml-10">
          <h2 className="text-3xl font-semibold mb-4">Polina Yukhymenko</h2>
          <p className="text-lg text-gray-700 mb-4">
            I'm a Fullstack Developer based in Berlin, originally from Kyiv.
            With a passion for building dynamic, responsive web applications, I
            enjoy turning complex problems into simple, beautiful, and intuitive
            designs.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://github.com/lamadelpolya"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/polina-yukhymenko-43221323b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Contact ARTRA Support</h2>
        <p className="text-lg text-gray-700">
          If you have any questions or need assistance, please don't hesitate to
          contact our support team.
        </p>
        <p className="text-lg text-gray-700 mt-2">
          Email us at:{" "}
          <a
            href="mailto:muse.artra@gmail.com"
            className="text-blue-500 hover:underline"
          >
            muse.artra@gmail.com
          </a>
        </p>
      </section>
    </div>
  );
};

export default AboutUsPage;
