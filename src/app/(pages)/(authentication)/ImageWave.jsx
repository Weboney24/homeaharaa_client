import { ImageHelper } from "@/helper/imagehelper";
import Image from "next/image";
import React from "react";

const ImageWave = () => {
  return (
    <div>
      <div className="center_row_div justify-center items-start w-full px-[10vw] pt-10">
        <div className="w-[60%] pt-10 rounded-full fixed">
          <Image src={ImageHelper.Wave} width={0} height={0} sizes="100vw" className=" object-cover opacity-80" alt="Wave" />
        </div>
      </div>
    </div>
  );
};

export default ImageWave;
