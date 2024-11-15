"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Counter from "../../components/counter";
import SeeMore from "../loadingscreens/SeeMore";
import { collectMyCarts, removeProduct } from "@/helper/api_helper";
import _ from "lodash";
import { GET_FINAL_PRICE, getProductPrice, PRODUCT_IMAGES } from "@/helper/shared_helper";
import { ERROR_NOTIFICATION, MESSAGE_HANDLERS, SUCCESS_NOTIFICATION } from "@/helper/notification_helper";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_CART_COUNT } from "@/app/redux/cart_slice";
import EmptyData from "../component/EmptyData";
import { useRouter } from "next/navigation";
import GetSymbol from "../component/GetSymbol";
import GetAmount from "../component/GetAmount";

export default function ShopCart() {
  const [search, setSearch] = useState();
  const [cartData, setCartData] = useState([]);

  const [orderData, setOrderData] = useState([]);
  const [dummy, setDummy] = useState(false);

  const dispatch = useDispatch();

  const cart_slice = useSelector((data) => data.cart_slice);
  const wishlist_slice = useSelector((data) => data.wishlist_slice);
  const currency_slice = useSelector((data) => data.country_slice);
  const userdata = useSelector((data) => data?.auth_slice);

  const router = useRouter();

  const fetchData = async () => {
    try {
      const result = await collectMyCarts();
      setCartData(_.get(result, "data.data", []));
    } catch (err) {}
  };

  useEffect(() => {
    if (!_.get(userdata, "value.user_email", "")) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    document.title = "Shopping Cart";
    fetchData();
  }, [_.get(cart_slice, "value", 0), _.get(wishlist_slice, "value", 0)]);

  const removeProductFromCart = async (res) => {
    try {
      let payload = {
        product_id: res.product_id,
        variant_id: res.variant_id,
      };
      const result = await removeProduct(JSON.stringify(payload));
      dispatch(UPDATE_CART_COUNT(_.get(result, "data.data[0].count", "")));
      SUCCESS_NOTIFICATION(result);
      fetchData();
    } catch (err) {
      ERROR_NOTIFICATION(err);
    }
  };

  const prepareOrderDatas = () => {
    try {
      let dummyCarts = cartData.map((res) => {
        return {
          id: res._id,
          product_id: _.get(res, "product[0]._id", ""),
          product_name: _.get(res, "product[0].product_name", ""),
          product_price: getProductPrice(_.get(res, "product[0]", ""), res.variant_id),
          product_quantity: 1,
          total_price: getProductPrice(_.get(res, "product[0]", ""), res.variant_id),
          product_image: PRODUCT_IMAGES(_.get(res, "product", []), res.variant_id),
          variant_id: _.get(res, "variant_id", ""),
        };
      });
      setOrderData(dummyCarts);
    } catch {}
  };

  useEffect(() => {
    prepareOrderDatas();
  }, [cartData, _.get(currency_slice, "value.currency_code", "")]);

  const hanldeIncrement = (id, variant) => {
    let newCount = orderData;
    newCount.map((res) => {
      if (variant ? res.variant_id === variant : res.product_id === id) {
        res.product_quantity++;
        res.total_price = res.product_price * res.product_quantity;
      }
      return res;
    });
    setOrderData(newCount);
    setDummy(!dummy);
  };

  const handleDecrement = (id, variant) => {
    let newCount = orderData;
    newCount.map((res) => {
      if ((variant ? res.variant_id === variant : res.product_id === id) && res.product_quantity > 1) {
        res.product_quantity--;
        res.total_price = res.product_price * res.product_quantity;
      }
      return res;
    });
    setOrderData(newCount);
    setDummy(!dummy);
  };

  const handleProceedToCheckout = () => {
    try {
      localStorage.setItem("currentCheckout", JSON.stringify(orderData));
      router.push(`/checkout`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen w-full relative px-[8vw] pb-16 !font-Poppins">
      {_.isEmpty(orderData) ? (
        <EmptyData message={MESSAGE_HANDLERS.EMPTY_CART} />
      ) : (
        <>
          <SeeMore text={"Shopping cart"} setSearch={setSearch} />
          <table className="w-full text-start">
            <thead className="text-sm uppercase bg-slate-50 dark:bg-slate-800">
              <tr>
                <th scope="col" className="p-4 w-4"></th>
                <th scope="col" className="text-start p-4 min-w-[220px]">
                  Product
                </th>
                <th scope="col" className="p-4 w-56 min-w-[100px]">
                  Price
                </th>
                <th scope="col" className="p-4 w-56 min-w-[220px]">
                  Qty
                </th>
                <th scope="col" className="p-4 w-56 min-w-[100px] text-end">
                  Total(
                  <GetSymbol />)
                </th>
              </tr>
            </thead>
            <tbody>
              {orderData.map((res, index) => {
                return (
                  <tr className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-gray-800" key={index}>
                    <td className="p-4">
                      <div
                        onClick={() => {
                          removeProductFromCart(res);
                        }}
                      >
                        <i className="mdi mdi-window-close text-primary_color cursor-pointer"></i>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="flex items-center">
                        <Image src={_.get(res, "product_image[0].url", "") || _.get(res, "product_image[0].path", "")} width={48} height={62} className="rounded shadow dark:shadow-gray-800 w-12" alt="" />
                        <span className="ms-3">
                          <span className="block font-semibold capitalize">{_.get(res, "product_name", "")}</span>
                        </span>
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <GetSymbol />
                      &nbsp; <GetAmount value={_.get(res, "product_price", "")} />
                    </td>
                    <td className="p-4 text-center">
                      <Counter qtn={_.get(res, "product_quantity", "")} product_id={_.get(res, "product_id", "")} variant_id={_.get(res, "variant_id", "")} hanldeIncrement={hanldeIncrement} handleDecrement={handleDecrement} />
                    </td>
                    <td className="p-4  text-end">
                      <GetSymbol />
                      &nbsp; <GetAmount value={Number(_.get(res, "product_price", "") * _.get(res, "product_quantity", ""))} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="grid lg:grid-cols-12 md:grid-cols-2 grid-cols-1 mt-6 gap-6">
            <div className="lg:col-span-9 md:order-1 order-3">
              <div className="space-x-1">
                <div onClick={handleProceedToCheckout} className="py-2 px-5 cursor-pointer inline-block font-semibold tracking-wide align-middle text-base text-center bg-orange-500 text-white rounded-md mt-2">
                  Proceed to checkout
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 md:order-2 order-1">
              <ul className="list-none shadow dark:shadow-gray-800 rounded-md">
                <li className="flex justify-between p-4">
                  <span className="font-semibold text-lg">Subtotal :</span>
                  <span className="font-semibold">
                    <GetSymbol /> <GetAmount value={GET_FINAL_PRICE(orderData)} />
                  </span>
                </li>
                <li className="flex justify-between p-4 border-t border-gray-100 dark:border-gray-800">
                  <span className="font-semibold text-lg">Shipping :</span>
                  <span className="text-slate-400 font-medium">Free Shipping</span>
                </li>
                <li className="flex justify-between font-semibold p-4 border-t border-gray-200 dark:border-gray-600">
                  <span className="font-semibold text-lg">Total :</span>
                  <span className="font-semibold text-primary_color">
                    <GetSymbol /> <GetAmount value={GET_FINAL_PRICE(orderData)} />
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
