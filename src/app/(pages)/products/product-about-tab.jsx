"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { commentsData } from "../../data/data";
import { FiUser, FiMail, FiMessageCircle } from "../../assets/icons/vander";
import { Button, Divider, Drawer, Form, Input, Rate, Spin, Tag } from "antd";
import { emailValidation, formValidation } from "@/helper/form_validation";
import { ERROR_NOTIFICATION, SUCCESS_NOTIFICATION } from "@/helper/notification_helper";
import { useSelector } from "react-redux";
import { addUserReview, getReviewsByProduct } from "@/helper/api_helper";
import AllUserProfilecard from "../component/Cards/AllUserProfilecard";
import moment from "moment";
import ReviewCard from "../component/Cards/ReviewCard";
import EmptyData from "../component/EmptyData";
import { getProductWeight } from "@/helper/shared_helper";
import ReviewForm from "../component/Forms/ReviewForm";

export default function ProductAboutTab({ product, variant_id, category_id }) {
  let [activeTab, setActiveTab] = useState(1);

  const userdata = useSelector((data) => data?.auth_slice);

  const Tabs = [
    {
      id: 1,
      name: "Description",
    },
    {
      id: 2,
      name: "Additional Information",
    },
    {
      id: 3,
      name: "Review",
    },
  ];

  const [form] = Form.useForm();

  const [productReview, setProductReview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [View, setView] = useState("");

  const handleFinish = async (values) => {
    try {
      if (!_.get(userdata, "value.user_name", "")) {
        return router.push("/login");
      }
      setLoading(true);
      values.product_id = _.get(product, "[0]._id", "");
      values.category_id = category_id;
      const result = await addUserReview(values);
      SUCCESS_NOTIFICATION(result);
      fetchData();
      form.resetFields();
      prepareForm();
    } catch (err) {
      ERROR_NOTIFICATION(err);
    } finally {
      setLoading(false);
    }
  };

  const prepareForm = () => {
    try {
      form.setFieldsValue({
        user_name: _.get(userdata, "value.user_name"),
        user_email: _.get(userdata, "value.user_email"),
      });
    } catch {}
  };

  const fetchData = async () => {
    try {
      const result = await getReviewsByProduct(_.get(product, "[0]._id", ""));
      setProductReview(_.get(result, "data.data", []));
    } catch {}
  };

  useEffect(() => {
    prepareForm();
  }, [_.get(userdata, "value.user_name")]);

  useEffect(() => {
    fetchData();
  }, [_.get(product, "[0]._id", "")]);

  return (
    <Spin spinning={loading}>
      <div className="flex gap-x-2 pt-4 font-Poppins" id="review">
        <div className="flex flex-col gap-y-4 w-[20%]">
          <div className="sticky top-20">
            <div className="flex flex-col px-2 py-2 gap-y-3 bg-white dark:bg-slate-900 shadow dark:shadow-gray-800" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
              {Tabs.map((res, index) => {
                return (
                  <button key={index} className={`px-4 py-2 line-clamp-1 text-start  rounded-md w-full text-sm hover:text-orange-500 duration-500 ${activeTab === res.id ? "text-white bg-orange-500 hover:text-white" : ""}`} onClick={() => setActiveTab(res.id)}>
                    {res.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="lg:col-span-9 md:col-span-7 w-[80%]">
          <div id="myTabContent" className="p-6 bg-white  shadow  dark:shadow-gray-800 ">
            {activeTab === 1 && (
              <div id="description">
                <p>{_.get(product, "[0].product_description", "")}</p>
              </div>
            )}
            {activeTab === 2 && (
              <div className="flex flex-col w-full gap-y-2">
                <div className="w-full center_row_div justify-start gap-x-2">
                  <h1 className="!w-[100px]">Ingredients :</h1>
                  {_.isEmpty(_.get(product, "[0].product_ingredient", [])) ? (
                    <h1 className="text-sm">N/A</h1>
                  ) : (
                    <div className="flex space-x-1">
                      {_.get(product, "[0].product_ingredient", []).map((res, index) => {
                        return (
                          <Tag color="orange" key={index}>
                            {res?.split("/")[1]}
                          </Tag>
                        );
                      })}
                    </div>
                  )}
                </div>
                <Divider />
                <div className="w-full center_row_div justify-start gap-x-1">
                  <h1 className="!w-[100px]">Weight :</h1>
                  <div className="flex space-x-2">
                    {getProductWeight(product, variant_id).map((res, index) => {
                      return (
                        <Tag
                          color="orange"
                          key={index}
                          onClick={() => {
                            handleVariantChange(res);
                          }}
                        >
                          {res.weight}
                        </Tag>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            {activeTab === 3 && (
              <div>
                {!_.isEmpty(productReview) ? (
                  <div>
                    <div className="center_col_div items-start gap-y-2">
                      {productReview.slice(0, 3).map((item, index) => {
                        return <ReviewCard item={item} key={index} />;
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
                  <EmptyData message={"Be the First to Leave a Review"} porduct={false} />
                )}
                <div className="p-6 rounded-md shadow dark:shadow-gray-800 ">
                  <h5 className="text-lg font-semibold">Leave A Review:</h5>
                  {!_.get(userdata, "value.user_name", "") ? (
                    <Link href="/login">
                      <div className="w-fit px-4 py-2 bg-primary_color text-white my-2 cursor-pointer">Login Now</div>{" "}
                    </Link>
                  ) : (
                    <ReviewForm handleFinish={handleFinish} form={form} />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Drawer
        width={"100%"}
        open={View}
        title={"All Reviews"}
        onClose={() => {
          setView(false);
        }}
      >
        <div className="center_col_div items-start gap-y-2">
          {productReview.map((item, index) => {
            return <ReviewCard item={item} key={index} />;
          })}
        </div>
      </Drawer>
    </Spin>
  );
}
