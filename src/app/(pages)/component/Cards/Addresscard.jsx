import { IconHelper } from "@/helper/iconhelper";
import React from "react";

const Addresscard = ({ res, handleDelete, handleEdit, change = false, show = true, setSelectedAddress, selectedAddress = "", border = true }) => {
  const handlePick = () => {
    if (change) {
      setSelectedAddress(res._id);
    }
  };

  return (
    <div className="center_row_div justify-between w-full">
      {show && (
        <IconHelper.crossDelete
          onClick={() => {
            handleDelete(res._id);
          }}
          className="cursor-pointer text-primary_color"
        />
      )}

      <address onClick={handlePick} className={` ${!border ? "!shadow-none !border-none !p-0" : "p-5"}  relative ${selectedAddress === res._id ? "dull" : "text-slate-400"} w-[96%] ${!show && "cursor-pointer"} `}>
        <div className="flex flex-col gap-y-2">
          <div className="text-primary_color text-sm font-Poppins">{res.addressType}</div>
          <div className=" text-sm font-Poppins">
            {res.first_name} {res.last_name}
          </div>
          <div className=" text-sm font-Poppins">{res.mobile_number}</div>
          <div className=" text-sm font-Poppins">
            {res.street_address}, {res.town_city}, {res.state}, {res.country_region}
          </div>
          <div className=" text-sm font-Poppins">{res.pincode}</div>
        </div>
        {show && (
          <div className="absolute right-10 top-10 ">
            <IconHelper.editIcons
              className="cursor-pointer hover:text-primary_color"
              onClick={() => {
                handleEdit(res);
              }}
            />
          </div>
        )}
      </address>
    </div>
  );
};

export default Addresscard;
