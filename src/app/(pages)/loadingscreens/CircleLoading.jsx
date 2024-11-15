import { Skeleton } from "antd";
import React from "react";

const CircleLoading = ({ extra }) => {
  let loader = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];

  if (extra) {
    loader.push([1, 2, 3, 4, 5]);
  }

  return (
    <div className="product_card_grid !pt-0">
      {loader.map((res, index) => {
        return <Skeleton.Image className="2xl:w-[260px] w-[280px] h-[300px]" active></Skeleton.Image>;
      })}
    </div>
  );
};

export default CircleLoading;
