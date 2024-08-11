import React from 'react';

const AboutUsPage = () => {
    return (
        <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6">About Us</h1>
            <p className="mb-4">
                Welcome to ARTRA! My name is [Your Name], and I am the creator of this project. This platform was built out of a passion for art and a desire to create a space where artists and art lovers can come together to explore, share, and appreciate creativity.
            </p>
            <h2 className="text-2xl font-bold mt-6 mb-4">About Me</h2>
            <p className="mb-4">
                I am a [Your Profession/Background], with a deep love for art. This project started as a way for me to combine my technical skills with my passion for the arts. I believe that art has the power to bring people together and inspire change, and I wanted to create a platform where this could happen.
            </p>
            <h2 className="text-2xl font-bold mt-6 mb-4">Contact Me</h2>
            <p className="mb-4">
                If you have any questions, feedback, or just want to connect, feel free to reach out! I would love to hear from you.
            </p>
            <p className="mb-4">
                Email: <a href="mailto:muse.artra@gmail.com" className="text-blue-500">muse.artra@gmail.com</a>
            </p>
            <h2 className="text-2xl font-bold mt-6 mb-4">Why I Built This Project</h2>
            <p className="mb-4">
                This project was created to provide a space where artists can showcase their work and where art lovers can discover new and inspiring pieces. The idea is to foster a community that values creativity and the transformative power of art.
            </p>
            <p className="text-center mt-8 text-gray-500">
                &copy; {new Date().getFullYear()} ARTRA. All rights reserved.
            </p>
        </div>
    );
};

export default AboutUsPage;
