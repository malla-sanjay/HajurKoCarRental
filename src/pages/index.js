import Head from "next/head";
import Image from "next/image";
import Navibar from "@/global_components/Navibar";
import AllCars from "@/global_components/AllCars";
import AllRentalHistory from "@/pages/AllRentalHistory";


export default function Home() {
  return (
    <>
      <Navibar> </Navibar>
      <AllCars></AllCars>
      <div>Index page</div>
    </>
  );
}
