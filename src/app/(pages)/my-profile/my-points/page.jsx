"use client";
import { deleteMyReview, editMyReview, getMyAllReviews } from "@/helper/api_helper";
import { PRODUCT_IMAGES } from "@/helper/shared_helper";
import { Avatar, Card, Form, Modal, Rate, Spin, Table } from "antd";
import _ from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IconHelper } from "@/helper/iconhelper";
import { ERROR_NOTIFICATION, MESSAGE_HANDLERS, SUCCESS_NOTIFICATION } from "@/helper/notification_helper";
import EmptyData from "../../component/EmptyData";
import ReviewForm from "../../component/Forms/ReviewForm";
import GetSymbol from "../../component/GetSymbol";
import GetAmount from "../../component/GetAmount";

const MyPoints = () => {
  const dataSource = [
    {
      id: 1,
      event: "Points earned for account signup",
      Date: "Augest 24, 2024",
      points: "10+",
      amount: 0.84,
      EXPIRY_DATE: "Expired",
    },
  ];

  const columns = [
    {
      title: "Event",
      dataIndex: "event",
    },
    {
      title: "Date",
      dataIndex: "Date",
    },
    {
      title: "Points",
      dataIndex: "points",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (value) => (
        <span className="text-primary_color">
          <GetSymbol /> <GetAmount value={value} />
        </span>
      ),
    },
    {
      title: "Expiry Date",
      dataIndex: "EXPIRY_DATE",
    },
  ];

  return (
    <div className="flex flex-col !w-full">
      <div className="bg-white">
        <h5 className="text-lg font-semibold mb-5 text-primary_color">My Points :</h5>
        <h1>You have 10 Points, which are worth a discount of $0.01 amount.</h1>
      </div>
      <div className="py-4">
        <Table columns={columns} dataSource={dataSource} pagination={false} />
      </div>
    </div>
  );
};

export default MyPoints;
