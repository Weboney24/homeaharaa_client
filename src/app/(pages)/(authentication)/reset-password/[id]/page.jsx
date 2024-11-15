"use client";

import React, { useEffect, useState } from "react";
import { Button, Form, Input, Spin } from "antd";
import { resetPassword, VerifyResetLink } from "@/helper/api_helper";
import { ERROR_NOTIFICATION, SUCCESS_NOTIFICATION_SWAL } from "@/helper/notification_helper";
import { useRouter } from "next/navigation";
import { passwordConfirmValidation, passwordValidation } from "@/helper/form_validation";
import Link from "next/link";
import { IconHelper } from "@/helper/iconhelper";

export default function ResetPassword({ params }) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const router = useRouter();

  const { id } = params;

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await VerifyResetLink(id);
      if (!_.get(result, "data.data.result", false)) {
        router.push("/not-found");
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handlePasswordReset = async (values) => {
    try {
      setLoading(true);
      const result = await resetPassword({ ...values, reset_url: id });
      SUCCESS_NOTIFICATION_SWAL(result, "Success");
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
        <div className="w-[500px] center_col_div shadow-2xl   z-50 bg-white mt-10 rounded-2xl py-10">
          <div className="center_col_div justify-start items-start gap-y-2 w-[80%]">
            <Link href={"/login"} className="!text-primary_color  text-sm hover:text-primary_color !pb-4 text-end flex items-center font-Poppins">
              <IconHelper.leftArrow className="!text-lg" /> Back to Login
            </Link>
            <h1 className="text-primary_color font-semibold  text-left text-2xl  !font-dm_sans">Enter your new password</h1>
            <p className="text-[13px]">Your new password must be different to previous password</p>
          </div>

          <Form layout="vertical" className="pt-10 center_col_div gap-y-2 !w-full" form={form} onFinish={handlePasswordReset}>
            <Form.Item className="!w-[80%]" label="New Password" name="user_password" rules={passwordValidation("Enter new password")}>
              <Input.Password placeholder="Enter New Password" className="antd_input !w-full" />
            </Form.Item>
            <Form.Item dependencies={["user_password"]} className="!w-[80%]" label="Confirm Password" name="confirm_password" rules={passwordConfirmValidation("Enter confirm password")}>
              <Input.Password placeholder="Confirm New Password" className="antd_input !w-full" />
            </Form.Item>
            <Form.Item className="!w-[80%]">
              <Button htmlType="submit" loading={loading} className="antd_input !w-full focus:!border-transparent !border-transparent bg-primary_color !text-white !font-Poppins">
                Reset Password
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Spin>
  );
}
