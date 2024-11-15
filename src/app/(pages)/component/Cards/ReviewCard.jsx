"use client";
import React, { useState } from "react";
import AllUserProfilecard from "./AllUserProfilecard";
import moment from "moment";
import { Rate } from "antd";
import _ from "lodash";

const ReviewCard = ({ item, rating = true }) => {
  const [id, setId] = useState("");

  const handleChange = (item) => {
    if (id) {
      return setId("");
    }
    setId(_.get(item, "_id", ""));
  };

  return (
    <div className="first:mt-0 shadow p-4 w-full bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <AllUserProfilecard userData={_.get(item, "user_data[0]", {})} />

          <div className="ms-3 flex-1">
            <h1 className="text-lg font-semibold line-clamp-1 capitalize hover:text-orange-500 duration-500">{_.get(item, "user_data[0].user_name", {})}</h1>
          </div>
        </div>
        <p className="text-sm text-slate-400">{moment(_.get(item, "createdAt", {})).format("ll HH:MM A")}</p>
      </div>
      <div className="  rounded-md   mt-6">
        {rating && <Rate disabled allowHalf value={_.get(item, "rating", 0)} />}
        <div>
          <p className="text-slate-400 italic">{id === item?._id ? _.get(item, "comment", "") : _.get(item, "comment", "").slice(0, 200)}</p>
          <span
            className="text-sm capitalize text-primary_color cursor-pointer"
            onClick={() => {
              handleChange(item);
            }}
          >
            {id === item?._id ? "close" : "Read more..."}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
