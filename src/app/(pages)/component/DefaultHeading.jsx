import Link from "next/link";
import React from "react";

const DefaultHeading = (props) => {
  
  const { title, subtitle, to } = props;

  return (
    <div className="flex items-center justify-between">
      <div className="md:text-start text-center">
        <h5 className="font-semibold text-3xl leading-normal font-Poppins mb-2 text-primary_color capitalize">{title}</h5>
        <p className="text-slate-500">{subtitle}</p>
      </div>
      {to && (
        <div className="md:text-end hidden md:block">
          <Link href={to || "#"} className="text-slate-400 hover:text-orange-500">
            See More Items <i className="mdi mdi-arrow-right"></i>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DefaultHeading;
