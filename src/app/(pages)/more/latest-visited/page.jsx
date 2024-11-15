"use client";
import React, { useEffect, useState } from "react";
import SeeMore from "../../loadingscreens/SeeMore";

import _ from "lodash";
import ProductCard from "../../component/Cards/ProductCard";
import CircleLoading from "../../loadingscreens/CircleLoading";
import { useSelector } from "react-redux";
import { collectMyHistory } from "@/helper/api_helper";

const moreHistory = () => {
  const [search, setSearch] = useState();
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const cart_slice = useSelector((data) => data.cart_slice);
  const wishlist_slice = useSelector((data) => data.wishlist_slice);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await collectMyHistory();
      setHistoryData(_.get(result, "data.data", []));
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [_.get(cart_slice, "value", 0), _.get(wishlist_slice, "value", 0)]);

  const prepareProducts = () => {
    try {
      setLoading(true);
      let productData = historyData.map((res) => {
        _.get(res, "product[0]", []).variant = res.variant_id;
        return _.get(res, "product[0]", []);
      });
      setProducts(productData);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    prepareProducts();
  }, [historyData, _.get(cart_slice, "value", 0), _.get(wishlist_slice, "value", 0)]);

  return (
    <div className="min-h-screen w-full relative px-[8vw] pb-16">
      <SeeMore text={"Recently Viewed Products"} setSearch={setSearch} search={false} />
      <div className="!w-full">
        {loading ? (
          <CircleLoading extra={true} />
        ) : (
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
            {products.map((res, index) => {
              return <ProductCard from="history" key={index} res={res} fetchData={fetchData} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default moreHistory;
