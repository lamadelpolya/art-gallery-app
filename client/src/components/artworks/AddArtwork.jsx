import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/artwork-upload.service";

function AddArtwork() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);

    service.uploadImage(uploadData)
      .then(response => {
        setImageUrl(response.fileUrl);
      })
      .catch(err => console.log("Error while uploading the file:", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    service.createArtwork({ title, description, imageUrl })
      .then(() => {
        setTitle("");
        setDescription("");
        setImageUrl("");
        navigate("/");
      })
      .catch(err => console.log("Error while adding the new artwork:", err));
  };

  return (
    <div>
      <h2>New Artwork</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input 
          type="text" 
          name="title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Description</label>
        <textarea 
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)} 
        />
        <input type="file" onChange={handleFileUpload} />
        <button type="submit">Save new artwork</button>
      </form>
    </div>
  );
}

export default AddArtwork;
