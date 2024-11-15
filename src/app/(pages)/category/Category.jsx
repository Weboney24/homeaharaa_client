"use client";
import React, { useEffect, useState } from "react";
import { getMainCategory } from "@/helper/api_helper";
import Image from "next/image";
import Link from "next/link";
import _ from "lodash";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import CircleLoading from "../loadingscreens/CircleLoading";
import { FaChevronRight } from "react-icons/fa";
import DefaultHeading from "../component/DefaultHeading";

const Category = () => {
  const [categoryData, setCategoryData] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getMainCategory();
      setCategoryData(_.get(data, "data.data", []));
    } catch (e) {
      console.log("err", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="">
      <div className=" relative">
        <DefaultHeading title={"Shop By Product Categories"} subtitle={"Explore Our Range of Options"} to={"/more/category"} />
        {loading ? (
          <CircleLoading />
        ) : (
          <div className="flex gap-x-2 justify-between gap-y-6 pt-6">
            {categoryData.slice(0, 6).map((res, index) => {
              return (
                <Link href={`/explore/${res?._id}`} className="text-center hover:text-orange-500" key={index}>
                  <div className="2xl:w-[200px] w-[180px] h-[180px] bg-cover rounded-lg hover:scale-110 animation relative" style={{ backgroundImage: `url(${res.category_image})` }}>
                    <div className="absolute bottom-0 w-full  h-[50px] bg-gradient-to-b from-transparent via-[#080202e0] text-white to-[#080202] rounded-b-lg center_row_div capitalize">{res.category_name}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
