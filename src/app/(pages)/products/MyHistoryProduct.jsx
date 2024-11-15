"use client";
import React, { useEffect, useState } from "react";
import SeeMore from "../loadingscreens/SeeMore";
import { collectMyCarts, collectMyHistory, collectMyWishlist } from "@/helper/api_helper";
import _ from "lodash";
import ProductCard from "../component/Cards/ProductCard";
import CircleLoading from "../loadingscreens/CircleLoading";
import EmptyData from "../component/EmptyData";
import { MESSAGE_HANDLERS } from "@/helper/notification_helper";
import DefaultHeading from "../component/DefaultHeading";
import { useSelector } from "react-redux";

const MyHistoryProduct = () => {
  const [search, setSearch] = useState();
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const cart_slice = useSelector((data) => data.cart_slice);
  const wishlist_slice = useSelector((data) => data.wishlist_slice);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await collectMyHistory();
      setHistoryData(_.get(result, "data.data", []));
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [_.get(cart_slice, "value", 0), _.get(wishlist_slice, "value", 0)]);

  const prepareProducts = () => {
    try {
      setLoading(true);
      let productData = historyData.map((res) => {
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
  }, [historyData, _.get(cart_slice, "value", 0), _.get(wishlist_slice, "value", 0)]);

  return (
    <div className="pt-2">
      <div className="!w-full">
        {loading ? (
          <CircleLoading extra={true} />
        ) : _.isEmpty(products) ? (
          ""
        ) : (
          <>
            <DefaultHeading to={"/more/latest-visited"} title={"Recently Viewed Products"} subtitle={"Items You’ve Checked Out Recently"} />
            <div className="product_card_grid">
              {products?.slice(0, 8).map((res, index) => {
                return <ProductCard from="history" key={index} res={res} fetchData={fetchData} />;
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyHistoryProduct;
