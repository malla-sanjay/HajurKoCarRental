import ChangePassword from "@/local_components/userSettings/ChangePassword";
import UserAttachments from "@/local_components/userSettings/UserAttachments";
import React from "react";

const userSettings = () => {
  return (
    <div className="page-content bg-white rounded-lg flex mt-10">
      <ChangePassword />
      <UserAttachments />
    </div>
  );
};

export default userSettings;
