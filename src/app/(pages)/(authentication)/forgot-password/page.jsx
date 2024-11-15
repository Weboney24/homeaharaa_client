"use client";
import React, { useState } from "react";
import { Button, Form, Input, Spin } from "antd";
import Image from "next/image";
import Link from "next/link";
import { ImageHelper } from "@/helper/imagehelper";
import { sendForgotPasswordEmail } from "@/helper/api_helper";
import { SUCCESS_NOTIFICATION, ERROR_NOTIFICATION, SUCCESS_NOTIFICATION_SWAL } from "@/helper/notification_helper";
import { useRouter } from "next/navigation";
import { IconHelper } from "@/helper/iconhelper";
import ImageWave from "../ImageWave";

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFinish = async (values) => {
    try {
      setLoading(true);
      const result = await sendForgotPasswordEmail(values.email);
      SUCCESS_NOTIFICATION_SWAL(result, "Mail sent successfully");
      form.resetFields();
    } catch (err) {
      ERROR_NOTIFICATION(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <div className="!w-full !min-h-screen  !font-Poppins !relative center_col_div justify-center">
        <div className="w-[450px] center_col_div shadow-2xl  z-50 bg-white mt-10 rounded-2xl py-10">
          <div className="center_col_div justify-start items-start gap-y-2 w-[80%]">
            <Link href={"/login"} className="!text-primary_color  text-sm hover:text-primary_color !pb-4 text-end flex items-center font-Poppins">
              <IconHelper.leftArrow className="!text-lg" /> Back to Login
            </Link>
            <h1 className="text-primary_color font-semibold  text-left text-2xl  !font-dm_sans">Reset your password</h1>
            <p className="text-[13px]">Enter the email address you used to register with</p>
          </div>
          <Form layout="vertical" className="pt-6 center_col_div gap-y-2 !w-full" form={form} onFinish={handleFinish}>
            <Form.Item
              className="!w-[80%]"
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Enter a valid email",
                },
              ]}
            >
              <Input placeholder="Enter Email Here" className="antd_input  !w-full" />
            </Form.Item>
            <Form.Item className="!w-[80%]">
              <Button htmlType="submit" loading={loading} className="antd_input !w-full focus:!border-transparent !border-transparent bg-primary_color !text-white !font-Poppins">
                Send Reset Link
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Spin>
  );
};

export default ForgotPassword;
