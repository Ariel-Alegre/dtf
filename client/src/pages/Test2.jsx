import React, { useState } from "react";
import axios from "axios";

const UploadFiles = () => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [url1, setUrl1] = useState(null);
  const [url2, setUrl2] = useState(null);

  const handleFile1Change = (e) => {
    setFile1(e.target.files[0]);
  };

  const handleFile2Change = (e) => {
    setFile2(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file1 || !file2) {
      alert("Please select both files");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("image1", file1);
    formData.append("image2", file2);

    try {
      const response = await axios.post("http://localhost:3001/fields", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress);
        },
      });

      setUrl1(response.data.url1);
      setUrl2(response.data.url2);

      alert("Files uploaded successfully");
    } catch (error) {
      console.error(error);
      alert("An error occurred while uploading files");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFile1Change} />
      <input type="file" onChange={handleFile2Change} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload Files"}
      </button>
      {uploadProgress > 0 && <p>Progress: {uploadProgress}%</p>}
      {url1 && <p>Image 1 URL: {url1}</p>}
      {url2 && <p>Image 2 URL: {url2}</p>}
    </div>
  );
};

export default UploadFiles;
