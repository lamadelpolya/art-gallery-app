// // src/components/ProfilePictureUpload.jsx

// import React, { useState } from 'react';
// import { uploadImageToCloudinary } from '../../../server/config/cloudinary.config'; // Import the helper function
// import axios from 'axios';

// const ProfilePictureUpload = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [profileImageUrl, setProfileImageUrl] = useState('');

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       alert('Please select a file first.');
//       return;
//     }

//     setUploading(true);

//     try {
//       const imageUrl = await uploadImageToCloudinary(selectedFile);
//       setProfileImageUrl(imageUrl);

//       // Optionally, send the image URL to your backend to store it in the user's profile
//       await axios.post('http://localhost:5005/api/profile-picture', {
//         imageUrl,
//       }, {
//         headers: {
//           authorization: 'Bearer ' + localStorage.getItem('token'),
//         },
//       });

//       alert('Profile picture uploaded successfully!');
//     } catch (error) {
//       alert('Error uploading profile picture.');
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="profile-picture-upload">
//       <h2 className="text-3xl font-bold mb-6 text-center">Upload Profile Picture</h2>
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleFileChange}
//         className="mb-4"
//       />
//       <button
//         onClick={handleUpload}
//         disabled={uploading}
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         {uploading ? 'Uploading...' : 'Upload'}
//       </button>
//       {profileImageUrl && (
//         <div className="mt-4">
//           <h3 className="text-xl">Preview:</h3>
//           <img
//             src={profileImageUrl}
//             alt="Profile"
//             className="mt-2 w-32 h-32 rounded-full object-cover"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfilePictureUpload;
