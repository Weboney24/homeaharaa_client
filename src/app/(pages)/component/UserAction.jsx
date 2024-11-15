import { removeProductFromHistory } from "@/helper/api_helper";
import { IconHelper } from "@/helper/iconhelper";
import { ERROR_NOTIFICATION, SUCCESS_NOTIFICATION } from "@/helper/notification_helper";
import { Spin, Tooltip } from "antd";
import Link from "next/link";
import React from "react";
import { DiEnvato } from "react-icons/di";
import { RiCreativeCommonsZeroLine } from "react-icons/ri";

const UserAction = (props) => {
  const { loading, handleAddToWishlist, row = false, handleRemoveFromHistory, view, handleAddToCart, res, from, variant_id, userData, product_id, category_id, searchEnabled, setSearch } = props;

  let collectCarts = _.get(res, "cart", []).map((res) => {
    return res.variant_id;
  });

  let collectWishlist = _.get(res, "wishlist", []).map((res) => {
    return res.variant_id;
  });

  const checkWishlistStatus = () => {
    if (!_.get(userData, "value._id", "")) {
      return false;
    }
    if (variant_id) {
      let takeAvailableVariant = _.get(res, "variable_products", []).filter((result) => {
        return collectWishlist.includes(result.sku);
      });

      return !_.isEmpty(
        takeAvailableVariant?.filter((res) => {
          return res.sku === variant_id;
        })
      );
    } else {
      return _.get(res, "wishlist.[0].product_id", "") === res._id;
    }
  };

  const checkCartStatus = () => {
    if (!_.get(userData, "value._id", "")) {
      return false;
    }
    if (variant_id) {
      let takeAvailableVariant = _.get(res, "variable_products", []).filter((result) => {
        return collectCarts.includes(result.sku);
      });
      return !_.isEmpty(
        takeAvailableVariant?.filter((res) => {
          return res.sku === variant_id;
        })
      );
    } else {
      return _.get(res, "cart.[0].product_id", "") === res._id;
    }
  };

  return (
    <div className={`list-none ${view === "list" ? "opacity-100" : "absolute  top-[12px] w-full  end-5"} ${from === "product_details" ? "opacity-100" : " opacity-0 group-hover:opacity-100 "}  duration-500 items-end center_col_div justify-end gap-y-2 group`}>
      {loading ? (
        <Spin></Spin>
      ) : (
        <div className={`flex ${row ? "flex-row" : "flex-col"} gap-x-3 gap-y-2`}>
          {/* wishlist */}
          <div
            onClick={() => {
              handleAddToWishlist(res);
            }}
            className={`!size-[40px] ${checkWishlistStatus() ? "bg-primary_color" : "bg-white"} gap-y-2  group/fix  border shadow-inner rounded center_row_div border-transparent cursor-pointer group hover:bg-primary_color `}
          >
            {checkWishlistStatus() ? (
              <Tooltip title="Remove From Favorite">
                <IconHelper.heartFilled className={`text-white  group-hover/fix:text-white !text-lg`} />
              </Tooltip>
            ) : (
              <Tooltip title="Add To Favorite">
                <IconHelper.heartOutlined className={`!text-secondary_color  group-hover/fix:text-white !text-lg`} />
              </Tooltip>
            )}
          </div>
          {/* cart */}
          <div
            onClick={() => {
              handleAddToCart(res);
            }}
            className={`!size-[40px] ${checkCartStatus() ? "bg-primary_color" : "bg-white"} group/fix   border shadow-inner rounded center_row_div border-transparent cursor-pointer group hover:bg-primary_color `}
          >
            {checkCartStatus() ? (
              <Tooltip title="Remove From Cart">
                <IconHelper.bagFilled className={`text-white group-hover/fix:text-white !text-lg`} />
              </Tooltip>
            ) : (
              <Tooltip title="Add To Cart">
                <IconHelper.bagOutlined className={`!text-secondary_color group-hover/fix:text-white !text-lg`} />
              </Tooltip>
            )}
          </div>
          {from != "product_details" && (
            <>
              <div className="size-[40px] bg-white hover:bg-primary_color border-transparent cursor-pointer group/fix  center_row_div rounded shadow-inner">
                <Link
                  href={{
                    pathname: "/products",
                    query: {
                      product_id: product_id,
                      category_id: category_id,
                    },
                  }}
                  onClick={() => {
                    searchEnabled && setSearch(false);
                  }}
                >
                  <Tooltip title="view more">
                    <IconHelper.viewEyeIcon className={`!text-secondary_color group-hover/fix:text-white  !text-lg `} />
                  </Tooltip>
                </Link>
              </div>
              <div className="size-[40px] bg-white hover:bg-primary_color border-transparent cursor-pointer  group/fix center_row_div rounded shadow-inner">
                <Link
                  href={{
                    pathname: "/products",
                    query: {
                      product_id: product_id,
                      category_id: category_id,
                    },
                  }}
                  target="_blank"
                  onClick={() => {
                    searchEnabled && setSearch(false);
                  }}
                >
                  <Tooltip title="quick view">
                    <IconHelper.quickView className={`!text-secondary_color group-hover/fix:text-white !text-lg `} />
                  </Tooltip>
                </Link>
              </div>
              {from === "history" && (
                <div className="size-[40px] bg-white hover:bg-primary_color border-transparent cursor-pointer  group/fix center_row_div rounded shadow-inner">
                  <div
                    onClick={() => {
                      handleRemoveFromHistory(product_id);
                    }}
                  >
                    <Tooltip title="clear">
                      <IconHelper.DeleteIcon className={`!text-secondary_color group-hover/fix:text-white !text-lg `} />
                    </Tooltip>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserAction;
