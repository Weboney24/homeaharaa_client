import React from "react";
import GetSymbol from "../component/GetSymbol";
import GetAmount from "../component/GetAmount";

const ExtraView = ({ property, value, color }) => {
  return (
    <div className="w-full center_row_div justify-between items-start flex-wrap  hover:!bg-orange-50">
      <div className="w-[70%]  flex flex-col gap-y-2">
        <h1 className={`heading  ${color ? "!text-black border-t" : "!text-secondary_color"}`}>{property}</h1>
      </div>
      <div className="w-[30%]  flex-col gap-y-2">
        <h1 className={`heading border-l ${color ? "!text-black border-t  " : "!text-secondary_color"} `}>
          <GetSymbol /> <GetAmount value={Number(value)} />
        </h1>
      </div>
    </div>
  );
};

export default ExtraView;
