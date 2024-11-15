"use client";
import React, { useEffect, useState } from "react";
import SeeMore from "../loadingscreens/SeeMore";
import { collectMyWishlist } from "@/helper/api_helper";
import _ from "lodash";
import ProductCard from "../component/Cards/ProductCard";
import CircleLoading from "../loadingscreens/CircleLoading";
import EmptyData from "../component/EmptyData";
import { MESSAGE_HANDLERS } from "@/helper/notification_helper";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function ShopCart() {
  const [search, setSearch] = useState();
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const cart_slice = useSelector((data) => data.cart_slice);
  const wishlist_slice = useSelector((data) => data.wishlist_slice);
  const userdata = useSelector((data) => data?.auth_slice);

  const router = useRouter();

  const fetchData = async () => {
    try {
      const result = await collectMyWishlist();
      setCartData(_.get(result, "data.data", []));
    } catch (err) {}
  };

  useEffect(() => {
    if (!_.get(userdata, "value.user_email", "")) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [_.get(cart_slice, "value", 0), _.get(wishlist_slice, "value", 0)]);

  const prepareProducts = () => {
    try {
      setLoading(true);
      let productData = cartData.map((res) => {
        _.get(res, "product[0]", []).variant = res.variant_id;
        return _.get(res, "product[0]", []);
      });
      setProducts(productData);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    prepareProducts();
  }, [cartData, _.get(cart_slice, "value", 0), _.get(wishlist_slice, "value", 0)]);

  return (
    <div className="min-h-screen w-full relative px-[8vw] pb-16">
      <div className="!w-full">
        {loading ? (
          <CircleLoading extra={true} />
        ) : _.isEmpty(products) ? (
          <EmptyData message={MESSAGE_HANDLERS.YOUR_WISHLIST_EMPTY} />
        ) : (
          <>
            <SeeMore text={"My favourite Items"} setSearch={setSearch} />
            <div className="product_card_grid">
              {products.map((res, index) => {
                return <ProductCard key={index} res={res} fetchData={fetchData} />;
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
