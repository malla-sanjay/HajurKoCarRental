import React, { useState } from "react";

const UserAttachments = () => {
  const [imageBinary, setImageBinary] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    const maxFileSize = 1500000; // 1.5 MB

    if (!allowedTypes.includes(file.type)) {
      setErrorMessage("Only PDF or image files are allowed.");
      return;
    }

    if (file.size > maxFileSize) {
      setErrorMessage("File size must be less than 1.5 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target.result;
      setImageBinary(result);
      setErrorMessage("");
    };
    reader.readAsBinaryString(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // do something with the imageBinary state here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="file-upload"
          className="page-content bg-white rounded-lg flex mt-10"
        >
          Upload an image or PDF:
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={handleFileUpload}
          className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserAttachments;
