import ChangePassword from "@/local_components/userSettings/ChangePassword";
import UserAttachments from "@/local_components/userSettings/UserAttachments";
import AllCars from "@/global_components/AllCars";
import React from "react";
import { useEffect } from "react";
import Navibar from "@/global_components/Navibar";
import AttachmentDisplay from "@/local_components/userSettings/AttachmentDisplay";

const userSettings = () => {
  var attachExist = false;
  return (
    <>
      <Navibar />
      <div className="page-content bg-white rounded-lg flex mt-20 justify-center align-middle">
        <ChangePassword />
        <div>
          <AttachmentDisplay />
          {attachExist ? <div /> : <UserAttachments />}
        </div>
      </div>
    </>
  );
};

export default userSettings;
