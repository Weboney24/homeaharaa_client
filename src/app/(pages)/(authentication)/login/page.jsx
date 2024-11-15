"use client";
import React, { useEffect, useState } from "react";
import { ImageHelper } from "@/helper/imagehelper";
import { Button, Form, Input, Spin } from "antd";
import Image from "next/image";
import Link from "next/link";
import { formValidation } from "@/helper/form_validation";
import { authUser, checkClientLoginStatus } from "@/helper/api_helper";
import { ERROR_NOTIFICATION, SUCCESS_NOTIFICATION } from "@/helper/notification_helper";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { LOAD_AUTH_DATAS } from "../../../redux/auth_slice";
import { IconHelper } from "@/helper/iconhelper";

const Login = () => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleFinish = async (values) => {
    try {
      const result = await authUser(values);
      SUCCESS_NOTIFICATION(result);
      localStorage.setItem("O3blXRBXk5Zt", _.get(result, "data.data", ""));
      router.push("/");
    } catch (err) {
      ERROR_NOTIFICATION(err);
    }
  };

  const checkLoginData = async () => {
    try {
      setLoading(true);
      const result = await checkClientLoginStatus();
      if (_.get(result, "data.message", "") === "Invalid token") {
        router.push("/login");
        return localStorage.clear();
      }
      dispatch(LOAD_AUTH_DATAS(_.get(result, "data.data", [])));
      router.push("/");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLoginData();
  }, []);

  return (
    <Spin spinning={loading}>
      <div className={`!w-full !min-h-screen !pb-20  !font-Poppins !relative center_col_div justify-start `}>
        <div className="center_row_div w-full justify-between px-[10vw] pt-10">
          <Link href={"/"}>
            <Image src={ImageHelper.Logo} width={0} height={0} sizes="100vw" className="" alt="" />
          </Link>
          <p className="text-sm">
            Not a member &nbsp;
            <Link className="text-primary_color font-bold" href="/signup">
              Register Now
            </Link>
          </p>
        </div>
        <div className="center_row_div  justify-center items-start w-full px-[10vw]">
          <div className="w-[450px] center_col_div shadow-2xl   !z-50 bg-white mt-10  rounded-2xl py-10">
            <div className="w-[80%]">
              <Link href={"/"} className="!text-primary_color  text-sm hover:text-primary_color !pb-4 text-end flex items-center font-Poppins">
                <IconHelper.leftArrow className="!text-lg" /> Explore Products
              </Link>
              <h1 className="text-primary_color text-4xl text-left font-medium tracking-wider !font-Poppins">Hello Again!</h1>
              <p className="pt-3 text-left text-sm">Welcome back you`ve been missed!</p>
            </div>
            <Form layout="vertical" className="pt-10 center_col_div gap-y-2 !w-full" form={form} onFinish={handleFinish}>
              <Form.Item className="!w-[80%]" label="Email" name="user_email" rules={[formValidation("Enter Email")]}>
                <Input placeholder="Enter Email Here" className="antd_input !w-full" />
              </Form.Item>
              <Form.Item rules={[formValidation("Enter Password")]} label="Password" className="!w-[80%]" name="user_password">
                <Input.Password placeholder="Enter password Here" className="antd_input !w-full" />
              </Form.Item>
              <Link href={"/forgot-password"} className="!text-primary_color !pb-2 text-end w-[80%] font-Poppins font-medium">
                Forgot Password ?
              </Link>
              <Form.Item className="!w-[80%]">
                <Button htmlType="submit" loading={loading} className="antd_input  !w-full focus:!border-transparent !border-transparent bg-primary_color !text-white !font-Poppins">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="w-[60%] z-10 pt-10 fixed">
            <Image src={ImageHelper.Wave} width={0} height={0} sizes="100vw" className="object-cover opacity-70" alt="" />
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Login;
