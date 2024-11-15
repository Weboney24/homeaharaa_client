"use client";
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import ProductViewTwo from "@/app/components/product-view-two";
import ProductDetail from "@/app/(pages)/products/product-detail";
import ProductAboutTab from "@/app/(pages)/products/product-about-tab";
import ArrivalItem from "@/app/components/arrival-item";
import { useSearchParams } from "next/navigation";
import { Breadcrumb, Image, Spin } from "antd";
import _, { uniqueId } from "lodash";
import { addProductToHistory, addToCart, addToWishlist, getFilterProduct, removeProduct, removeProductFromWishlist } from "@/helper/api_helper";
import DefaultHeading from "../component/DefaultHeading";
import ProductCard from "../component/Cards/ProductCard";
import { getIngredintFinalTotal, getProductPrice, PRODUCT_IMAGES, PRODUCT_IMAGES_DETAILS } from "@/helper/shared_helper";
import MyWishListProduct from "./MyWishListProduct";
import MycartProducts from "./MycartProducts";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_CART_COUNT } from "@/app/redux/cart_slice";
import { CUSTOM_ERROR_NOTIFICATION, ERROR_NOTIFICATION, SUCCESS_NOTIFICATION } from "@/helper/notification_helper";
import { UPDATE_WISHLIST_COUNT } from "@/app/redux/wishlist_slice";
import UserAction from "../component/UserAction";
import { current } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
import GetSymbol from "../component/GetSymbol";
import MyHistoryProduct from "./MyHistoryProduct";
import { uuid } from "uuidv4";

const ProductDetails = () => {
  const searchparams = useSearchParams();

  let product_id = searchparams.get("product_id");
  let category_id = searchparams.get("category_id");

  let router = useRouter();

  const cart_slice = useSelector((data) => data.cart_slice);
  const wishlist_slice = useSelector((data) => data.wishlist_slice);
  const userdata = useSelector((data) => data?.auth_slice);

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState([]);
  const [currentProductImage, setCurrentProductImage] = useState(null);
  const [currentVariant, setCurrentVariant] = useState("");
  const [dummy, setDummy] = useState(false);
  const [currentVariant_child, setCurrentVariant_child] = useState();
  const [orderData, setOrderData] = useState([]);
  const [compositeProductData, setCompositeProduct] = useState([]);

  let params = JSON.stringify({
    category_id: category_id,
  });

  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getFilterProduct(params);
      let current_product = _.get(result, "data.data", []).filter((res) => {
        return res._id === product_id;
      });

      if (_.get(current_product, "[0].product_type", "") === "composite_product") {
        const mapIngredient = (ingredient) => {
          return {
            units: _.get(ingredient, "weights_and_prices", []).map((data) => {
              const weight = ingredient.weight_details.find((detail) => detail?._id === data?.weight_id) || {};
              return {
                unit: weight.weight_name,
                price: _.get(data, "price", ""),
                name: _.get(ingredient, "ingredient_name", ""),
                active: false,
                sub_uid: uuid(),
              };
            }),
            current_unit: _.get(ingredient, "weights_and_prices", []).length
              ? {
                  unit: _.get(ingredient, "weight_details[0].weight_name", ""),
                  price: _.get(ingredient.weights_and_prices[0], "price", ""),
                  name: _.get(ingredient, "ingredient_name", ""),
                  active: false,
                  sub_uid: uuid(),
                }
              : {},
            quantity: 1,
            uid: uuid(),
          };
        };

        const compositeData = {
          main_ingredient: _.get(current_product, "[0].main_ingredients_details", []).map(mapIngredient),
          additional_ingredient: _.get(current_product, "[0].sub_ingredients_details", []).map(mapIngredient),
        };

        setCompositeProduct(compositeData);
      }

      let rest = _.get(result, "data.data", []).filter((res) => {
        return res._id != product_id;
      });
      setRelatedProducts(rest);
      setCurrentProduct(current_product);
      setCurrentVariant(currentVariant || _.get(current_product, "[0].variable_products[0].sku", []));
      setDummy(!dummy);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const TrigerToAddHistory = async () => {
    try {
      let formData = {
        product_id: product_id,
      };
      await addProductToHistory(formData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (_.get(userdata, "value.user_name", "")) {
      TrigerToAddHistory();
    }
    setCurrentVariant_child();
  }, [category_id, product_id, _.get(userdata, "value.user_name", "")]);

  const prepareOrderDatas = () => {
    try {
      let dummyCarts = currentProduct.map((res) => {
        return {
          id: res._id,
          product_id: _.get(res, "_id", ""),
          product_name: _.get(res, "product_name", ""),
          product_price: getProductPrice(res, currentVariant),
          product_quantity: 1,
          total_price: getProductPrice(res, currentVariant),
          product_image: PRODUCT_IMAGES_DETAILS(res, currentVariant),
          variant_id: currentVariant,
        };
      });
      setOrderData(dummyCarts);
    } catch {}
  };

  useEffect(() => {
    prepareOrderDatas();
  }, [currentProduct]);

  const handleProceedToCheckout = () => {
    try {
      if (!_.get(userData, "value._id", "")) {
        return router.push("/login");
      }
      if (_.get(currentProduct, "[0].product_type", "") === "composite_product") {
        orderData[0].ingredients = {
          main_ingredient: _.get(compositeProductData, "main_ingredient", []),
          additional_ingredient: _.get(compositeProductData, "additional_ingredient", []),
        };
        orderData[0].total_price = Number(orderData[0].product_price) + Number(getIngredintFinalTotal(compositeProductData));
      }
      localStorage.setItem("currentCheckout", JSON.stringify(orderData));
      router.push(`/checkout`);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [_.get(cart_slice, "value", 0), _.get(wishlist_slice, "value", 0), category_id, product_id]);

  useEffect(() => {
    const product_image = PRODUCT_IMAGES(currentProduct, currentVariant);
    let current_image = _.get(currentProduct, "[0].product_type", "") === "variable_product" ? _.get(product_image, "[0].path", "") : _.get(product_image, "[0].url", "");
    setCurrentProductImage(current_image);
  }, [dummy, category_id, product_id]);

  //user actions

  const userData = useSelector((data) => data.auth_slice);

  let res = _.get(currentProduct, "[0]", {});

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = _.get(currentProduct, "[0].product_name", "");
  }, [dummy, category_id, product_id]);

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

  let collectCarts = _.get(res, "cart", []).map((res) => {
    return res.variant_id;
  });

  let collectWishlist = _.get(res, "wishlist", []).map((res) => {
    return res.variant_id;
  });

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
        if (collectCarts.includes(currentVariant)) {
          payload.variant_id = currentVariant;
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
        formData.variant_id = currentVariant;
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
        if (collectWishlist.includes(currentVariant)) {
          payload.variant_id = currentVariant;
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
        formData.variant_id = currentVariant;
      }
      const result = await addToWishlist(formData);
      dispatch(UPDATE_WISHLIST_COUNT(_.get(result, "data.data[0].count", "")));
      SUCCESS_NOTIFICATION(result);
      fetchData();
    } catch (err) {
      console.log(err);
      ERROR_NOTIFICATION(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Suspense>
      <Spin spinning={loading}>
        <div className="px-[8vw] py-10 min-h-screen !font-Poppins">
          <Breadcrumb
            items={[
              {
                title: "Home",
                href: "/",
              },
              {
                title: _.get(res, "product_name", ""),
              },
            ]}
            separator="<"
          />

          {/* current product details */}
          <div className="w-full center_row_div pt-12 items-start gap-x-2">
            <div className="w-[60%] h-full center_row_div justify-start items-start gap-x-2">
              <div className="flex sticky top-20 flex-col gap-y-2 w-[110px] h-full">
                {PRODUCT_IMAGES(currentProduct, currentVariant)?.map((res, index) => {
                  return (
                    <img
                      onClick={() => {
                        setCurrentProductImage(res.url || res.path);
                      }}
                      width={0}
                      height={0}
                      key={index}
                      className="w-[100px] h-[100px] object-cover p-1 cursor-pointer bg-white shadow"
                      src={res.url || res.path}
                      alt="Product Image"
                    />
                  );
                })}
              </div>
              <div className="w-[100%]  h-[500px] !shadow !overflow-hidden group center_row_div relative">
                <img src={currentProductImage} alt="current image" className="!w-full !h-full !object-cover p-1" />
                {_.get(currentProduct, "[0].product_type", {}) === "variable_product" ? currentVariant_child && <UserAction loading={loading} userData={userData} handleAddToWishlist={handleAddToWishlist} handleAddToCart={handleAddToCart} res={_.get(currentProduct, "[0]", {})} from="product_details" variant_id={currentVariant_child} /> : <UserAction userData={userData} loading={loading} handleAddToWishlist={handleAddToWishlist} handleAddToCart={handleAddToCart} res={_.get(currentProduct, "[0]", {})} from="product_details" />}
              </div>
            </div>
            <div className="w-[40%] h-full pl-4 -pt-2  sticky top-10">
              <ProductDetail setCompositeProduct={setCompositeProduct} compositeProductData={compositeProductData} orderData={orderData} setOrderData={setOrderData} category_id={category_id} product_id={product_id} handleProceedToCheckout={handleProceedToCheckout} product={currentProduct} variant_id={currentVariant} setCurrentParentVariant={setCurrentVariant} setCurrentProductImage={setCurrentProductImage} currentVariant_child={currentVariant_child} setCurrentVariant_child={setCurrentVariant_child} />
            </div>
          </div>
          <ProductAboutTab product={currentProduct} variant_id={currentVariant} category_id={category_id} />
          {/* related Products */}
          <div className="pt-10">
            <DefaultHeading to={false} title={"Related Products"} subtitle={"You Might Also Like"} />
            <div className="product_card_grid">
              {relatedProducts.map((res, index) => {
                return <ProductCard key={index} res={res} fetchData={fetchData} />;
              })}
            </div>
          </div>
          {/* rest */}
          <div className="pt-10"></div>
          <MyWishListProduct />
          <div className="pt-10"></div>
          <MycartProducts />
          <div className="pt-10"></div>
          <MyHistoryProduct />
        </div>
      </Spin>
    </Suspense>
  );
};

export default ProductDetails;
