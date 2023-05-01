import Head from "next/head";
import Image from "next/image";
import Navibar from "@/global_components/Navibar";
import AllCars from "@/global_components/AllCars";

export default function Home() {
  return (
    <>
      <Navibar />
      <AllCars />
    </>
  );
}
