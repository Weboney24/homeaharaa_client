import { IconHelper } from "@/helper/iconhelper";
import { Card } from "antd";
import React from "react";
import { GoTrophy } from "react-icons/go";
import { GrRefresh } from "react-icons/gr";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineSecurity } from "react-icons/md";

const Shipping = () => {
  const data = [
    {
      id: 1,
      name: "Free Shipping",
      desc: "when ordering over $500",
      icon: IoCartOutline,
    },
    {
      id: 2,
      name: "Free Return",
      desc: "get Return within 30 days",
      icon: GrRefresh,
    },
    {
      id: 3,
      name: "Secure Payments",
      desc: "100% Secure Payments",
      icon: MdOutlineSecurity,
    },
    {
      id: 4,
      name: "Best Quality",
      desc: "original Product Quality",
      icon: GoTrophy,
    },
  ];

  return (
    <div>
      <div className="w-full bg-primary_color min-h-[100px] shadow-md rounded center_row_div justify-between px-10">
        {data.map((res, index) => {
          return (
            <div key={index} className="flex items-start gap-x-4">
              <div>
                <res.icon className="text-3xl text-white" />
              </div>
              <div>
                <h1 className="text-md font-medium text-white">{res.name}</h1>
                <h1 className="text-[12px] text-slate-50">{res.desc}</h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shipping;
