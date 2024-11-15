import { Input } from "antd";
import Link from "next/link";
import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useRouter } from "next/navigation";

const SeeMore = ({ text, setSearch, textShow = true, back, search = true }) => {
  const router = useRouter();

  const hanldeRedirect = () => {
    if (back) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="py-10 w-full">
      <div className="flex justify-between items-start">
        <div className={`md:text-start text-center ${textShow ? "visible" : "invisible"} `}>
          <h5 className="font-semibold text-2xl leading-normal !font-Poppins mb-1">{text}</h5>
          <div onClick={hanldeRedirect} className="text-slate-400 max-w-xl cursor-pointer center_row_div justify-start">
            <MdKeyboardArrowLeft /> back
          </div>
        </div>
        {search && (
          <div>
            <Input
              placeholder="Search"
              onChange={(e) => {
                setSearch(e?.target?.value);
              }}
              className="w-[250px] h-[35px] shadow-inner"
              suffix={<IoSearchOutline />}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SeeMore;
