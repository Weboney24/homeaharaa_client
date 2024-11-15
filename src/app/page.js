"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CtaOne from "./components/cta-one";
import { newProduct } from "./data/data";
import { FiHeart, FiEye, FiBookmark } from "./assets/icons/vander";
import Shipping from "./Shipping";
import Category from "./(pages)/category/Category";
import Banner from "./(pages)/banner/Banner";
import DefaultHeading from "./(pages)/component/DefaultHeading";
import { getFilteredcategory, getProduct } from "@/helper/api_helper";
import NewArivals from "./(pages)/products/NewArivals";
import TopSelling from "./(pages)/products/TopSelling";
import MycartProducts from "./(pages)/products/MycartProducts";
import MyWishListProduct from "./(pages)/products/MyWishListProduct";
import MyHistoryProduct from "./(pages)/products/MyHistoryProduct";
import { useSelector } from "react-redux";
import _ from "lodash";
import CustomCategoryProducts from "./(pages)/products/CustomCategoryProducts";

export default function Home() {

  useEffect(() => {
    document.title = "- யாம் பெற்ற இன்பம் ! பெறுக இவ்வையகம் !";
  }, [])

  const userdata = useSelector((data) => data?.auth_slice);

  const [categoryData, setcategoryData] = useState([])


  const fetchData = async () => {
    try {
      const result = await getFilteredcategory();
      setcategoryData(_.get(result, "data.data", []))
      console.log(result)
    } catch {

    }
  }


  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="w-full">
      <Banner />
      <section className="relative px-[8vw] flex flex-col gap-y-12 pt-10">
        <Category />
        <Shipping />
        <NewArivals />
        <TopSelling />
        {categoryData.map((res, index) => {
          return (
            <CustomCategoryProducts key={index} name={res.category_name} category_id={res._id} />
          )
        })}
        {_.get(userdata, "value.user_name", "") &&
          <>
          <MyWishListProduct />
          <MycartProducts />
          <MyHistoryProduct />
          </>
        }
      </section>
      <CtaOne />
    </div>
  );
}
