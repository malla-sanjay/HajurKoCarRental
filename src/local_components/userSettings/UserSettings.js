import React from "react";
import ChangePassword from "./ChangePassword";
import AttachmentDisplay from "./AttachmentDisplay";
import UserAttachments from "./UserAttachments";
import { useState, useEffect } from "react";

const UserSettings = () => {
  const [hasAttach, sethasAttach] = useState();

  useEffect(() => {
    const attachment = localStorage.getItem("hasAttach");
    sethasAttach(attachment === "true"); // convert string to boolean
  }, []);

  return (
    <>
      <div className="page-content bg-white rounded-lg flex mt-20 justify-center align-middle">
        <ChangePassword />
        <div className="p-4">
          <AttachmentDisplay />
          <div className="bg-white px-2 rounded-md">
            {hasAttach === false ? <UserAttachments /> : <div />}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSettings;
