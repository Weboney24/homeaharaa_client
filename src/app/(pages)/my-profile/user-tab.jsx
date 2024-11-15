"use client";
import React, { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";

import Profilecard from "../component/Cards/Profilecard";
import { useDispatch, useSelector } from "react-redux";
import { FiAirplay } from "react-icons/fi";
import { IconHelper } from "@/helper/iconhelper";
import { Divider, Modal, Popconfirm, Spin, Tag, Tooltip, Upload } from "antd";
import { usePathname } from "next/navigation";
import { TbMoodEdit } from "react-icons/tb";
import { BiUpload } from "react-icons/bi";
import { LuUploadCloud } from "react-icons/lu";
import ImgCrop from "antd-img-crop";
import { CUSTOM_ERROR_NOTIFICATION, CUSTOM_SUCCESS_NOTIFICATION, ERROR_NOTIFICATION, SUCCESS_NOTIFICATION } from "@/helper/notification_helper";
import { updateUser, uploadImage } from "@/helper/api_helper";
import { LOAD_AUTH_DATAS } from "@/app/redux/auth_slice";

export default function Usertab() {
  const userdata = useSelector((data) => data?.auth_slice);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();

  const dispatch = useDispatch();

  const Tabs = [
    {
      id: 1,
      name: "Profile",
      icon: IconHelper.userIcon,
      link: "/my-profile",
    },
    {
      id: 2,
      name: "My Orders",
      icon: IconHelper.cartIcon,
      link: "/my-profile/my-order",
    },
    {
      id: 3,
      name: "My Carts",
      icon: IconHelper.bagOutlined,
      link: "/shopping-cart",
    },
    {
      id: 4,
      name: "My Favorites",
      icon: IconHelper.heartOutlined,
      link: "/favorite-items",
    },
    {
      id: 5,
      name: "Recently Visited Products",
      icon: IconHelper.historyIcon,
      link: "/more/latest-visited",
    },
    {
      id: 5,
      name: "Delivery Addresses",
      icon: IconHelper.deliveryAddress,
      link: "/my-profile/addresses",
    },
    {
      id: 6,
      name: "My Reviews",
      icon: IconHelper.RatingIcon,
      link: "/my-profile/my-reviews",
    },
    {
      id: 6,
      name: "My Comments",
      icon: IconHelper.BlogComments,
      link: "/my-profile/my-blog-comments",
    },
    {
      id: 7,
      name: "My Points",
      icon: IconHelper.myPoints,
      link: "/my-profile/my-points",
    },
    {
      id: 8,
      name: "Account",
      icon: IconHelper.settingsIcon,
      link: "/my-profile/account",
    },
  ];

  const handleUploadImage = async (e) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", e);
      formData.append("from", "client");
      const result = await uploadImage(formData);
      SUCCESS_NOTIFICATION(result);
      dispatch(LOAD_AUTH_DATAS(_.get(result, "data.data", [])));
    } catch (err) {
      CUSTOM_ERROR_NOTIFICATION("Something went wrong!!");
    } finally {
      setLoading(false);
    }
  };

  const handleRemovePic = async () => {
    try {
      setLoading(true);
      const formdata = {
        user_picture: "",
      };
      const result = await updateUser(formdata);
      SUCCESS_NOTIFICATION(result);
      dispatch(LOAD_AUTH_DATAS(_.get(result, "data.data", [])));
    } catch (err) {
      ERROR_NOTIFICATION(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <div className="w-full shadow opacity-100 rounded-t-lg min-h-[600px] z-50 border border-gray-100 bg-white pb-6 -mt-10 ml-4">
        <div className="mt-4 w-full min-h-[200px] center_col_div gap-y-1 pb-4">
          <div className="center_col_div gap-y-2 relative">
            <Profilecard size="big" />
            <div className="absolute bottom-0 right-0 size-[25px] bg-white rounded-full center_row_div cursor-pointer">
              {_.get(userdata, "value.user_picture", "") ? (
                <Popconfirm title="Are You Sure Want to delete this Pic" onConfirm={handleRemovePic}>
                  <div>
                    <Tooltip title="Remove Pic">
                      <IconHelper.DeleteIcon className="!text-primary_color" />
                    </Tooltip>
                  </div>
                </Popconfirm>
              ) : (
                <ImgCrop rotationSlider showGrid showReset onModalOk={handleUploadImage} className="custom_crop">
                  <Upload showUploadList={false}>
                    <TbMoodEdit className="!text-primary_color" />
                  </Upload>
                </ImgCrop>
              )}
            </div>
          </div>
          <h5 className="text-lg font-semibold pt-4 line-clamp-1 w-[96%] text-ellipsis overflow-hidden text-center">{_.get(userdata, "value.user_name", "")}</h5>
          <div className="text-secondary_color !text-sm px-10 w-[96%] text-ellipsis overflow-hidden">{_.get(userdata, "value.user_email", "")}</div>
        </div>

        <div className=" border-gray-100 center_col_div items-start !font-Poppins">
          {Tabs.map((res, index) => {
            return (
              <span key={index} className="w-full">
                <Divider />
                <Link href={res.link}>
                  <div key={index} className={`center_row_div justify-start gap-x-4 !text-secondary_color cursor-pointer hover:text-primary_color w-full pl-6 ${pathname === res.link ? "text-primary_color" : ""}`}>
                    <res.icon />
                    <h6 className="mb-0 font-medium text-sm text-ellipsis overflow-hidden">{res?.name}</h6>
                  </div>
                </Link>
              </span>
            );
          })}
        </div>
        <Modal
          open={open}
          onCancel={() => {
            setOpen(false);
          }}
          footer={false}
          closable={false}
          width={400}
        >
          <div className="pt-4 !w-full !h-full">
            <Upload.Dragger showUploadList={false}>
              <div className="w-full h-[200px] !center_col_div gap-y-4">
                <LuUploadCloud className="!text-3xl" />
                <p className="ant-upload-text text-center  center_row_div ">
                  Click or drag file to <br /> this area to upload
                </p>
              </div>
            </Upload.Dragger>
          </div>
        </Modal>
      </div>
    </Spin>
  );
}
