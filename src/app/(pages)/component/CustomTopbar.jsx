import { ImageHelper } from "@/helper/imagehelper";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CustomTopbar = ({ text }) => {
  return (
    <>
      <div className="w-full  h-[28vh] shadow rounded-lg bg-no-repeat bg-cover object-cover bg-center relative">
        <Image src={ImageHelper.Wave} width={0} height={0} className="!w-full !h-full !object-cover !object-top !rounded-lg " />
        <div className="w-full h-full absolute top-0 bg-[#000000b9] center_col_div text-white gap-y-4">
          <h1 className="capitalize text-2xl">{text}</h1>
          <div>
            <Link href={"/"}>Home</Link> &nbsp; | &nbsp;
            <span className="text-primary_color">{text}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomTopbar;
