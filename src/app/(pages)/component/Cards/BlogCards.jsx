import { Card } from "antd";
import _ from "lodash";
import Link from "next/link";
import React from "react";

const BlogCards = ({ res }) => {
  return (
    <Card
      actions={[
        <Link href={`/blog-detail/${_.get(res, "_id", "")}`} className="!text-secondary_color !font-medium hover:!text-primary_color">
          Read More
        </Link>,
      ]}
      className="w-[98%]"
      hoverable
      cover={<img alt="Blog" src={_.get(res, "blog_image", "")} className="!h-[200px]  !w-full p-1 !object-cover" />}
    >
      <Card.Meta
        title={<h1 className="capitalize line-clamp-1">{_.get(res, "blog_name", "")}</h1>}
        description={
          <div>
            <h1 className="!text-sm text-secondary_color  line-clamp-4">{_.get(res, "blog_short_description", "")}</h1>
          </div>
        }
      />
    </Card>
  );
};

export default BlogCards;
