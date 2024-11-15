import { Skeleton } from "antd";
import React from "react";

const ImageLoading = (props) => {
  const { width, height } = props;
  return <Skeleton.Image active loading={true} style={{ width: width, height: height }}></Skeleton.Image>;
};

export default ImageLoading;
