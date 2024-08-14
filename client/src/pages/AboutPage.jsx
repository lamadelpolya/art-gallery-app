import React from "react";

const AboutPage = () => {
  return (
    <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-8">About Our Platform</h1>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700">
          Welcome to our platform—a digital space dedicated to artists and art
          lovers alike. Our mission is to create a community where artists from
          around the world can share their creations with a global audience. We
          believe that art has the power to inspire, to provoke thought, and to
          connect people across cultures and borders.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">What We Offer</h2>
        <p className="text-lg text-gray-700">
          Our platform is designed to empower artists by providing them with the
          tools they need to showcase their work in a meaningful way. Whether
          you're a painter, sculptor, photographer, or digital artist, you'll
          find a space here to display your art in the form of:
        </p>
        <ul className="list-disc list-inside ml-4 text-lg text-gray-700 mt-4">
          <li>
            <strong>Exhibitions:</strong> Curate your own virtual exhibitions to
            showcase a collection of your artworks. Each exhibition is a story,
            a journey through your creative process, and an opportunity to
            engage with viewers.
          </li>
          <li>
            <strong>Collections:</strong> Organize your artworks into
            collections, making it easier for viewers to explore and appreciate
            your work. Collections can be thematic, chronological, or any way
            you see fit.
          </li>
          <li>
            <strong>Artwork Sharing:</strong> Share individual artworks with the
            community. Each piece you share adds to the diverse tapestry of art
            on our platform, enriching the experience for everyone.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Why We Do It</h2>
        <p className="text-lg text-gray-700">
          We believe that art is meant to be shared. Our goal is to break down
          the barriers that often limit access to the art world, making it
          easier for artists to reach a wider audience and for art lovers to
          discover new works. By bringing art into the digital space, we aim to
          create a more connected and inspired world.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Join Us</h2>
        <p className="text-lg text-gray-700">
          Whether you are an artist looking to share your creations, or an art
          lover seeking new inspirations, we invite you to join our community.
          Together, let's celebrate creativity and make art accessible to
          everyone.
        </p>
      </section>

      <div className="flex justify-center mt-8">
        <a href="/register" className="btn btn-primary">
          Get Started
        </a>
      </div>
    </div>
  );
};

export default AboutPage;
