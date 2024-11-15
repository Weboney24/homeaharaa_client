"use client";
import React, { useEffect, useState } from "react";
import SeeMore from "../../loadingscreens/SeeMore";

import CircleLoading from "../../loadingscreens/CircleLoading";
import _ from "lodash";

import ProductCard from "../../component/Cards/ProductCard";
import { getFilterProduct } from "@/helper/api_helper";

const MoreTopSelling = () => {
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  const [productData, setProductData] = useState([]);

  let params = JSON.stringify({
    popular_products: true,
    search: search,
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getFilterProduct(params);
      setProductData(_.get(result, "data.data", []));
    } catch (err) {
      console.log(err);
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
      <SeeMore text={"Top Selling Products"} setSearch={setSearch} />
      <div className="!w-full">
        {loading ? (
          <CircleLoading extra={true} />
        ) : (
          <div className="product_card_grid !pt-0">
            {productData.map((res, index) => {
              return <ProductCard key={index} res={res} fetchData={fetchData} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoreTopSelling;
