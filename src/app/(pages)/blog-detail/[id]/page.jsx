"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { addUserBlogComments, getBlogs, getCommentsByBlogs } from "@/helper/api_helper";
import { ImageHelper } from "@/helper/imagehelper";
import { Divider, Drawer, Form, List, Spin } from "antd";
import _ from "lodash";
import moment from "moment";
import BlogCards from "../../component/Cards/BlogCards";
import { ERROR_NOTIFICATION, SUCCESS_NOTIFICATION } from "@/helper/notification_helper";
import BlogCommentForms from "../../component/Forms/BlogCommentForms";
import ReviewCard from "../../component/Cards/ReviewCard";
import EmptyData from "../../component/EmptyData";
import { useSelector } from "react-redux";

export default function BlogDetail({ params }) {
  const [allBlogs, setAllBlogs] = useState([]);
  const [currentBlog, setCurrentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [blogComments, setBlogComments] = useState([]);
  const [View, setView] = useState("");

  const userdata = useSelector((data) => data?.auth_slice);

  const { id } = params;

  const [form] = Form.useForm();

  const fetchBlogsData = async () => {
    try {
      const result = await getBlogs();
      setAllBlogs(_.get(result, "data.data", []));
      setCurrentBlogs(_.get(result, "data.data", []).filter((blog) => blog._id === id));
    } catch (err) {
      console.error("Error fetching blog data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogsData();
  }, [id]);

  const handleFinish = async (values) => {
    try {
      setLoading(true);
      values.blog_id = _.get(currentBlog, "[0]._id", "");
      const result = await addUserBlogComments(values);
      SUCCESS_NOTIFICATION(result);
      form.resetFields();
      fetchBlogsComments();
    } catch (err) {
      console.log(err);
      ERROR_NOTIFICATION(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBlogsComments = async () => {
    try {
      const result = await getCommentsByBlogs(_.get(currentBlog, "[0]._id", ""));
      setBlogComments(_.get(result, "data.data", []));
    } catch {}
  };

  useEffect(() => {
    fetchBlogsComments();
  }, [_.get(currentBlog, "[0]._id", "")]);

  return (
    <Spin spinning={loading}>
      <div className="!font-Poppins center_row_div items-start px-[8vw] pt-4 flex-wrap gap-x-10 justify-between w-full">
        <div className="w-full h-[28vh] shadow rounded-lg bg-no-repeat bg-cover object-cover bg-center relative">
          <Image src={ImageHelper.Wave} width={0} height={0} className="!w-full !h-full !object-cover !object-top !rounded-lg " />
          <div className="w-full h-full absolute top-0 bg-[#000000b9] center_col_div text-white gap-y-4">
            <h1 className="capitalize text-2xl">Explore our blog</h1>
            <div>
              <Link href={"/blogs"}>Back</Link> &nbsp; | &nbsp;
              <span className="text-primary_color">{_.get(currentBlog, "[0].blog_name", "")}</span>
            </div>
          </div>
        </div>
        {/* rest */}
        <div className="pt-2 w-full min-h-[400px] group flex gap-x-4">
          <div className="w-[20%] h-[200px] overflow-hidden sticky top-0">
            <img src={_.get(currentBlog, "[0].blog_image")} alt="" className="rounded sticky top-10 transition-all duration-700 group-hover:scale-105" />
          </div>
          <div className="w-[80%] flex flex-col gap-y-1 pt-4">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-3xl uppercase text-primary_color font-bold">{_.get(currentBlog, "[0].blog_name", "")}</h1>
              <h1>{moment(_.get(currentBlog, "[0].createdAt", "")).format("ll")}</h1>
            </div>
            <h1 className="text-sm">By HomeAharaa admin</h1>
            <Divider />
            <h1 className="pb-2 text-black font-bold">Description :</h1>
            <div dangerouslySetInnerHTML={{ __html: _.get(currentBlog, "[0].blog_description", "") }} />
          </div>
        </div>

        {/* related */}
        <Divider />

        <h1 className="text-2xl font-medium text-black pb-4">Related Blogs</h1>
        <div>
          <List
            grid={{ column: 3, gutter: [10, 10] }}
            dataSource={_.shuffle(allBlogs?.slice(0, 6))}
            className="!w-full"
            pagination={false}
            renderItem={(res) => {
              return <BlogCards res={res} key={res?._id} />;
            }}
          />
        </div>

        {/* comments */}
        <Divider />
        <h1 className="text-2xl font-medium w-full text-black pb-4">Leave Your Comment</h1>
        <div className="w-full">
          {!_.isEmpty(blogComments) ? (
            <div>
              <div className="center_col_div items-start gap-y-2">
                {blogComments.slice(0, 3).map((item, index) => {
                  return <ReviewCard rating={false} item={item} key={index} />;
                })}
              </div>
              <h1
                onClick={() => {
                  setView(true);
                }}
                className="cursor-pointer hover:text-primary_color text-secondary_color font-medium my-4 text-center text-sm"
              >
                View More
              </h1>
            </div>
          ) : (
            <EmptyData message={"Be the First to Leave a Comment"} porduct={false} />
          )}
          <div className="p-6 rounded-md shadow dark:shadow-gray-800 ">
            <h5 className="text-lg font-semibold">Leave A Review:</h5>
            {!_.get(userdata, "value.user_name", "") ? (
              <Link href="/login">
                <div className="w-fit px-4 py-2 bg-primary_color text-white my-2 cursor-pointer">Login Now</div>
              </Link>
            ) : (
              <BlogCommentForms handleFinish={handleFinish} form={form} loading={loading} />
            )}
          </div>
        </div>
      </div>
      <Drawer
        width={"100%"}
        open={View}
        title={"All Comments"}
        onClose={() => {
          setView(false);
        }}
      >
        <div className="center_col_div items-start gap-y-2">
          {blogComments.map((item, index) => {
            return <ReviewCard item={item} rating={false} key={index} />;
          })}
        </div>
      </Drawer>
    </Spin>
  );
}
