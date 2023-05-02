import React from "react";
import { Button } from "@mui/material";
import CancelPresentationRoundedIcon from "@mui/icons-material/CancelPresentationRounded";
import Navibar from "@/global_components/Navibar";
import AllRentalHistory from "./AllRentalHistory";
import RentByID from "./RentByID";
import DamageLogByID from "./DamageLogByID";
import CardDamageLogByID from "./CardDamageLogByID";

export default function History() {
  return (
    <>
      <RentByID> </RentByID>
      <CardDamageLogByID> </CardDamageLogByID>
    </>
  );
}
