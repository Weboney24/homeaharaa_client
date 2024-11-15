"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getIngredintFinalTotal, getProductPrice, getProductWeight, SOCIAL_SHARING } from "@/helper/shared_helper";
import { CUSTOM_ERROR_NOTIFICATION, ERROR_NOTIFICATION } from "@/helper/notification_helper";
import { Checkbox, Drawer, Rate, Select, Switch, Tooltip } from "antd";
import { WhatsappShareButton, WhatsappIcon, EmailShareButton, LinkedinShareButton, LinkedinIcon, FacebookShareButton, FacebookIcon, TwitterShareButton, TelegramShareButton, TelegramIcon } from "react-share";
import { RiTwitterXFill } from "react-icons/ri";
import { MdOutlineMailOutline } from "react-icons/md";
import { CUSTOMER_URL } from "@/helper/api_helper";
import GetSymbol from "../component/GetSymbol";
import { useSelector } from "react-redux";
import GetAmount from "../component/GetAmount";
import _ from "lodash";

export default function ProductDetail(props) {
  const { product, orderData, setOrderData, variant_id, setCurrentParentVariant, setCurrentProductImage, currentVariant_child, setCurrentVariant_child, handleProceedToCheckout, category_id, product_id, compositeProductData, setCompositeProduct } = props;

  let [count, setCount] = useState(1);

  let currency_slice = useSelector((data) => data.country_slice);

  const [currencyRate, setCurrencySlice] = useState(_.get(currency_slice, "value.value", ""));

  const [totalPrice, setTotalPrice] = useState(getProductPrice(_.get(product, "[0]", ""), currentVariant_child, currencyRate));

  const [ingredientModal, setIngredientModal] = useState(false);

  const checkVariantStatus = () => {
    CUSTOM_ERROR_NOTIFICATION("Please select a Product Weights");
  };

  const checkProductType = () => {
    return !currentVariant_child && _.get(product, "[0].product_type", "") === "variable_product";
  };

  const increments = () => {
    if (checkProductType()) {
      return checkVariantStatus();
    }

    let newCount = orderData;
    newCount.map((res) => {
      res.product_quantity++;
      res.total_price = res.product_price * res.product_quantity;
      return res;
    });
    setOrderData(newCount);
    setCount(count + 1);
  };

  const decrements = () => {
    if (checkProductType()) {
      return checkVariantStatus();
    }
    if (count > 1) {
      let newCount = orderData;
      newCount.map((res) => {
        res.product_quantity--;
        res.total_price = res.product_price * res.product_quantity;
        return res;
      });
      setOrderData(newCount);
      setCount(count - 1);
    }
  };

  const handleVariantChange = (data) => {
    if (_.get(product, "[0].product_type", "") === "variable_product") {
      if (data.variant_id === currentVariant_child) {
        return setCurrentVariant_child("");
      }

      setCurrentParentVariant(data.variant_id);
      setCurrentVariant_child(data.variant_id);
      setCurrentProductImage(data.product_image);
    }
  };

  useEffect(() => {
    let price = Number(getProductPrice(_.get(product, "[0]", ""), currentVariant_child));
    setTotalPrice(price * count);
  }, [count, currentVariant_child]);

  const prepareMultipleCurrency = () => {
    try {
      let splitup = String(getProductPrice(_.get(product, "[0]", ""), currentVariant_child))?.split("-");

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
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setCurrencySlice(_.get(currency_slice, "value.value", ""));
  }, [_.get(currency_slice, "value.currency_code", "")]);

  const display = () => {
    if (_.get(product, "[0].product_type", "") === "variable_product") {
      return count > 1 && currentVariant_child;
    } else {
      return count > 1;
    }
  };

  let path = encodeURI(`${CUSTOMER_URL}products?product_id=${product_id}&category_id=${category_id}`);
  let product_name = _.get(product, "[0].product_name", "");
  let product_description = _.get(product, "[0].product_description", "");

  const ShareIT = [
    {
      id: 1,
      name: "Whatsapp",
      com: (
        <WhatsappShareButton title={`HomeAharaa - ${product_name}`} url={path}>
          <WhatsappIcon className="!size-[20px]" />
        </WhatsappShareButton>
      ),
    },
    {
      id: 2,
      name: "Email",
      com: (
        <EmailShareButton subject={`HomeAharaa - ${product_name}`} body={path}>
          <MdOutlineMailOutline className="!size-[20px]  !text-white p-1 bg-orange-500" />
        </EmailShareButton>
      ),
    },
    {
      id: 3,
      name: "LinkedIn",
      com: (
        <LinkedinShareButton title={`HomeAharaa - ${product_name}`} summary={product_description} source={path} url={path}>
          <LinkedinIcon className="!size-[20px]" />
        </LinkedinShareButton>
      ),
    },
    {
      id: 4,
      name: "Facebook",
      com: (
        <FacebookShareButton quote={`HomeAharaa - ${product_name}`} url={path}>
          <FacebookIcon className="!size-[20px]" />
        </FacebookShareButton>
      ),
    },
    {
      id: 5,
      name: "Twitter",
      com: (
        <TwitterShareButton title={`HomeAharaa - ${product_name}`} url={path}>
          <RiTwitterXFill className="!size-[20px] !text-white p-1 bg-pink-500" />
        </TwitterShareButton>
      ),
    },
    {
      id: 6,
      name: "Telegram",
      com: (
        <TelegramShareButton title={`HomeAharaa - ${product_name}`} url={path}>
          <TelegramIcon className="!size-[20px]" />
        </TelegramShareButton>
      ),
    },
  ];

  const handleDropIngredinentChnage = (main_id, sub_id, ingredient) => {
    try {
      let newData = _.get(compositeProductData, `${ingredient}`, []);
      let current_dropdown = _.get(compositeProductData, `${ingredient}`, []).find((res) => res.uid === main_id);
      let modified_value = current_dropdown.units.find((unit) => {
        return unit.sub_uid === sub_id;
      });

      newData.map((res) => {
        return res.uid === main_id ? (res.current_unit = modified_value) : res;
      });
      if (ingredient === "main_ingredient") {
        setCompositeProduct((prev) => ({
          ...prev,
          main_ingredient: newData,
        }));
      } else {
        setCompositeProduct((prev) => ({
          ...prev,
          additional_ingredient: newData,
        }));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDropIngredinentCount = (main_id, count, ingredient) => {
    try {
      let newData = _.get(compositeProductData, `${ingredient}`, []);

      newData.map((res) => {
        return res.uid === main_id ? (res.quantity = count) : res;
      });
      if (ingredient === "main_ingredient") {
        setCompositeProduct((prev) => ({
          ...prev,
          main_ingredient: newData,
        }));
      } else {
        setCompositeProduct((prev) => ({
          ...prev,
          additional_ingredient: newData,
        }));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDropIngredientActiveChange = (main_id, e) => {
    try {
      let newData = _.get(compositeProductData, "additional_ingredient", []);

      newData.map((res) => {
        return res.uid === main_id ? (res.active = e.target.checked) : res;
      });
      setCompositeProduct((prev) => ({
        ...prev,
        additional_ingredient: newData,
      }));
    } catch {}
  };

  console.log(compositeProductData, "compositeProductData");

  return (
    <div className="flex flex-col gap-y-2">
      <h5 className="text-2xl font-semibold uppercase">{_.get(product, "[0].product_name", "")}</h5>
      <p className="text-secondary_color text-[10px]">SKU : {currentVariant_child || "N/A"} </p>
      <div className="center_row_div gap-x-2 justify-start py-3">
        {ShareIT.map((res, index) => {
          return (
            <Tooltip title={res.name} key={index}>
              <div key={index} className="cursor-pointer group size-[30px]  border shadow-inner center_row_div ">
                {res.com}
              </div>
            </Tooltip>
          );
        })}
      </div>
      <div className="grayscale center_row_div justify-start gap-x-2 text-sm">
        <Rate value={5} className="!text-[10px]" />
        <Link href={`${path}#review`} className="cursor-pointer">
          Write Review
        </Link>
      </div>
      <div className="mt-2">
        <h5 className="text-[12px]   uppercase font-dm_sans">Overview :</h5>
        <div>
          <p className="font-dm_sans mt-1 line-clamp-3 text-sm ">{_.get(product, "[0].product_description", "")} </p>
          <Link href={`${path}#description`} className="!text-[12px] text-primary_color cursor-pointer">
            Read More....
          </Link>
        </div>
      </div>
      <div className="pt-2 center_col_div gap-y-1 items-start">
        <h1 className="uppercase text-[12px] font-dm_sans ">Our Price</h1>
        <h1 className="font-bold text-primary_color text-3xl">{prepareMultipleCurrency()}</h1>
      </div>

      {_.get(product, "[0].product_type", "") === "composite_product" && (
        <div className="w-full flex-col gap-y-4">
          <h1 className="!text-[12px]">
            <span className="font-bold">IMPOERTANT NOTES :</span> Please add your ingredients total quantity as only Round of <span className="font-bold"> 250 Grams | 500 Grams | 1 Kilo Grams </span>
          </h1>
          <div className="text-sm font-bold text-secondary_color uppercase mb-2 pt-4">Main Ingredients</div>
          <div className="gap-y-1 flex flex-col">
            {_.get(compositeProductData, "main_ingredient", []).map((res, index) => {
              return (
                <div key={index} className="text-sm center_row_div gap-x-2 justify-start">
                  <Select
                    defaultValue={_.get(res, "units[0].sub_uid", [])}
                    onChange={(subid) => {
                      handleDropIngredinentChnage(res.uid, subid, "main_ingredient");
                    }}
                    className="antd_input !w-[300px] !h-[60px]"
                  >
                    {_.get(res, "units", []).map((res, index) => {
                      return (
                        <Select.Option key={index} value={res.sub_uid}>
                          <div className="!text-[15px] py-2 center_row_div justify-between w-full px-1">
                            <div className="center_row_div text-gray-900 font-medium justify-start">
                              <span className="capitalize">{res.name}</span>-<span>{res.unit}</span>
                            </div>
                            <span className="!text-secondary_color">
                              <GetSymbol /> <GetAmount value={res.price} />
                            </span>
                          </div>
                        </Select.Option>
                      );
                    })}
                  </Select>
                  <Select
                    onChange={(qty) => {
                      handleDropIngredinentCount(res.uid, qty, "main_ingredient");
                    }}
                    showSearch
                    defaultValue={1}
                    className="antd_input !w-[60px] !h-[60px]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((res, index) => {
                      return (
                        <Select.Option key={index} value={res}>
                          <span className="font-medium">{res}</span>
                        </Select.Option>
                      );
                    })}
                  </Select>
                </div>
              );
            })}
          </div>
          {/* Additional Ingredient */}
          <div className="text-sm font-bold text-secondary_color uppercase mb-2 pt-4">Aditional Ingredients</div>
          <div className="gap-y-1 flex flex-col">
            {_.get(compositeProductData, "additional_ingredient", []).map((res, index) => {
              return (
                <div key={index} className="text-sm center_row_div  gap-x-2 justify-start">
                  <Select
                    disabled={!res.active}
                    defaultValue={_.get(res, "units[0].sub_uid", [])}
                    onChange={(subid) => {
                      handleDropIngredinentChnage(res.uid, subid, "additional_ingredient");
                    }}
                    className="antd_input !w-[300px] !h-[60px]"
                  >
                    {_.get(res, "units", []).map((res, index) => {
                      return (
                        <Select.Option key={index} value={res.sub_uid}>
                          <div className="!text-[15px] py-2 center_row_div justify-between w-full px-1">
                            <div className="center_row_div text-gray-900 font-medium justify-start">
                              <span className="capitalize">{res.name}</span>-<span>{res.unit}</span>
                            </div>
                            <span className="!text-secondary_color">
                              <GetSymbol /> <GetAmount value={res.price} />
                            </span>
                          </div>
                        </Select.Option>
                      );
                    })}
                  </Select>
                  <Select
                    disabled={!res.active}
                    onChange={(qty) => {
                      handleDropIngredinentCount(res.uid, qty, "additional_ingredient");
                    }}
                    showSearch
                    defaultValue={1}
                    className="antd_input !w-[60px] !h-[60px]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((res, index) => {
                      return (
                        <Select.Option key={index} value={res}>
                          <span className="font-medium">{res}</span>
                        </Select.Option>
                      );
                    })}
                  </Select>
                  <Checkbox
                    value={res.active}
                    onChange={(e) => {
                      handleDropIngredientActiveChange(res.uid, e);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {_.get(product, "[0].product_type", "") === "composite_product" && (
        <div className="pt-2 center_col_div gap-y-1 items-start">
          <h1 className="uppercase text-[12px] font-dm_sans ">Final Price</h1>
          <h1 className="font-bold text-primary_color text-3xl">
            <GetSymbol /> <GetAmount value={getIngredintFinalTotal(compositeProductData)} />
          </h1>
        </div>
      )}
      {_.get(product, "[0].product_type", "") != "composite_product" && (
        <div className="center_col_div items-start pt-4 gap-y-2">
          <div className="flex items-center">
            <div className="space-x-1">
              {getProductWeight(product, variant_id).map((res, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      handleVariantChange(res);
                    }}
                    className={`size-9 inline-flex items-center justify-center tracking-wide align-middle ${currentVariant_child === res.variant_id ? "bg-primary_color text-white" : ""} text-center rounded-md cursor-pointer bg-orange-500/5 hover:bg-orange-500 text-orange-500 hover:text-white text-sm w-fit px-2`}
                  >
                    {res.weight}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      <div className="center_row_div justify-start items-end gap-x-3 mt-2">
        {_.get(product, "[0].product_type", "") != "composite_product" && (
          <div className=" center_col_div gap-x-2 justify-start items-start gap-y-2">
            <h5 className="text-sm ">Quantity :</h5>
            <div className="center_row_div gap-x-2">
              <button onClick={() => decrements()} className={`size-[40px] border center_row_div shadow-inner  ${Number(count) === 1 ? "opacity-50" : "hover:border-primary_color hover:text-primary_color hover:shadow-2xl"} `}>
                -
              </button>
              <div className="size-[40px] border center_row_div shadow-inner hover:border-primary_color  hover:shadow-2xl hover:text-primary_color">{count}</div>
              <button onClick={() => increments()} className="size-[40px] border center_row_div shadow-inner hover:border-primary_color hover:shadow-2xl  hover:text-primary_color">
                +
              </button>
            </div>
          </div>
        )}
        <div className="center_row_div justify-start gap-x-4">
          <div onClick={handleProceedToCheckout} className="primary_button gap-x-2 flex items-center !text-sm min-w-[100px] !rounded">
            {display() && (
              <h1 className="text-white ">
                <GetSymbol /> <GetAmount value={Number(totalPrice)} />
              </h1>
            )}{" "}
            Buy Now
          </div>
        </div>
      </div>
      <Drawer
        open={ingredientModal}
        width={"100%"}
        title="Manage Ingredients"
        onClose={() => {
          setIngredientModal(false);
        }}
      >
        <div className="p-10">
          <h1>Main Ingredients</h1>
        </div>
      </Drawer>
    </div>
  );
}
