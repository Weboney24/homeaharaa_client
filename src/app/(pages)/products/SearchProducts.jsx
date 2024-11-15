import { getFilterProduct } from "@/helper/api_helper";
import { IconHelper } from "@/helper/iconhelper";
import { Drawer, Input, Modal } from "antd";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import ProductCard from "../component/Cards/ProductCard";

const SearchProducts = (props) => {
  const { setSearch, searchEnabled } = props;
  const [productData, setProductData] = useState([]);
  const [search, setSearchData] = useState("");

  let params = JSON.stringify({
    search: search,
  });

  const fetchData = async () => {
    try {
      if (search) {
        const result = await getFilterProduct(params);
        setProductData(_.get(result, "data.data", []));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  return (
    <Drawer
      open={true}
      destroyOnClose
      footer={false}
      onClose={() => {
        setSearch(false);
      }}
      closable={false}
      style={{ background: "#000000e1" }}
      width={"100%"}
      className=" !min-h-screen  overflow-scroll !p-0 !m-0"
    >
      <div className="center_col_div w-full  justify-start pt-[5vh]">
        <div className="w-full center_row_div px-10 justify-between gap-x-2">
          <div
            onClick={() => {
              setSearch(false);
            }}
            className="size-[50px] rounded bg-white center_row_div cursor-pointer"
          >
            <IconHelper.leftArrow className="!text-2xl" />
          </div>
          <Input
            onChange={(e) => {
              setSearchData(e?.target?.value);
            }}
            placeholder="Search"
            className="!w-[30vw] !h-[50px] !shadow-inner placeholder:!text-black"
            suffix={<IconHelper.searchIcon className="!text-black !text-2xl" />}
          />
        </div>
        {!search ? (
          <p className="text-white"></p>
        ) : (
          <div className="product_card_grid px-10">
            {productData.map((res, index) => {
              return <ProductCard key={index} res={res} searchEnabled={searchEnabled} setSearch={setSearch} fetchData={fetchData} />;
            })}
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default SearchProducts;
