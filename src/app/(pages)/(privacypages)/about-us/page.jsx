import React from "react";
import Link from "next/link";
import { promiseData, teamData } from "../../../data/data";
import Image from "next/image";
import { ImageHelper } from "@/helper/imagehelper";
import { FiFacebook, FiInstagram, FiLinkedin } from "react-icons/fi";
import CustomTopbar from "../../component/CustomTopbar";

export default function AboutUs() {
  return (
    <div className="w-full px-[8vw] !font-Poppins">
      <CustomTopbar text="About US" />
      <div className="w-full">
        <div className="w-full min-h-[500px] pt-2 center_row_div items-start justify-start gap-x-4">
          <Image src={ImageHelper.AboutAnimation} width={0} height={0} className="!w-[400px] !rounded !h-[300px] !border-2 !border-white" />
          <div>
            <h1 className="text-2xl font-medium">Who We Are ?</h1>
            <p className="!font-normal !font-dm_sans leading-loose  text-secondary_color pt-2 text-justify">
              We are glad you are here. Let us do the hometown shopping for you! At homeAharaa we believe the sentiments associated with Home made food. For many of us food is the language of mother&apos;s love and affection. When a mom or aunty cooks it for you, you will feel the special taste, may it be a spice powder or it be a sweet laddu. It's more than just nourishment. It's memories, it's connection, it's comfort. <br /> We understand how genuine it is to have the blessing of someone shipping what you long for, and that is our mission here. We are here to bring a smile to your faces, to bring healthy sweets & snacks to your loved ones, to grind and give the spice with your mom&apos;s ingredients with the same ratio, you can make a connection to a loved one even though you may not be with them, a moment of nostalgic comfort, a craving from a beloved food memory. <br />
              We have designed this website to help those who miss home love, native south indian sweets, for those who don't want to bother aging parents. With friends & relatives migrating to a place where they can settle, finally we tend to lose the native taste. We are attempting our best to bring in the taste you enjoyed to your kids! We started homeAharaa based on the requests from friends who tend to get our home made powders after tasting our home food. One thing they keep saying is, you are lucky to have parents sending these to you! Which made us think for those who are in need and offer help. We&apos;ve built a platform that empowers shopping in and around Karur, TamilNadu. Our mission is to bring you comfort through food.
            </p>
          </div>
        </div>

        <div className="w-full relative pt-8">
          <div className="grid md:grid-cols-3 grid-cols-1  gap-6">
            {promiseData.map((item, index) => {
              return (
                <div className="p-6 shadow hover:shadow-md dark:shadow-gray-800 dark:hover:shadow-gray-700 duration-500 rounded-md bg-white dark:bg-slate-900" key={index}>
                  <i className={`text-4xl text-orange-500 ${item.icon}`}></i>

                  <div className="content mt-6">
                    <Link href="" className="title h5 text-xl font-medium hover:text-orange-500">
                      {item.title}
                    </Link>
                    <p className="text-slate-400 mt-3">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full relative pt-16">
          <div className="grid grid-cols-1 justify-center text-center mb-4">
            <h6 className="text-orange-500 font-semibold uppercase text-lg">Our Minds</h6>
            <h5 className="font-semibold text-3xl leading-normal my-4">Meet Our Team Members</h5>
          </div>

          <div className="grid md:grid-cols-12 grid-cols-1 mt-6 gap-6">
            {teamData.map((item, index) => {
              return (
                <div className="lg:col-span-3 md:col-span-6" key={index}>
                  <div className="group text-center">
                    <div className="relative inline-block mx-auto h-52 w-52 rounded-full overflow-hidden">
                      <Image src={item?.image} width={500} height={500} sizes="100vw" style={{ width: "100%", height: "auto" }} className="" alt="" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black h-52 w-52 rounded-full opacity-0 group-hover:opacity-100 duration-500"></div>

                      <ul className="list-none absolute start-0 end-0 -bottom-20 group-hover:bottom-5 duration-500 space-x-1">
                        <li className="inline">
                          <Link href="" className="size-8 inline-flex items-center justify-center align-middle rounded-full bg-orange-500 text-white">
                            <FiFacebook className="h-4 w-4"></FiFacebook>
                          </Link>
                        </li>
                        <li className="inline">
                          <Link href="" className="size-8 inline-flex items-center justify-center align-middle rounded-full bg-orange-500 text-white">
                            <FiInstagram className="h-4 w-4"></FiInstagram>
                          </Link>
                        </li>
                        <li className="inline">
                          <Link href="" className="size-8 inline-flex items-center justify-center align-middle rounded-full bg-orange-500 text-white">
                            <FiLinkedin className="h-4 w-4"></FiLinkedin>
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div className="content mt-3">
                      <Link href="" className="text-lg font-semibold hover:text-orange-500 duration-500">
                        {item.name}
                      </Link>
                      <p className="text-slate-400">{item.possition}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
