"use client";
import React, { useEffect, useState } from "react";
import SeeMore from "../loadingscreens/SeeMore";
import { addDeliveryAddress, createOrder, getMyDeliveryAddress, verifyCouponCode } from "@/helper/api_helper";
import Addresscard from "../component/Cards/Addresscard";
import { Button, Checkbox, Collapse, Divider, Empty, Form, Input, Popconfirm, Spin, Tag } from "antd";
import _ from "lodash";
import { CouponDetails, GET_FINAL_PRICE, GET_PERCENTAGE_PRICE, PaymentMethods, Tips } from "@/helper/shared_helper";
import ExtraView from "./ExtraView";
import { CUSTOM_ERROR_NOTIFICATION, ERROR_NOTIFICATION, ERROR_NOTIFICATION_SWAL, SUCCESS_NOTIFICATION, SUCCESS_NOTIFICATION_SWAL } from "@/helper/notification_helper";
import { useRouter } from "next/navigation";
import { IconHelper } from "@/helper/iconhelper";
import { useSelector } from "react-redux";
import GetSymbol from "../component/GetSymbol";
import GetAmount from "../component/GetAmount";
import useRazorpay from "react-razorpay";
import Link from "next/link";
import { formValidation } from "@/helper/form_validation";
import Swal from "sweetalert2";

const Checkout = () => {
  const [checkoutData, setCheckoutData] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedTip, setSelectedTip] = useState(_.get(Tips, "[0].id", 1));
  const [customTip, setCutomTip] = useState(false);
  const [currentPaymentType, setCurrentPaymentType] = useState(_.get(PaymentMethods, "[1].name"));
  const [currentCoupon, setCurrentCoupon] = useState(_.get(CouponDetails, "[1].name"));
  const [note, setNote] = useState("");
  const [aggreement, setAggreement] = useState(false);

  const [couponPercentage, setCouponPercentage] = useState("");

  const [Razorpay] = useRazorpay();

  const currency_slice = useSelector((data) => data.country_slice);
  const userData = useSelector((data) => data.auth_slice.value);

  const [currencyRate, setCurrencySlice] = useState(_.get(currency_slice, "value.value", ""));

  const router = useRouter();

  useEffect(() => {
    if (!_.get(userData, "user_email", "")) {
      router.push("/");
    }
  }, []);

  const getTipamount = (money = selectedTip) => {
    return Tips.filter((tip) => {
      return tip.id === money;
    });
  };

  useEffect(() => {
    setCurrencySlice(_.get(currency_slice, "value.value", ""));
  }, [_.get(currency_slice, "value.currency_code", "")]);

  const prepareCheckoutData = (searchParams) => {
    try {
      let data = JSON.parse(searchParams);
      let dataFormation = {
        checkout: data,
        subtotal: GET_FINAL_PRICE(data),
        Tip: GET_PERCENTAGE_PRICE(GET_FINAL_PRICE(data), _.get(getTipamount(selectedTip), "[0].value", "")),
        CGST: GET_PERCENTAGE_PRICE(GET_FINAL_PRICE(data), 9),
        SGST: GET_PERCENTAGE_PRICE(GET_FINAL_PRICE(data), 9),
        Final_total: Number(GET_FINAL_PRICE(data)) + Number(GET_PERCENTAGE_PRICE(GET_FINAL_PRICE(data), _.get(getTipamount(selectedTip), "[0].value", ""))) + Number(GET_PERCENTAGE_PRICE(GET_FINAL_PRICE(data), 9)) + Number(GET_PERCENTAGE_PRICE(GET_FINAL_PRICE(data), 9)),
      };
      setCheckoutData(dataFormation);
    } catch {}
  };

  useEffect(() => {
    let searchParams = window.localStorage.getItem("currentCheckout");
    prepareCheckoutData(searchParams);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getMyDeliveryAddress();
      setDeliveryAddress(_.get(result, "data.data", []));
      setSelectedAddress(_.get(result, "data.data[0]._id", []));
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectTip = (tip, special) => {
    try {
      let tips_amount;
      let total_amount;
      setSelectedTip(tip.id);
      if (tip.id === 7) {
        setCutomTip(true);
        tips_amount = Number(special);
      } else {
        setCutomTip(false);
        if (_.get(tip, "different", false)) {
          if (tip.id === 6 || tip.id == 8) {
            tips_amount = 0.0;
          }
        } else {
          setCutomTip(false);
          tips_amount = GET_PERCENTAGE_PRICE(checkoutData.subtotal, _.get(getTipamount(tip.id), "[0].value", ""));
        }
      }

      total_amount = checkoutData.subtotal + Number(isNaN(tips_amount) ? 0 : tips_amount) + checkoutData.CGST + checkoutData.SGST;
      setCheckoutData({
        ...checkoutData,
        Tip: Number(isNaN(tips_amount) ? 0 : tips_amount).toFixed(2),
        Final_total: Number(total_amount).toFixed(2),
      });
    } catch {}
  };

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      if (!aggreement) {
        CUSTOM_ERROR_NOTIFICATION("Please read and accept the terms and conditions to proceed with your order.");
        setLoading(false);
        return setAggreement("error");
      }

      const deliveryAddressData = deliveryAddress.filter((address) => {
        return address._id === selectedAddress;
      });

      let calculation = {};

      if (_.get(couponPercentage, "coupons_discount", "")) {
        calculation.final_total = GetCouponSplitup(_.get(checkoutData, "Final_total", ""))?.discountedAmount;
        calculation.couponDetails = couponPercentage;
      } else {
        calculation.final_total = Number(_.get(checkoutData, "Final_total", "")).toFixed(2);
      }

      const formdata = {
        delivery_address: deliveryAddressData[0],
        products: checkoutData.checkout,
        tip_amount: Number(_.get(checkoutData, "Tip", "")).toFixed(2),
        sub_total: Number(_.get(checkoutData, "subtotal", "")).toFixed(2),
        CGST: Number(_.get(checkoutData, "CGST", "")).toFixed(2),
        SGST: Number(_.get(checkoutData, "SGST", "")).toFixed(2),
        ...calculation,
        payment: currentPaymentType,
        note: note,
        invoice_no: `HMA${Date.now()}`,
        currencyRate: currencyRate,
        currencySymbol: _.get(currency_slice, "value.currency_symbol", ""),
        currencyCode: _.get(currency_slice, "value.currency_code", ""),
      };

      const result = await createOrder(formdata);

      let convertedPayment = Math.round(Number(Number(_.get(result, "data.data.final_total", 0)) * Number(_.get(result, "data.data.currencyRate", 0)) * 100));

      if (currentPaymentType === "Online Payment") {
        Swal.fire({ icon: "success", confirmButtonColor: "#ff7900", title: "Order created successfully", text: "Please complete the online payment as you've chosen this option. Important: Your transaction won't be processed until the payment is completed." }).then(() => {
          trigerPayment(result, convertedPayment);
        });
      } else {
        SUCCESS_NOTIFICATION(result);
        localStorage.removeItem("currentCheckout");
        router.push("/my-profile/my-order");
      }
    } catch (err) {
      console.log(err);
      ERROR_NOTIFICATION(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentFail = (data, convertedPayment) => {
    Swal.fire({ icon: "question", showCancelButton: true, confirmButtonColor: "#ff7900", confirmButtonText: "Retry", cancelButtonColor: "#77838b", cancelButtonText: "May be Later", title: "Order created successfully", text: "Please complete the online payment as you've chosen this option. Important: Your transaction won't be processed until the payment is completed." }).then((result) => {
      if (result.isConfirmed) {
        trigerPayment(data, convertedPayment);
      } else if (result.isDenied || result.isDismissed) {
        localStorage.removeItem("currentCheckout");
        router.push("/my-profile/my-order");
      }
    });
  };

  const trigerPayment = (result, convertedPayment) => {
    try {
      let paymentData = {
        key: process.env.RAZOR_PAY_KEY,
        amount: 1 * 100,
        currency: "INR",
        // currency: _.get(result, "data.data.currencyCode", ""),
        image: "https://homeaharaa.com/wp-content/uploads/2020/08/Homeaharaa-header-logo.png",
        name: "Homeaharaa",
        description: "Payment for Order #" + _.get(result, "data.data.invoice_no", ""),
        notes: {
          address: "Razorpay Corporate office",
        },
        theme: {
          color: "#FF7900",
        },
        prefill: {
          email: _.get(userData, "user_email", ""),
          contact: _.get(userData, "mobile_number", ""),
          name: _.get(userData, "user_name", ""),
        },
        handler: async (response) => {
          if (response.error) {
            handlePaymentFail(result, convertedPayment);
          } else {
            Swal.fire("Payment Successfully Completed", "", "success");
            localStorage.removeItem("currentCheckout");
            router.push("/my-profile/my-order");
          }
        },
        modal: {
          ondismiss: function () {
            handlePaymentFail(result, convertedPayment);
          },
        },
      };
      const trigerPaymentWindow = new Razorpay(paymentData);
      trigerPaymentWindow.open();
    } catch (err) {
      console.log(err);
    }
  };

  if (!loading && _.isEmpty(deliveryAddress)) {
    return (
      <div className="w-full min-h-[80vh] center_col_div">
        <Empty description="You Don't have any Delivery Address" />
        <Button
          className="!bg-secondary_color !text-white !border-transparent !w-fit !mt-4"
          onClick={() => {
            router.push("/my-profile/addresses?add=true");
          }}
        >
          Add New Delivery Address
        </Button>
      </div>
    );
  }

  const GetCouponSplitup = (amount) => {
    try {
      let discountPercentage = amount * (_.get(couponPercentage, "coupons_discount", "") / 100);

      let discountedAmount = amount - discountPercentage;

      return {
        discountPercentage: discountPercentage,
        discountedAmount: discountedAmount,
      };
    } catch {}
  };

  const handleVerifyCouponFinish = async (value) => {
    try {
      setLoading(true);
      const result = await verifyCouponCode(_.get(value, "coupon_code", ""));
      setCouponPercentage(_.get(result, "data.data[0]", ""));
      SUCCESS_NOTIFICATION_SWAL(result);
    } catch (err) {
      ERROR_NOTIFICATION_SWAL(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    try {
      setCouponPercentage("");
      setCurrentCoupon("I don't have a Coupon");
    } catch {}
  };

  return (
    <Spin spinning={loading}>
      <div className="min-h-screen bg-white w-full relative px-[8vw] pb-16 ">
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
        <SeeMore text="Checkout & Place Order" back={true} search={false} />
        <div className="flex flex-col  min-h-[500px]">
          <Collapse collapsible="icon" bordered defaultActiveKey={["1", "2", "3", "4", "5", "6"]} className="!bg-white">
            {/* delivery address */}
            <Collapse.Panel key={"1"} header={<h1 className="font-semibold uppercase text-primary_color">Select Delivery Address</h1>}>
              <div className="center_row_div justify-start flex-wrap">
                {deliveryAddress.map((res, index) => {
                  return (
                    <div className="w-[50%]" key={index}>
                      <Addresscard res={res} key={index} show={false} change={true} setSelectedAddress={setSelectedAddress} selectedAddress={selectedAddress} />
                    </div>
                  );
                })}
              </div>
            </Collapse.Panel>
            {/* tip's details */}
            <Collapse.Panel key={"2"} header={<h1 className="font-semibold capitalize text-primary_color">IF YOU WANT TO TIP US ?</h1>}>
              <div>
                <div className="center_row_div justify-start flex-wrap">
                  {Tips.map((res, index) => {
                    return (
                      <Popconfirm disabled={!(res.id === 8)} title="Are you sure you wish to remove the tip?" description="Every tip directly impacts the people who make your experience special." okText={<h1 className="text-secondary_color">Remove Tip</h1>} cancelText={<h1 className="text-primary_color">Keep Tip</h1>} onConfirm={() => handleSelectTip({ id: 8 })}>
                        <Tag onClick={() => res.id != 8 && handleSelectTip(res)} key={index} className={`!px-4 !py-2 ${selectedTip === res.id ? "!dull" : "!text-secondary_color !bg-white "} !font-Poppins  hover:bg-primary_color hover:text-white cursor-pointer`}>
                          {res.title}
                        </Tag>
                      </Popconfirm>
                    );
                  })}
                </div>
                {customTip && (
                  <Input
                    onChange={(e) => {
                      handleSelectTip({ id: 7 }, e.target.value);
                    }}
                    min={1}
                    type="number"
                    placeholder="Enter your tip amout"
                    className="antd_input mt-2"
                  />
                )}
              </div>
            </Collapse.Panel>
            {/* coupon's details */}
            <Collapse.Panel key={"3"} header={<h1 className="font-semibold capitalize text-primary_color">IF YOU WANT TO APPLY COUPON ?</h1>}>
              {_.get(couponPercentage, "coupons_discount", "") ? (
                <div onClick={handleRemoveCoupon} className="primary_button w-[200px]">
                  Remove Coupon
                </div>
              ) : currentCoupon === "I have a Coupon" ? (
                <Form className=" flex  items-center gap-x-2" layout="horizontal" onFinish={handleVerifyCouponFinish}>
                  <Form.Item name="coupon_code" rules={[formValidation("Enter Coupon Code")]}>
                    <Input placeholder="Enter your coupon code" className="antd_input" />
                  </Form.Item>
                  <Form.Item>
                    <Button htmlType="submit" className="antd_button !w-[100px] !capitalize !text-sm">
                      Apply
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      onClick={() => {
                        setCurrentCoupon("I don't have a Coupon");
                      }}
                      className="antd_button !bg-secondary_color !w-[100px] !capitalize !text-sm"
                    >
                      Cancel{" "}
                    </Button>
                  </Form.Item>
                </Form>
              ) : (
                <div className="center_row_div justify-start pt-4 gap-x-4">
                  {CouponDetails.map((res, index) => {
                    return (
                      <div
                        onClick={() => {
                          setCurrentCoupon(res.name);
                        }}
                        key={index}
                        className={`w-[400px] ${currentCoupon === res.name ? "dull" : "bg-white"} h-[50px] shadow cursor-pointer center_row_div  gap-x-4`}
                      >
                        <res.icon className="text-xl" /> {res.name}
                      </div>
                    );
                  })}
                </div>
              )}
            </Collapse.Panel>
            {/* Order Details */}
            <Collapse.Panel key={"4"} header={<h1 className="font-semibold capitalize text-primary_color">YOUR ORDER</h1>}>
              <div className="w-full min-h-[200px]  flex flex-col gap-y-1 border">
                <div className="w-full center_row_div justify-between items-start flex-wrap">
                  <div className="w-[70%] border-b flex flex-col gap-y-2">
                    <h1 className="heading">Product</h1>
                  </div>
                  <div className="w-[30%] border-b  border-l flex-col gap-y-2">
                    <h1 className="heading">Subtotal</h1>
                  </div>
                </div>
                {/* rest */}
                <div className="w-full flex flex-col gap-y-1 border-b">
                  {_.get(checkoutData, "checkout", [])?.map((res, index) => {
                    return (
                      <div className="flex items-center justify-between w-full   hover:bg-orange-50" key={index}>
                        <div className="w-[70%]  flex flex-col gap-y-2  text-secondary_color">
                          <div key={index} className="flex gap-x-2 items-center h-[50px] px-2 py-2">
                            <img src={_.get(res, "product_image[0].path", "") || _.get(res, "product_image[0].url", "")} width={0} height={0} alt={index} className="!w-[50px] !h-[50px] rounded p-2" />
                            <h1 className="font-medium capitalize text-secondary_color">{res.product_name}</h1>
                            <IconHelper.crossDelete />
                            <h1>{res.product_quantity}</h1>
                          </div>
                        </div>
                        <div className="w-[30%] border-l flex flex-col gap-y-2">
                          <div key={index} className="center_row_div w-full justify-start h-[50px] px-4 py-2">
                            <h1 key={index} className="font-semibold capitalize text-secondary_color">
                              <GetSymbol /> <GetAmount value={Number(res.product_price) * Number(res.product_quantity)} />
                            </h1>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* sub toatls */}

                <ExtraView property={"Subtotal"} value={_.get(checkoutData, "subtotal", "")} />
                <ExtraView property={`TIP (${_.get(getTipamount(selectedTip), "[0].title", "")})`} value={_.get(checkoutData, "Tip", "")} />
                <ExtraView property={"(9%) CGST"} value={_.get(checkoutData, "CGST", "")} />
                <ExtraView property={"(9%) SGST"} value={_.get(checkoutData, "SGST", "")} />
                {_.get(couponPercentage, "coupons_discount", "") ? (
                  <>
                    <ExtraView property={"Sub Total"} value={_.get(checkoutData, "Final_total", "")} color={true} />
                    <ExtraView property={`Coupon (${_.get(couponPercentage, "coupons_discount", "")}%)`} value={GetCouponSplitup(_.get(checkoutData, "Final_total", ""))?.discountPercentage} color={true} />
                    <ExtraView property={"Final Total"} value={GetCouponSplitup(_.get(checkoutData, "Final_total", ""))?.discountedAmount} color={true} />
                  </>
                ) : (
                  <ExtraView property={"Total"} value={_.get(checkoutData, "Final_total", "")} color={true} />
                )}
              </div>
            </Collapse.Panel>
            {/* payment Details */}
            <Collapse.Panel key={"5"} header={<h1 className="font-semibold uppercase text-primary_color">Payment Details</h1>}>
              <div className="center_row_div justify-start gap-x-4">
                {PaymentMethods.map((res, index) => {
                  return (
                    <div
                      onClick={() => {
                        setCurrentPaymentType(res.name);
                      }}
                      key={index}
                      className={`w-[400px] ${currentPaymentType === res.name ? "dull" : "bg-white"} h-[50px] shadow cursor-pointer center_row_div  gap-x-4`}
                    >
                      <res.icon className="text-xl" /> {res.name}
                    </div>
                  );
                })}
              </div>
            </Collapse.Panel>
            {/* order Notes */}
            <Collapse.Panel key={"6"} header={<h1 className="font-semibold uppercase text-primary_color">Order Notes (optional)</h1>}>
              {/* terms & condition */}
              <div className="center_col_div items-start gap-y-1 !text-sm !text-secondary_color">
                <Input.TextArea
                  onChange={(e) => {
                    setNote(e.target.value);
                  }}
                  className="antd_input mt-4 !w-[600px] !h-[100px]"
                  placeholder="Notes about your order, e.g. special notes for delivery."
                />
              </div>
            </Collapse.Panel>
          </Collapse>
          <div className="pt-2">
            <h1 className="!text-secondary_color">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.</h1>
            <div className="center_row_div gap-x-2 items-center justify-start pt-2">
              <Checkbox
                checked={aggreement === "error" ? false : aggreement}
                onChange={(e) => {
                  setAggreement(e.target.checked);
                }}
              />
              <h1 className={`${aggreement === "error" && "text-red-500 animate-bounce"}  capitalize`}>
                I have read and agree to the website{" "}
                <Link href="/terms" className="!text-primary_color">
                  Terms and Conditions
                </Link>
              </h1>
            </div>
            {/* place order */}
            <Button onClick={handlePlaceOrder} className="antd_button mt-4">
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Checkout;
