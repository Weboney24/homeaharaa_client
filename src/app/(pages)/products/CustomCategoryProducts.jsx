"use client";
import React, { useEffect, useState } from "react";
import { getFilterProduct, getProduct } from "@/helper/api_helper";
import DefaultHeading from "../component/DefaultHeading";
import _ from "lodash";
import ProductCard from "../component/Cards/ProductCard";
import { useSelector } from "react-redux";

const CustomCategoryProducts = ({ name, category_id }) => {
  const [productData, setProductData] = useState([]);

  let search = JSON.stringify({
    category_id: category_id,
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
      <DefaultHeading to={`/explore/${category_id}`} title={name} subtitle={`Popular Choices of ${name}`} />
      <div className="product_card_grid">
        {productData.slice(0, 8).map((res, index) => {
          return <ProductCard key={index} res={res} fetchData={fetchData} />;
        })}
      </div>
    </div>
  );
};

export default CustomCategoryProducts;
