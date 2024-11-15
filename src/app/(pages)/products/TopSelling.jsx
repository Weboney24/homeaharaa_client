"use client";
import React, { useEffect, useState } from "react";
import { getFilterProduct } from "@/helper/api_helper";
import DefaultHeading from "../component/DefaultHeading";
import _ from "lodash";
import ProductCard from "../component/Cards/ProductCard";
import { useSelector } from "react-redux";

const TopSelling = () => {
  const [productData, setProductData] = useState([]);

  let search = JSON.stringify({
    popular_products: true,
  });
  const cart_slice = useSelector((data) => data.cart_slice);
  const wishlist_slice = useSelector((data) => data.wishlist_slice);

  const fetchData = async () => {
    try {
      const result = await getFilterProduct(search);
      setProductData(_.get(result, "data.data", []));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [_.get(cart_slice, "value", 0), _.get(wishlist_slice, "value", 0)]);

  return (
    <div className="pt-2">
      <DefaultHeading to={"/more/topselling"} title={"Top Selling Products"} subtitle={"This Week's Customer Favorites"} />
      <div className="product_card_grid">
        {productData.slice(0, 8).map((res, index) => {
          return <ProductCard key={index} res={res} fetchData={fetchData} />;
        })}
      </div>
    </div>
  );
};

export default TopSelling;
