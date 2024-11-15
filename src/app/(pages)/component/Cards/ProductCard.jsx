import { getImageUrl, getPriceSymbol, getProductPrice } from "@/helper/shared_helper";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiHeart, FiEye, FiBookmark } from "../../../assets/icons/vander";
import { IconHelper } from "@/helper/iconhelper";
import { CUSTOM_ERROR_NOTIFICATION, ERROR_NOTIFICATION, MESSAGE_HANDLERS, SUCCESS_NOTIFICATION } from "@/helper/notification_helper";
import { addToCart, addToWishlist, removeProduct, removeProductFromHistory, removeProductFromWishlist } from "@/helper/api_helper";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_CART_COUNT } from "@/app/redux/cart_slice";
import { Card, Rate, Spin, Tooltip } from "antd";
import { UPDATE_WISHLIST_COUNT } from "@/app/redux/wishlist_slice";
import UserAction from "../UserAction";
import GetSymbol from "../GetSymbol";
import GetAmount from "../GetAmount";
import { useRouter } from "next/navigation";

const ProductCard = (props) => {
  const { res, setSearch, fetchData, searchEnabled, list = false, from } = props;

  const userData = useSelector((data) => data.auth_slice);

  const router = useRouter();

  // currency
  let currency_slice = useSelector((data) => data.country_slice);

  const [loading, setLoading] = useState(false);
  const [currencyRate, setCurrencySlice] = useState(_.get(currency_slice, "value.value", ""));

  const dispatch = useDispatch();

  let collectCarts = _.get(res, "cart", []).map((res) => {
    return res.variant_id;
  });

  let collectWishlist = _.get(res, "wishlist", []).map((res) => {
    return res.variant_id;
  });

  useEffect(() => {
    setCurrencySlice(_.get(currency_slice, "value.value", ""));
  }, [_.get(currency_slice, "value.currency_code", "")]);

  const removeProductFromCart = async (id) => {
    try {
      const result = await removeProduct(id);
      dispatch(UPDATE_CART_COUNT(_.get(result, "data.data[0].count", "")));
      SUCCESS_NOTIFICATION(result);
      fetchData();
    } catch (err) {
      ERROR_NOTIFICATION(err);
    }
  };

  const removeProductsFromWishlist = async (id) => {
    try {
      const result = await removeProductFromWishlist(id);
      dispatch(UPDATE_WISHLIST_COUNT(_.get(result, "data.data[0].count", "")));
      SUCCESS_NOTIFICATION(result);
      fetchData();
    } catch (err) {
      ERROR_NOTIFICATION(err);
    }
  };

  const handleAddToCart = async (values) => {
    try {
      setLoading(true);
      if (!_.get(userData, "value._id", "")) {
        return router.push("/login");
      }

      let payload = {
        product_id: res._id,
      };

      if (values.product_type === "variable_product") {
        if (collectCarts.includes(res.variant || _.get(values, "variable_products[0].sku", ""))) {
          payload.variant_id = res.variant || _.get(values, "variable_products[0].sku", "");
          return removeProductFromCart(JSON.stringify(payload));
        }
      } else {
        if (_.get(res, "cart.[0].product_id", "") === res._id) {
          return removeProductFromCart(JSON.stringify(payload));
        }
      }

      let formData = {
        product_id: _.get(values, "_id", ""),
      };

      if (values.product_type === "variable_product") {
        formData.variant_id = res.variant || _.get(values, "variable_products[0].sku", "");
      }
      const result = await addToCart(formData);
      dispatch(UPDATE_CART_COUNT(_.get(result, "data.data[0].count", "")));
      SUCCESS_NOTIFICATION(result);
      fetchData();
    } catch (err) {
      console.log(err);
      ERROR_NOTIFICATION(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWishlist = async (values) => {
    try {
      setLoading(true);
      if (!_.get(userData, "value._id", "")) {
        return router.push("/login");
      }
      let payload = {
        product_id: res._id,
      };
      if (values.product_type === "variable_product") {
        if (collectWishlist.includes(res.variant || _.get(values, "variable_products[0].sku", ""))) {
          payload.variant_id = res.variant || _.get(values, "variable_products[0].sku", "");
          return removeProductsFromWishlist(JSON.stringify(payload));
        }
      } else {
        if (_.get(res, "wishlist.[0].product_id", "") === res._id) {
          return removeProductsFromWishlist(JSON.stringify(payload));
        }
      }
      let formData = {
        product_id: _.get(values, "_id", ""),
      };
      if (values.product_type === "variable_product") {
        formData.variant_id = res.variant || _.get(values, "variable_products[0].sku", "");
      }
      const result = await addToWishlist(formData);
      dispatch(UPDATE_WISHLIST_COUNT(_.get(result, "data.data[0].count", "")));
      SUCCESS_NOTIFICATION(result);
      fetchData();
    } catch (err) {
      ERROR_NOTIFICATION(err);
    } finally {
      setLoading(false);
    }
  };

  const prepareMultipleCurrency = () => {
    try {
      let splitup = String(getProductPrice(res, _.get(res, "variant", "")))?.split("-");

      if (splitup?.length > 1) {
        return (
          <>
            <GetSymbol /> <GetAmount value={_.get(splitup, "[0]", 1)} /> - <GetSymbol /> <GetAmount value={_.get(splitup, "[1]", 1)} />
          </>
        );
      } else {
        return (
          <>
            <GetSymbol /> <GetAmount value={_.get(splitup, "[0]", 1)} />
          </>
        );
      }
    } catch {}
  };

  const handleRemoveFromHistory = async (id) => {
    try {
      setLoading(true);
      const result = await removeProductFromHistory(id);
      SUCCESS_NOTIFICATION(result);
      fetchData();
    } catch (err) {
      console.log(err);
      ERROR_NOTIFICATION(err);
    } finally {
      setLoading(false);
    }
  };

  return list ? (
    <div className="w-full h-[200px] shadow group  shadow-[#0000001e] center_row_div rounded-2xl justify-between px-10">
      <div className="flex gap-x-6 relative">
        <img src={getImageUrl(res)} width={0} height={0} className="!w-[150px] duration-500 !object-contain h-[150px]  rounded-2xl !mix-blend-lighten" alt="" />
        <div>
          <p className="text-black capitalize font-semibold line-clamp-1">{res.product_name}</p>
          <p className="text-primary_color font-medium">{prepareMultipleCurrency()}</p>

          <div className="pt-2">
            <p className="!font-dm_sans text-sm line-clamp-3">{res.product_description}</p>
            <Link
              href={{
                pathname: "/products",
                query: {
                  product_id: res?._id,
                  category_id: res?.product_category_type,
                },
              }}
              onClick={() => {
                searchEnabled && setSearch(false);
              }}
              className="font-medium text-secondary_color text-[12px] cursor-pointer"
            >
              Read more
            </Link>
            <div className="absolute bottom-0 right-0">
              <UserAction row={true} searchEnabled={searchEnabled} view={"list"} setSearch={setSearch} loading={loading} product_id={res?._id} category_id={res?.product_category_type} userData={userData} handleAddToWishlist={handleAddToWishlist} handleAddToCart={handleAddToCart} res={res} variant_id={res?.variant} />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="group !select-none !bg-white">
      <div className="!h-[400px] !border-transparent !shadow-none">
        <div className="relative group">
          <div className="!h-[300px] w-full shadow rounded overflow-hidden">
            <img src={getImageUrl(res)} className="!h-full  group-hover:scale-125 transition-all duration-500 !w-full !object-cover" alt="" />
          </div>
          <UserAction from={from} searchEnabled={searchEnabled} setSearch={setSearch} loading={loading} product_id={res?._id} category_id={res?.product_category_type} userData={userData} handleAddToWishlist={handleAddToWishlist} handleRemoveFromHistory={handleRemoveFromHistory} handleAddToCart={handleAddToCart} res={res} variant_id={res?.variant} />
        </div>
        <div className="py-2 px-2 shadow">
          <div className="capitalize font-medium hover:text-primary_color cursor-pointer line-clamp-1 overflow-hidden text-ellipsis">{res.product_name}</div>
          <Rate value={Math.ceil(Math.random() * 2) + 3} disabled allowHalf className="!text-sm" />
          <p className="!font-bold !text-primary_color">{prepareMultipleCurrency()}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
