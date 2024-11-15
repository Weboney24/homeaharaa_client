"use client";
import { LOAD_AUTH_DATAS } from "@/app/redux/auth_slice";
import { UPDATE_CART_COUNT } from "@/app/redux/cart_slice";
import { UPDATE_WISHLIST_COUNT } from "@/app/redux/wishlist_slice";
import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Button, Divider, Form, Input } from "antd";
import { formValidation, passwordValidation } from "@/helper/form_validation";
import {
  ERROR_NOTIFICATION,
  SUCCESS_NOTIFICATION,
} from "@/helper/notification_helper";
import { values } from "lodash";
import { updateUserPassword } from "@/helper/api_helper";

const Account = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = () => {
    try {
      dispatch(LOAD_AUTH_DATAS([]));
      dispatch(UPDATE_CART_COUNT(0));
      dispatch(UPDATE_WISHLIST_COUNT(0));
      localStorage.clear();
      router.push("/");
    } catch {}
  };

  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    try {
      const result = await updateUserPassword(values);
      SUCCESS_NOTIFICATION(result);
      form.resetFields();
    } catch (e) {
      ERROR_NOTIFICATION(e);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="bg-white">
        <h5 className="text-lg font-semibold mb-5 text-primary_color">
          Password change :
        </h5>
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            name="old_password"
            label="Old Password"
            rules={[formValidation("Please Enter Your Old Password")]}
          >
            <Input.Password className="antd_input" placeholder="Old Password" />
          </Form.Item>
          <Form.Item
            name="new_password"
            label="New Password"
            rules={passwordValidation("Please Enter Your new Password")}
          >
            <Input.Password className="antd_input" placeholder="New Password" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" className="antd_button !w-[400px]">
              Update Password
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Divider />
      <div className="bg-white">
        <h5 className="text-lg font-semibold mb-5 text-primary_color">
          Logout Account :
        </h5>

        <p className="text-slate-400 mb-4">
          Do you want to logout the account? Please press below "Logout" button
        </p>

        <div onClick={handleLogout} className="primary_button">
          Logout
        </div>
      </div>
    </div>
  );
};

export default Account;
