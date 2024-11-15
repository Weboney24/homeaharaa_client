import { Button, Empty } from "antd";
import Link from "next/link";
import React from "react";

const EmptyData = ({ message, porduct = true, exploreText, exploreUrl }) => {
  return (
    <div className="w-full h-[80vh] center_col_div">
      <Empty description={message}>
        {porduct && (
          <Link href={exploreUrl || "/"}>
            <Button className="!bg-secondary_color !text-white !border-transparent">Explore {exploreText || "Products"}</Button>
          </Link>
        )}
      </Empty>
    </div>
  );
};

export default EmptyData;
