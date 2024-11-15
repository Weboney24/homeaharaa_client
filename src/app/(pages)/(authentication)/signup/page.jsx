"use client";
import React, { useState } from "react";
import { ImageHelper } from "@/helper/imagehelper";
import { Button, Form, Input } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { emailValidation, formValidation, passwordValidation } from "@/helper/form_validation";
import { registerUser } from "@/helper/api_helper";
import { ERROR_NOTIFICATION, SUCCESS_NOTIFICATION } from "@/helper/notification_helper";

const Signup = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values) => {
    try {
      setLoading(true);
      await registerUser(values);
      router.push("/signup-success");
    } catch (err) {
      ERROR_NOTIFICATION(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`w-full min-h-screen pb-20  !font-Poppins relative center_col_div justify-start `}>
      <div className="center_row_div w-full justify-between px-[10vw] pt-10">
        <Link href={"/"}>
          <Image src={ImageHelper.Logo} width={0} height={0} sizes="100vw" className="" alt="" />
        </Link>
        <p className="text-sm">
          Already a member &nbsp;
          <Link className="text-primary_color font-bold" href="/login">
            Login Now
          </Link>
        </p>
      </div>
      <div className="center_row_div justify-center items-start w-full px-[10vw]">
        <div className="w-[60%] pt-10 rounded-full fixed">
          <Image src={ImageHelper.Wave} width={0} height={0} sizes="100vw" className="object-cover opacity-80" alt="" />
        </div>
        <div></div>
        <div className="w-[450px] center_col_div shadow-2xl shadow-[#000000a8] border z-50 bg-white mt-10  rounded-2xl py-10">
          <div>
            <h1 className="text-primary_color text-4xl text-center font-medium tracking-wider !font-Poppins">Welcome!</h1>
            <p className="text-secondary_color pt-3">Create a new account to access the application!</p>
          </div>
          <Form layout="vertical" className="pt-10 center_col_div gap-y-2 !w-full" form={form} onFinish={handleFinish}>
            <Form.Item className="!w-[80%]" label="Username" name="user_name" rules={[formValidation("Enter User name")]}>
              <Input placeholder="Enter User name Here" className="antd_input !w-full" />
            </Form.Item>
            <Form.Item className="!w-[80%]" label="Email" name="user_email" rules={emailValidation("Enter Email Here")}>
              <Input placeholder="Enter Email Here" className="antd_input !w-full" />
            </Form.Item>
            <Form.Item rules={passwordValidation("Enter Password")} label="Password" className="!w-[80%]" name="user_password">
              <Input.Password placeholder="Enter password Here" className="antd_input !w-full" />
            </Form.Item>
            <Form.Item className="!w-[80%]">
              <Button loading={loading} htmlType="submit" className="antd_input  !w-full focus:!border-transparent !border-transparent bg-primary_color !text-white !font-Poppins">
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      {/* <div className="fixed bottom-0 w-full  h-[400px]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#ff7900" d="M0,160L40,160C80,160,160,160,240,170.7C320,181,400,203,480,218.7C560,235,640,245,720,229.3C800,213,880,171,960,138.7C1040,107,1120,85,1200,80C1280,75,1360,85,1400,90.7L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
        </svg>
      </div> */}
    </div>
  );
};

export default Signup;
