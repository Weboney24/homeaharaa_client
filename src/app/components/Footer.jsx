"use client";
import { Divider } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ImageHelper, PaymentLogo } from "@/helper/imagehelper";

const Footer = () => {
  const FooterData = [
    {
      id: 1,
      name: "About",
      content: "We are glad you are here. Let us do the hometown shopping for you! At homeAharaa we belive the sentiments associated with home made food.",
    },
    {
      id: 2,
      name: "Feature",
      content: [
        {
          id: 1,
          name: "About Us",
          link: "/about-us",
        },
        {
          id: 2,
          name: "Contact Us",
          link: "/contact-us",
        },
        {
          id: 3,
          name: "Categories",
          link: "/more/category",
        },
      ],
    },
    {
      id: 3,
      name: "General Links",
      content: [
        {
          id: 1,
          name: "Terms Condition",
          link: "/terms-and-conditions",
        },
        {
          id: 2,
          name: "Privacy Policy",
          link: "/privacy-policy",
        },
        {
          id: 3,
          name: "Return & Refund Policy",
          link: "/return-refund-policy",
        },
      ],
    },
    {
      id: 4,
      name: "Helpful",
      content: [
        {
          id: 1,
          name: "Cancellation Policy",
          link: "/cancellation-policy",
        },
        {
          id: 2,
          name: "Shipping Policy",
          link: "/shipping-policy",
        },
        {
          id: 3,
          name: "Forgot Password",
          link: "/forgot-password",
        },
      ],
    },
  ];

  return (
    <div className="w-full py-10 bg-white center_col_div px-[8vw] gap-y-4">
      <Image src={ImageHelper.Logo} width={0} height={0} className="lg:h-full h-full w-[200px] mx-6 pt-5 object-cover md:h-[20vh]" alt="" />
      <Divider />
      <div className="center_row_div justify-between w-full items-start">
        {FooterData.map((res, index) => {
          return (
            <div key={index} className={`center_col_div  items-start justify-start ${index === 0 ? "w-[30%]" : "w-[15%]"}`}>
              <h1 className="font-medium h-[30px] text-lg">{res.name}</h1>
              <div className="pt-4">
                {!Array.isArray(res.content) ? (
                  <p className="leading-loose ">{res.content}</p>
                ) : (
                  <div className="center_col_div gap-y-5 items-start">
                    {res?.content.map((res1, index) => {
                      return (
                        <Link href={res1.link} key={index} className="hover:text-primary_color">
                          {res1.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <Divider />
      <div className="center_row_div justify-between  w-full">
        <p>Copyright @ 2024 Designed and Developed By Weboney. All rights Reserved</p>
        <div className="center_row_div gap-x-5">
          {PaymentLogo.map((res, index) => {
            return <Image width={0} height={0} key={index} src={res.url} alt="payment logo" className="h-[20px] w-[80px] object-contain" />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Footer;
