"use client";
import React, { useEffect, useState } from "react";
import SeeMore from "../../loadingscreens/SeeMore";
import Link from "next/link";
import CircleLoading from "../../loadingscreens/CircleLoading";
import _ from "lodash";
import { getMainCategory } from "@/helper/api_helper";

const MoreCategory = () => {
  const [search, setSearch] = useState("");
  const [categoryData, setCategoryData] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getMainCategory(search);
      setCategoryData(_.get(data, "data.data", []));
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, [search]);

  return (
    <div className="min-h-screen w-full relative px-[8vw] pb-16">
      <SeeMore text={"All Categories"} setSearch={setSearch} subtext={"Shop the latest products from the most popular collections"} />
      <div className="!w-full">
        {loading ? (
          <CircleLoading extra={true} />
        ) : (
          <div className="flex flex-wrap gap-x-2 gap-y-2">
            {categoryData.map((res, index) => {
              return (
                <Link href={`/explore/${res?._id}`} key={index} className="w-[200px]  h-[200px] bg-cover relative" style={{ backgroundImage: `url(${res.category_image})` }}>
                  <div className="absolute bottom-0 w-full h-[50px] bg-gradient-to-b from-transparent via-[#080202e0] text-white to-[#080202] center_row_div">{res.category_name}</div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoreCategory;
