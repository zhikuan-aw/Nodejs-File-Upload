import { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const onFileChange = (event) => {
    setFile(event.target.files ? event.target.files[0] : null);
  };

  const onFileUpload = () => {
    if (!file) {
      alert("Attach a file to start upload");
      return;
    }
    const formData = new FormData();
    if (file) formData.append("file", file);

    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percentCompleted);
      },
    };

    axios
      .post("http://localhost:3000/upload", formData, config)
      .then((response) => {
        alert("File uploaded successfully");
        setProgress(0);
        setFile(null);
        window.location.reload();
      })
      .catch((error) => alert(`Error uploading file, ${error}`));
  };

  return (
    <div className='flex flex-col px-8 py-4 bg-black text-white rounded-md font-semibold mb-4'>
      <div className='flex flex-col justify-between gap-4 sm:flex-row mb-2'>
        <input type='file' onChange={onFileChange} />
        <button
          className='bg-slate-500 hover:bg-slate-600 transition-all duration-200 px-4 rounded-md'
          onClick={onFileUpload}
        >
          Upload
        </button>
      </div>
      {progress > 0 && (
        <div className='text-center'>Upload is {progress}% complete</div>
      )}
    </div>
  );
};

export default FileUpload;
