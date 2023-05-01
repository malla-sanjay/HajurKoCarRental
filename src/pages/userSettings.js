import React from "react";
import Navibar from "@/global_components/Navibar";
import UserSettings from "@/local_components/userSettings/UserSettings";

const userSettings = () => {
  var attachExist = false;
  return (
    <>
      <Navibar />
      <UserSettings />
    </>
  );
};

export default userSettings;
