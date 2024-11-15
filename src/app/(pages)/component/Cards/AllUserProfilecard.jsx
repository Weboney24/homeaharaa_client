import { Avatar } from "antd";
import React from "react";


const AllUserProfilecard = (props) => {
  const { size, userData } = props;

  return _.get(userData, "user_picture", "") ? (
    <div>
      <Avatar
        src={_.get(userData, "user_picture", "")}
        className={`
        ${size === "big" ? "!size-[100px] !text-3xl" : ""}  !text-white !uppercase`}
      />
    </div>
  ) : (
    <div>
      <Avatar
        style={{ backgroundColor: _.get(userData, "user_color", "") }}
        className={`
        ${size === "big" ? "!size-[100px] !text-3xl" : ""}  !text-white !uppercase`}
      >
        {_.get(userData, "user_name", "")?.split("")[0]}
      </Avatar>
    </div>
  );
};

export default AllUserProfilecard;
