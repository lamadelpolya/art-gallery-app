# Art Gallery App

## Overview
The Art Gallery App, "ARTRA," is a platform designed for artists and art lovers to connect, share, and explore artworks. It offers a space for artists to exhibit their creations through virtual exhibitions, organize their works into collections, and engage with a global audience. For art lovers, it provides an easy way to discover new artworks, learn about artists, and be part of a vibrant art community.

## Features
- **User Authentication**: Secure login and registration using JWT.
- **Profile Management**: Users can create and update their profiles, including uploading profile pictures.
- **Artwork Submission**: Artists can submit their artworks with detailed descriptions and images.
- **Virtual Exhibitions**: Curate virtual exhibitions to showcase a collection of artworks.
- **Art Collections**: Organize artworks into thematic or chronological collections.
- **Search Functionality**: Easily search for artists, artworks, and exhibitions.
- **Responsive Design**: The application is designed to work seamlessly across various devices.

## Tech Stack
### Client-side:
- **React**: For building the user interface.
- **React Router**: For navigation and routing.
- **Axios**: For making HTTP requests.
- **Tailwind CSS**: For styling.
- **DaisyUI**: For UI components.
- **Firebase**: For authentication and data storage.
- **Vite**: For development and build tooling.

### Server-side:
- **Node.js**: As the runtime environment.
- **Express.js**: For building the API.
- **Mongoose**: For interacting with MongoDB.
- **Cloudinary**: For handling image uploads.
- **Multer**: For handling file uploads.
- **JWT**: For secure authentication.
- **MongoDB**: As the database.

## Installation
### Prerequisites:
- Node.js
- npm or yarn

### Steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/lamadelpolya/art-gallery-app.git
Navigate to the project directory:

bash
Copy code
cd art-gallery-app
Install dependencies for both client and server:

bash
Copy code
npm install
cd client
npm install
cd ../server
npm install
Set up environment variables:

Create a .env file in the server directory and add the necessary environment variables, such as:
env
Copy code
MONGODB_URI=your_mongodb_uri
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
JWT_SECRET=your_jwt_secret
Run the application:

bash
Copy code
cd server
npm run dev
The server should be running at http://localhost:5005.

In another terminal, start the client:

bash
Copy code
cd client
npm run dev
The client should be running at http://localhost:5173.

Usage
Artists: After signing up, artists can upload their artworks, create collections, and organize exhibitions. They can also update their profile details and manage their submitted artworks.
Art Lovers: Browse through collections and exhibitions, search for specific artworks, and explore the profiles of various artists.
File Structure
Client:
src/
components/: Reusable components like Navbar, Footer, and forms for artwork submission.
pages/: Different pages of the application such as HomePage, AboutPage, UserProfilePage, etc.
contexts/: Context providers like AuthContext for global state management.
assets/: Static assets like images used across the application.
Server:
models/: Mongoose models for entities like User, Artwork, Collection, and Exhibition.
routes/: Express routes handling API endpoints.
config/: Configuration files including database connection and Cloudinary setup.
api/: API endpoints constants.
Contributing
Contributions are welcome! Please submit a pull request or open an issue to discuss the changes you want to make.
License
This project is licensed under the MIT License - see the LICENSE file for details.

Contact
For any inquiries or support, please reach out at muse.artra@gmail.com

