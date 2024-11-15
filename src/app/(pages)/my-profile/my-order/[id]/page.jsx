"use client";
import Addresscard from "@/app/(pages)/component/Cards/Addresscard";
import GetSymbol from "@/app/(pages)/component/GetSymbol";
import { OrderCancelTypes, OrderStatusTypes } from "@/helper/shared_helper";
import { Divider, Spin, Table, Timeline } from "antd";
import _ from "lodash";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { cancelMyOrder, collectMyOrders } from "@/helper/api_helper";
import { ImageHelper } from "@/helper/imagehelper";
import GetAmount from "@/app/(pages)/component/GetAmount";
import { ERROR_NOTIFICATION, SUCCESS_NOTIFICATION } from "@/helper/notification_helper";

const page = ({ params }) => {
  const [loading, setLoading] = useState(false);

  const [orderDetail, setOrderDetails] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      let id = _.get(params, "id", "");
      const result = await collectMyOrders(id);
      setOrderDetails(_.get(result, "data.data[0]", []));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const ORDER_EXPLORE_TIMILINE = (value) => {
    try {
      let result = _.get(orderDetail, "order_delivery_timeline", []).filter((res) => {
        return res.order_status === value;
      });
      return result;
    } catch {}
  };

  let Symbol = () => {
    return <GetSymbol custom={_.get(orderDetail, "currencySymbol", "")} />;
  };

  let customRate = _.get(orderDetail, "currencyRate", "");

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
            <Symbol />
            &nbsp; <GetAmount value={data} custom={customRate} />
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
            <Symbol />
            &nbsp;
            <GetAmount value={data} custom={customRate} />
          </h1>
        );
      },
    },
  ];

  const handleCancelOrder = async () => {
    try {
      setLoading(true);
      let formData = {
        order_id: _.get(orderDetail, "_id", ""),
        order_status: "cancelled",
      };
      const result = await cancelMyOrder(formData);
      SUCCESS_NOTIFICATION(result);
      fetchData();
    } catch (err) {
      ERROR_NOTIFICATION(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <div className="center_col_div justify-start gap-x-10 w-full items-start">
        <div className="bg-white center_row_div w-full justify-between">
          <div>
            <h5 className="text-lg font-semibold  text-primary_color">{_.get(orderDetail, "invoice_no", "")}</h5>
            <Link href={"/my-profile/my-order"} className="text-secondary_color mb-5 cursor-pointer">
              back
            </Link>
          </div>

          {!["cancelled", "out for delivery"].includes(_.get(orderDetail, "order_status", "")) && (
            <div onClick={handleCancelOrder} className="w-fit h-fit px-3 py-2 shadow-inner border cursor-pointer bg-primary_color text-white">
              Cancel Order
            </div>
          )}
        </div>

        <div className="pt-6">
          <h1 className="pb-6">Track Your Order :</h1>
          {_.get(orderDetail, "order_status", "") === "cancelled" ? (
            <Timeline
              mode="left"
              items={OrderCancelTypes.map((res) => {
                let result = _.get(ORDER_EXPLORE_TIMILINE(res.name), "[0].createdAt", "");
                return {
                  children: (
                    <div className={`${result ? "" : "grayscale"} !font-Poppins !text-[14px] capitalize pb-4`}>
                      <h1> order {res.name}</h1>
                      <h1 className="text-secondary_color !text-[12px]"> {result && moment(_.get(ORDER_EXPLORE_TIMILINE(res.name), "[0].createdAt", "")).format("DD-MMM-yyyy  hh : mm : A")}</h1>
                    </div>
                  ),
                  color: "red",
                };
              })}
            />
          ) : (
            <Timeline
              mode="left"
              items={OrderStatusTypes.slice(0, 5).map((res) => {
                let result = _.get(ORDER_EXPLORE_TIMILINE(res.name), "[0].createdAt", "");
                return {
                  children: (
                    <div className={`${result ? "" : "grayscale"} !font-Poppins !text-[14px] capitalize pb-4`}>
                      <h1> order {res.name}</h1>
                      <h1 className="text-secondary_color !text-[12px]"> {result && moment(_.get(ORDER_EXPLORE_TIMILINE(res.name), "[0].createdAt", "")).format("DD-MMM-yyyy  hh : mm : A")}</h1>
                    </div>
                  ),
                  color: result ? "green" : "gray",
                };
              })}
            />
          )}
        </div>
        <hr />
        <div className="h-fit pb-10 w-full  relativeflex flex-col gap-y-6 !font-Poppins ">
          <img src={ImageHelper.Logo} alt="" className="!w-[120px]" />
          <div className="flex justify-between  w-full">
            <div className="w-[50%] space-y-2">
              <h1 className="">Billing Address :</h1>
              <Addresscard border={false} show={false} res={_.get(orderDetail, "delivery_address", "")} />
            </div>
            <div className="w-[30%] space-y-2">
              <h1 className="">Payment Info :</h1>
              <div className="text-sm leading-loose space-y-2">
                <h1>Invoice No&nbsp;: {_.get(orderDetail, "invoice_no", "")}</h1>
                <h1>Due Date &nbsp;: {moment(_.get(orderDetail, "createdAt", "")).format("DD - mm - yyyy")}</h1>
                <h1>
                  Amount&nbsp;&nbsp;&nbsp;&nbsp;: <Symbol /> <GetAmount value={_.get(orderDetail, "final_total", "")} custom={customRate} />
                </h1>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-4 pt-10">
            <Table columns={billingColumn} dataSource={_.get(orderDetail, "products", "")} pagination={false} bordered size="small" />
            <div className="flex flex-col items-end gap-y-1 !text-sm ">
              <div className="center_row_div gap-x-2 border py-2 px-2">
                <div className="min-w-[100px]">Sub Total</div>
                <div className="border-l min-w-[100px] px-2 text-end">
                  <Symbol /> &nbsp; <GetAmount value={_.get(orderDetail, "sub_total", "")} custom={customRate} />
                </div>
              </div>
              <div className="center_row_div gap-x-2 border py-2 px-2">
                <div className="min-w-[100px]">SGST</div>
                <div className="border-l min-w-[100px] px-2 text-end">
                  <Symbol /> &nbsp; <GetAmount value={_.get(orderDetail, "SGST", "")} custom={customRate} />
                </div>
              </div>
              <div className="center_row_div gap-x-2 border py-2 px-2">
                <div className="min-w-[100px]">CGST</div>
                <div className="border-l min-w-[100px] px-2 text-end">
                  <Symbol /> &nbsp; <GetAmount value={_.get(orderDetail, "CGST", "")} custom={customRate} />
                </div>
              </div>
              <div className="center_row_div gap-x-2 border py-2 px-2">
                <div className="min-w-[100px]">TIP</div>
                <div className="border-l min-w-[100px] px-2 text-end">
                  <Symbol /> &nbsp; <GetAmount value={_.get(orderDetail, "tip_amount", "")} custom={customRate} />
                </div>
              </div>
            </div>
            <h1 className="!font-Poppins  text-end pt-4 px-1">
              Total :{" "}
              <span className="text-primary_color">
                <Symbol /> &nbsp; <GetAmount value={_.get(orderDetail, "final_total", "")} custom={customRate} />
              </span>
            </h1>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default page;
