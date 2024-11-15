"use client";
import Usertab from "@/app/(pages)/my-profile/user-tab";
import { ImageHelper } from "@/helper/imagehelper";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function RootLayout({ children }) {
  const userdata = useSelector((data) => data?.auth_slice);

  const router = useRouter();

  useEffect(() => {
    if (!_.get(userdata, "value.user_email", "")) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <div className="!font-Poppins center_row_div items-start px-[8vw] pt-1 flex-wrap gap-x-10 justify-between w-full">
        <div className="w-full h-[28vh] shadow rounded-lg bg-no-repeat bg-cover object-cover bg-center relative">
          <Image src={ImageHelper.Banner1} width={0} height={0} className="!w-full !h-full !object-cover !object-top !rounded-lg " />
          <div className="w-full h-full absolute top-0 bg-[#000000b9] center_col_div text-white gap-y-4">
            <h1 className="capitalize text-2xl">My account</h1>
            <div>
              <Link href={"/"}>Home</Link> &nbsp; | &nbsp;
              <span className="text-primary_color">{_.get(userdata, "value.user_name", "")}</span>
            </div>
          </div>
        </div>
        <div className="w-[250px] z-50">
          <Usertab />
        </div>
        <div className="mt-10 w-[72%]">{children}</div>
      </div>
    </>
  );
}
