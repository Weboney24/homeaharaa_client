"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { getBlogs } from "@/helper/api_helper";
import SeeMore from "../loadingscreens/SeeMore";
import { ImageHelper } from "@/helper/imagehelper";
import { Card, List, Spin } from "antd";
import moment from "moment";
import BlogCards from "../component/Cards/BlogCards";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getBlogs(search);
      setBlogs(_.get(result, "data.data", []));
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  return (
    <Spin spinning={loading}>
      <div className="!font-Poppins center_row_div items-start px-[8vw] pt-4 flex-wrap gap-x-10 justify-between w-full">
        <div className="w-full h-[28vh] shadow rounded-lg bg-no-repeat bg-cover object-cover bg-center relative">
          <Image src={ImageHelper.Wave} width={0} height={0} className="!w-full !h-full !object-cover !object-top !rounded-lg " />
          <div className="w-full h-full absolute top-0 bg-[#000000b9] center_col_div text-white gap-y-4">
            <h1 className="capitalize text-2xl">Explore our blog</h1>
            <div>
              <Link href={"/"}>Home</Link> &nbsp; | &nbsp;
              <span className="text-primary_color">Blogs</span>
            </div>
          </div>
        </div>
        <SeeMore text={"Latest Blogs"} textShow={false} setSearch={setSearch} />
        <div className="-mt-10">
          <List
            grid={{ column: 3, gutter: [10, 10] }}
            dataSource={blogs}
            className="!w-full"
            pagination={{ pageSize: 6 }}
            renderItem={(res) => {
              return <BlogCards res={res} key={res?._id} />;
            }}
          />
        </div>
      </div>
    </Spin>
  );
}
