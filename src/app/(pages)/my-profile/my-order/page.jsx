"use client";
import { collectMyOrders } from "@/helper/api_helper";
import { Divider, Drawer, Modal, Spin, Table, Tag, Timeline } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Addresscard from "../../component/Cards/Addresscard";
import { useReactToPrint } from "react-to-print";
import { ImageHelper } from "@/helper/imagehelper";
import moment from "moment";
import { OrderStatusTypes } from "@/helper/shared_helper";
import _ from "lodash";
import EmptyData from "../../component/EmptyData";
import { MESSAGE_HANDLERS } from "@/helper/notification_helper";
import GetSymbol from "../../component/GetSymbol";
import GetAmount from "../../component/GetAmount";
import { useRouter } from "next/navigation";
import Link from "next/link";

const MyOrders = () => {
  const [orderData, setOrderData] = useState([]);
  const [open, setOpen] = useState(false);
  const [orderDetail, setCurrentOrder] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await collectMyOrders();
      setOrderData(_.get(result, "data.data", []));
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "S.No",
      width: 50,
      align: "center",
      render: (data, all, index) => {
        return <div className="!font-Poppins !font-bold">{index + 1}</div>;
      },
    },
    {
      title: "Products",
      dataIndex: "products",
      width: 150,
      render: (data) => {
        return <h1 className="!font-medium !font-Poppins uppercase line-clamp-1">{_.get(data, "[0].product_name", "")}</h1>;
      },
    },
    {
      title: "Invoice",
      dataIndex: "invoice_no",
      width: 100,
      render: (data) => {
        return <h1 className="!font-medium !font-Poppins !line-clamp-1">{data}</h1>;
      },
    },
    {
      title: "Amount",
      dataIndex: "final_total",
      render: (data, all) => {
        return (
          <Tag color="orange">
            <GetSymbol custom={_.get(all, "currencySymbol", "")} />
            &nbsp; <GetAmount value={data} custom={_.get(all, "currencyRate", "")} />
          </Tag>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "order_status",
      render: (data) => {
        return <div className={`uppercase font-medium ${data === "cancelled" ? "text-red-500" : data === "completed" ? "text-green-500" : "text-gray-500"} `}>{data} </div>;
      },
    },
    {
      title: "Action",
      render: (data) => {
        return (
          <Link href={`/my-profile/my-order/${data?._id}`} className="text-primary_color cursor-pointer">
            View
          </Link>
        );
      },
    },
  ];

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const billingColumn = [
    {
      title: "Items",
      dataIndex: "product_name",
      render: (data) => {
        return <h1 className="flex items-center">{data}</h1>;
      },
    },
    {
      title: "Price",
      align: "center",
      width: 100,
      dataIndex: "product_price",
      render: (data) => {
        return (
          <h1 className=" py-2">
            <GetSymbol custom={_.get(orderDetail, "currencySymbol", "")} />
            &nbsp;{data}
          </h1>
        );
      },
    },
    {
      title: "Qty",
      align: "center",
      width: 100,
      dataIndex: "product_quantity",
    },
    {
      title: "Total",
      align: "center",
      width: 100,
      dataIndex: "total_price",
      render: (data) => {
        return (
          <h1 className="py-2">
            <GetSymbol custom={_.get(orderDetail, "currencySymbol", "")} />
            &nbsp;{data}
          </h1>
        );
      },
    },
  ];

  return (
    <Spin spinning={loading}>
      <div className="flex flex-col !w-full">
        <div className="bg-white">
          <h5 className="text-lg font-semibold mb-5 text-primary_color">My Orders :</h5>
        </div>
        <div>{_.isEmpty(orderData) ? <EmptyData message={MESSAGE_HANDLERS.EMPTY_ORDER} /> : <Table columns={columns} dataSource={orderData} />}</div>
      </div>
    </Spin>
  );
};

export default MyOrders;
