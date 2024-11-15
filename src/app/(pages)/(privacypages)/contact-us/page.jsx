"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import CustomTopbar from "../../component/CustomTopbar";
import ContactModal from "@/app/components/contact-modal";
import { Button, Form, Input } from "antd";
import { emailValidation, formValidation } from "@/helper/form_validation";
import { ERROR_NOTIFICATION } from "@/helper/notification_helper";
import { addEnquiryMessage } from "@/helper/api_helper";

const ContactPage = () => {
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const handleAddEnquiry = async (values) => {
    try {
      await addEnquiryMessage(values);
    } catch (err) {
      console.log(err);
      ERROR_NOTIFICATION(err);
    }
  };

  return (
    <>
      <div className="w-full px-[8vw] !font-Poppins">
        <CustomTopbar text="Contact US" />
        {/* Form View */}
        <div className="w-full gap-x-4 flex justify-between flex-col py-4">
          <div className="bg-white w-full rounded-md ">
            <h3 className="my-6 text-2xl w-full leading-normal text-primary_color font-semibold">Get in touch !</h3>
            <Form layout="vertical" onFinish={handleAddEnquiry} className="w-full flex flex-wrap justify-between" form={form}>
              <Form.Item label="Your Name" name={"username"} className="w-[48%]" rules={[formValidation("enter your name")]}>
                <Input placeholder="Name" className="antd_input !w-full" />
              </Form.Item>
              <Form.Item label="Your Email" name={"useremail"} className="w-[48%]" rules={emailValidation("enter valid email")}>
                <Input type="email" placeholder="Email" className="antd_input !w-full" />
              </Form.Item>
              <Form.Item label="Your Message" name={"usermessage"} className="w-full" rules={[formValidation("enter your message")]}>
                <Input.TextArea placeholder="Message" className="antd_input !h-[200px] !w-full" />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" loading={loading} className="antd_input !w-full focus:!border-transparent !border-transparent bg-primary_color !text-white !font-Poppins">
                  Send Us
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        {/* locations */}
        <div className="w-full py-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-x-6 gap-y-5">
            <div className="text-center p-6 shadow">
              <div className="relative text-transparent">
                <div className="size-20 bg-orange-500/5 text-orange-500 rounded-xl text-2xl flex align-middle justify-center items-center mx-auto shadow-sm dark:shadow-gray-800">
                  <FiPhone />
                </div>
              </div>

              <div className="content mt-7">
                <h5 className="title h5 text-lg font-semibold">Phone</h5>
                <p className="text-slate-400 mt-3">The phrasal sequence of the is now so that many campaign and benefit</p>
                <br />
                <div className="mt-5">
                  <Link href="tel:+152534-468-854" className="text-orange-500 font-medium">
                    +91 9944354111
                  </Link>
                </div>
              </div>
            </div>

            <div className="text-center p-6 shadow">
              <div className="relative text-transparent">
                <div className="size-20 bg-orange-500/5 text-orange-500 rounded-xl text-2xl flex align-middle justify-center items-center mx-auto shadow-sm dark:shadow-gray-800">
                  <FiMail />
                </div>
              </div>

              <div className="content mt-7">
                <h5 className="title h5 text-lg font-semibold">Email</h5>
                <p className="text-slate-400 mt-3">The phrasal sequence of the is now so that many campaign and benefit</p>
                <br />
                <div className="mt-5">
                  <Link href="mailto:contact@example.com" className="text-orange-500 font-medium">
                    contact@homeaharaa.com
                  </Link>
                </div>
              </div>
            </div>

            <div className="text-center p-6 shadow">
              <div className="relative text-transparent">
                <div className="size-20 bg-orange-500/5 text-orange-500 rounded-xl text-2xl flex align-middle justify-center items-center mx-auto shadow-sm dark:shadow-gray-800">
                  <FiMapPin />
                </div>
              </div>

              <div className="content mt-7">
                <h5 className="title h5 text-lg font-semibold">Head Office</h5>
                <p className="text-slate-400 mt-3">3/7 A, A.S.M.P.ILLAM, GANDHIPURAM CHECKPOST, ODDANCHATRAM, Dindigul, Tamil Nadu, India - 624619</p>
                <ContactModal url={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.008153163984!2d78.07074867377764!3d10.96275625573175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baa2f2daa71441f%3A0xc41fa16e4c51260d!2sWeboney!5e0!3m2!1sen!2sin!4v1721377198364!5m2!1sen!2sin"} />
              </div>
            </div>

            <div className="text-center p-6 shadow">
              <div className="relative text-transparent">
                <div className="size-20 bg-orange-500/5 text-orange-500 rounded-xl text-2xl flex align-middle justify-center items-center mx-auto shadow-sm dark:shadow-gray-800">
                  <FiMapPin />
                </div>
              </div>

              <div className="content mt-7">
                <h5 className="title h5 text-lg font-semibold">Marketing Office</h5>
                <p className="text-slate-400 mt-3">9, L.G.B. Nagar, East Street, Karur 639002 Tamil Nadu India</p>
                <ContactModal url={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.008153163984!2d78.07074867377764!3d10.96275625573175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baa2f2daa71441f%3A0xc41fa16e4c51260d!2sWeboney!5e0!3m2!1sen!2sin!4v1721377198364!5m2!1sen!2sin"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
