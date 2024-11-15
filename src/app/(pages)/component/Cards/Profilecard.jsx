import { Avatar } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const Profilecard = (props) => {
  const userdata = useSelector((data) => data?.auth_slice);
  const { size } = props;

return _.get(userdata, "value.user_picture", "") ? (
  <div>
    <Avatar
      src={_.get(userdata, "value.user_picture", "")}
      className={`
        ${size === "big" ? "!size-[100px] !text-3xl" : ""}  !text-white !uppercase`}
    />
  </div>
) : (
  <div>
    <Avatar
      style={{ backgroundColor: _.get(userdata, "value.user_color", "") }}
      className={`
        ${size === "big" ? "!size-[100px] !text-3xl" : ""}  !text-white !uppercase`}
    >
      {_.get(userdata, "value.user_name", "")?.split("")[0]}
    </Avatar>
  </div>
);
};

export default Profilecard;
