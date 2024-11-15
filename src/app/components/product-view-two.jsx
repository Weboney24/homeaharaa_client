"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Image1 from "../../assets/images/kk1.webp";
import Image2 from "../../assets/images/ld1.gif";
import Image3 from "../../assets/images/ld5.webp";

export default function ProductViewTwo() {
  let [activeImage, setActiveImage] = useState(1);
  let image = [
    {
      id: 1,
      image: Image1,
    },
    {
      id: 2,
      image: Image2,
    },
    {
      id: 3,
      image: Image3,
    },
  ];

  const imageShow = (index) => {
    setActiveImage(index);
  };
  return (
    <ul className="product-imgs flex list-none">
      <li className="w-1/6">
        <ul className="img-select list-none">
          {image.map((item, index) => {
            return (
              <li className="p-px" key={index}>
                <Link href="#" scroll={false}>
                  <Image
                    src={item.image}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                    className="shadow dark:shadow-gray-800 w-full h-auto"
                    alt=""
                    onClick={() => imageShow(item.id)}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </li>

      <li className="img-display shadow dark:shadow-gray-800 m-px w-5/6">
        <div className="img-showcase flex w-full duration-500">
          {activeImage === 1 && (
            <Image
              src={Image1}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: 400 }}
              className="min-w-full"
              alt=""
            />
          )}
          {activeImage === 2 && (
            <Image
              src={Image2}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: 400 }}
              className="min-w-full"
              alt=""
            />
          )}
          {activeImage === 3 && (
            <Image
              src={Image3}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: 400 }}
              className="min-w-full"
              alt=""
            />
          )}
        </div>
      </li>
    </ul>
  );
}
