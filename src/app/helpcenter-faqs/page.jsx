import React from "react";
import Link from "next/link";

import Navbar from "../components/Navbar";
import GetInTouch from "../components/get-in-touch";
import Footer from "../components/Footer";
import Switcher from "../components/switcher";
import Faq from "../components/faq";

import { ImageHelper } from "@/helper/imagehelper";

export default function HelpcenterFaq() {
  return (
    <>
      <Navbar navClass="defaultscroll is-sticky" navlight={true} />
      <section className="relative table w-full py-16">
        <div className="absolute inset-0 bg-black opacity-80"></div>
        <div className="container relative">
          <img src={ImageHelper.BannerImg} alt="" />
          <div className="grid grid-cols-1 pb-8 text-center">
            <h3 className="text-4xl leading-normal tracking-wider font-semibold text-white">
              Frequently Asked Questions
            </h3>
          </div>
        </div>

        <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
          <ul className="tracking-[0.5px] mb-0 inline-block">
            <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white/50 hover:text-white">
              <Link href="/">Home</Link>
            </li>
            <li className="inline-block text-base text-white/50 mx-0.5 ltr:rotate-0 rtl:rotate-180">
              <i className="mdi mdi-chevron-right"></i>
            </li>
            <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white/50 hover:text-white">
              <Link href="/helpcenter">Helpcenter</Link>
            </li>
            <li className="inline-block text-base text-white/50 mx-0.5 ltr:rotate-0 rtl:rotate-180">
              <i className="mdi mdi-chevron-right"></i>
            </li>
            <li
              className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white"
              aria-current="page"
            >
              FAQs
            </li>
          </ul>
        </div>
      </section>
      <section className="relative md:py-24 py-16">
        <Faq />

        <GetInTouch />
      </section>
      <Footer />
      <Switcher />
    </>
  );
}
