"use client";
import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import Image from "next/image";
import BannerImage from "../../../assets/images/banner.png";
import { getBanners } from "@/helper/api_helper";
import ImageLoading from "../loadingscreens/ImageLoading";

const Banner = () => {
  const [bannerData, setBannerDatas] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getBanners();
      setBannerDatas(_.get(result, "data.data", []));
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full h-full">
      {loading && <ImageLoading width={"100vw"} height={"60vh"} />}
      <Carousel effect="scrollx" arrows dotPosition="bottom" pauseOnHover={false}>
        {bannerData.map((res, index) => {
          return (
            <div key={index} className="w-full custom_height !overflow-hidden ">
              <img width={0} height={0} src={res.banner_image} alt="banner" className="!w-full !h-full object-cover " />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Banner;
