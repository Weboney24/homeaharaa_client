"use client";
import React, { useEffect, useState } from "react";
import { Breadcrumb, Divider, Empty, Form, Input, Select } from "antd";
import { IconHelper } from "@/helper/iconhelper";
import { getFilterProduct, getMainCategory, getSubCategory } from "@/helper/api_helper";
import _ from "lodash";
import ProductCard from "@/app/(pages)/component/Cards/ProductCard";
import CircleLoading from "@/app/(pages)/loadingscreens/CircleLoading";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";

const Explore = () => {
  const ItemView = [
    {
      id: 1,
      name: <IconHelper.gridView className="text-sm" />,
    },
    {
      id: 2,
      name: <IconHelper.listView className="text-sm" />,
    },
  ];

  const [current_view, setCurrent_view] = useState(1);

  const [productData, setProductData] = useState([]);

  const [search_data, setSearch_data] = useState("");
  const [sorting_data, setSorting_data] = useState(0);

  const [loading, setLoading] = useState(false);

  const [categoryData, setCategoryData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);

  const params_string = useParams();

  const search_params = useSearchParams();

  const filterData = [
    {
      id: 0,
      name: "All",
      value: {},
    },
    {
      id: 1,
      name: "Popular products",
      value: { popular_products: true },
    },
    {
      id: 2,
      name: "Latest Products",
      value: { new_arival: true },
    },
    {
      id: 3,
      name: "Price Low to High",
      value: { sorting: true, sorting_value: 1 },
    },
    {
      id: 4,
      name: "Price High to Low",
      value: { sorting: true, sorting_value: -1 },
    },
  ];

  let search = JSON.stringify({
    category_id: params_string?.id,
    sub_category_id: search_params.get("subcategory"),
    search: search_data || null,
    ...filterData[sorting_data]?.value,
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getFilterProduct(search);
      const category_data = await Promise.all([getMainCategory(), getSubCategory()]);
      let category = _.get(category_data, "[0].data.data", []).filter((result) => result._id === params_string?.id);
      let subcategory = _.get(category_data, "[1].data.data", []).filter((result) => result._id === search_params.get("subcategory"));
      setCategoryData(_.get(category, "[0]", ""));
      setSubCategoryData(_.get(subcategory, "[0]", ""));
      setProductData(_.get(result, "data.data", []));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search_data, sorting_data, search_params.get("subcategory")]);

  return (
    <div className="px-[8vw] py-10 min-h-screen w-full">
      <div className="center_row_div w-full justify-start gap-x-2 !text-sm">
        <Link href={"/"} className="cursor-pointer hover:text-primary_color">
          Home
        </Link>
        <IconHelper.LeftArrowIcon />
        <Link href={`/explore/${_.get(categoryData, "_id", "")}`} className="cursor-pointer hover:text-primary_color">
          {_.get(categoryData, "category_name", "")}
        </Link>
        {_.get(subCategoryData, "sub_category_name", "") && (
          <>
            <IconHelper.LeftArrowIcon />
            <h1 className="grayscale">{_.get(subCategoryData, "sub_category_name", "")}</h1>
          </>
        )}
      </div>

      <div className="w-full center_row_div justify-between pt-6">
        <div className="center_row_div gap-x-2">
          <div className={`center_row_div gap-x-2 border px-3 py-1 cursor-pointer`}>
            <IconHelper.filterIcons /> Filters
          </div>
          <Select
            onChange={(e) => {
              setSorting_data(e);
            }}
            placeholder="Default Sorting"
            className="!h-[40px] !w-[300px] !rounded-none  placeholder:!text-black !shadow-inner"
            defaultValue={"All"}
          >
            {filterData?.map((res, index) => {
              return (
                <Select.Option key={index} value={res?.id}>
                  <div>{res.name}</div>
                </Select.Option>
              );
            })}
          </Select>
          <Input
            onChange={(e) => {
              setSearch_data(e?.target?.value);
            }}
            placeholder="Search"
            className="!h-[40px] !w-[300px] !rounded-none border placeholder:!text-black !shadow-inner"
            suffix={<IconHelper.searchIcon className="!text-primary_color" />}
          />
        </div>

        <div className="center_row_div gap-x-2">
          {ItemView?.map((res, index) => {
            return (
              <div
                onClick={() => {
                  setCurrent_view(res?.id);
                }}
                key={index}
                className={`center_row_div ${res?.id === current_view ? "text-primary_color" : ""} gap-x-2 border px-3 py-3 rounded-none  cursor-pointer`}
              >
                {res.name}
              </div>
            );
          })}
        </div>
      </div>

      {loading ? (
        <CircleLoading extra={true} />
      ) : _.isEmpty(productData) ? (
        <div className="center_row_div w-full min-h-[60vh]">
          <Empty />
        </div>
      ) : (
        <div className={`grid ${current_view === 2 ? "grid-cols-1" : "grid-cols-4"}  pt-6 gap-2`}>
          {productData.map((res, index) => {
            return <ProductCard key={index} res={res} list={current_view === 2} fetchData={fetchData} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Explore;
