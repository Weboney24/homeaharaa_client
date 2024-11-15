"use client";
import { deleteMyReview, editMyReview, getMyAllReviews } from "@/helper/api_helper";
import { PRODUCT_IMAGES } from "@/helper/shared_helper";
import { Avatar, Card, Form, Modal, Rate, Spin } from "antd";
import _ from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IconHelper } from "@/helper/iconhelper";
import { ERROR_NOTIFICATION, MESSAGE_HANDLERS, SUCCESS_NOTIFICATION } from "@/helper/notification_helper";
import EmptyData from "../../component/EmptyData";
import ReviewForm from "../../component/Forms/ReviewForm";

const page = () => {
  const [reviews, setAllReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [form] = Form.useForm();

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getMyAllReviews();
      setAllReviews(_.get(result, "data.data", []));
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const [current_id, setCurrentId] = useState("");

  const handleChange = (id) => {
    if (current_id === id) {
      setCurrentId("");
    } else {
      setCurrentId(id);
    }
  };

  const hanldleViewProduct = (res) => {
    router.push(`/products?product_id=${_.get(res, "product_data[0]._id", "")}&category_id=${_.get(res, "product_data[0].product_category_type", "")}`);
  };

  const handleDeleteReview = async (id) => {
    try {
      setLoading(true);
      const result = await deleteMyReview(id);
      SUCCESS_NOTIFICATION(result);
      fetchData();
    } catch (err) {
      ERROR_NOTIFICATION(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = async (values) => {
    try {
      const result = await editMyReview(values, id);
      SUCCESS_NOTIFICATION(result);
      fetchData();
      handleCancel();
    } catch (err) {
      ERROR_NOTIFICATION(err);
    }
  };

  const handleEdit = (id) => {
    form.setFieldsValue(id);
    setId(id?._id);
  };

  const handleCancel = () => {
    form.resetFields();
    setId();
  };

  return (
    <Spin spinning={loading}>
      <div className="flex flex-col !w-full">
        <div className="bg-white">
          <h5 className="text-lg font-semibold mb-5 text-primary_color">My Reviews :</h5>
        </div>
        <div className="space-y-2">
          {_.isEmpty(reviews) ? (
            <EmptyData message={MESSAGE_HANDLERS.EMPTY_REVIEWS} />
          ) : (
            reviews.map((res, index) => {
              return (
                <Card key={index} className="relative !w-full">
                  <Card.Meta
                    avatar={
                      <Avatar
                        onClick={() => {
                          hanldleViewProduct(res);
                        }}
                        className="cursor-pointer"
                        src={`${PRODUCT_IMAGES(_.get(res, "product_data", ""), "", true)}`}
                      />
                    }
                    title={
                      <span
                        onClick={() => {
                          hanldleViewProduct(res);
                        }}
                        className="capitalize cursor-pointer hover:text-primary_color"
                      >
                        {_.get(res, "product_data[0].product_name", "")}
                      </span>
                    }
                    description={
                      <div className="flex flex-col gap-y-2">
                        <Rate allowHalf value={_.get(res, "rating", "")} className="!text-sm !text-primary_color" />
                        <span className="!font-medium">{moment(_.get(res, "createdAt", "")).format("ll hh:mm A")}</span>
                        <div>
                          <p> {current_id === res?._id ? _.get(res, "comment", "") : _.get(res, "comment", "").slice(0, 300)}</p>
                          <span
                            className="!text-sm !text-primary_color cursor-pointer"
                            onClick={() => {
                              handleChange(res._id);
                            }}
                          >
                            {current_id === res?._id ? "close" : "Read More"}
                          </span>
                        </div>
                      </div>
                    }
                  />
                  <div className="absolute top-4 right-4 flex items-center gap-x-2">
                    <IconHelper.editIcons
                      className="!text-secondary_color !cursor-pointer"
                      onClick={() => {
                        handleEdit(res);
                      }}
                    />
                    <IconHelper.DeleteIcon
                      onClick={() => {
                        handleDeleteReview(res._id);
                      }}
                      className="!text-primary_color !cursor-pointer"
                    />
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
      <Modal open={id} footer={false} onCancel={handleCancel} title="Edit Review">
        <ReviewForm handleFinish={handleFinish} form={form} />
      </Modal>
    </Spin>
  );
};

export default page;
