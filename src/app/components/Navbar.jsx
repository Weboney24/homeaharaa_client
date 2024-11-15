"use client";
import React, { useEffect, useState } from "react";
import { IconHelper } from "@/helper/iconhelper";
import { ImageHelper } from "@/helper/imagehelper";
import Image from "next/image";
import Link from "next/link";
import { CgMenuLeftAlt } from "react-icons/cg";
import { IoBagOutline } from "react-icons/io5";
import { MdOutlineAccountCircle, MdOutlineFavoriteBorder } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import Logo from "../assets/images/Logo.png";
import { checkClientLoginStatus, collectAllCountry, collectCartCount, collectMyWishlist, collectWishlistCount, getCurrency, getCurrentCountry, getFilteredcategory, getMainCategory } from "@/helper/api_helper";
import { LOAD_AUTH_DATAS } from "../redux/auth_slice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import _ from "lodash";
import { Avatar, Dropdown, FloatButton, Input, Modal, Select, Space } from "antd";
import SearchProducts from "../(pages)/products/SearchProducts";
import { UPDATE_CART_COUNT } from "../redux/cart_slice";
import { UPDATE_WISHLIST_COUNT } from "../redux/wishlist_slice";
import { LOAD_COUNTRY_DATAS } from "../redux/country_slice";
import Profilecard from "../(pages)/component/Cards/Profilecard";
import { Country } from "country-state-city";

const Navbar = () => {
  const auth_slice = useSelector((data) => data.auth_slice.value);
  const cart_slice = useSelector((data) => data.cart_slice);
  const wishlist_slice = useSelector((data) => data.wishlist_slice);

  const path = usePathname();

  const TopLayer = [
    {
      id: 1,
      name: "About Us",
      to: "/about-us",
    },
    {
      id: 2,
      name: "Contact Us",
      to: "/contact-us",
    },
    {
      id: 3,
      name: "Privacy Policy",
      to: "/privacy-policy",
    },
  ];

  const TopLayer2 = [
    {
      id: 1,
      name: "Categories",
      icon: RiArrowDropDownLine,
      to: "/more/category",
    },
    {
      id: 2,
      name: "New Arivals",
      icon: RiArrowDropDownLine,
      to: "/more/newarivals",
    },
    {
      id: 3,
      name: "Top Selling",
      icon: RiArrowDropDownLine,
      to: "/more/topselling",
    },
  ];

  const CartIcon = [
    {
      id: 1,
      icon: MdOutlineFavoriteBorder,
      link: "/favorite-items",
      count: _.get(wishlist_slice, "value", 0),
    },
    {
      id: 2,
      icon: IoBagOutline,
      link: "/shopping-cart",
      count: _.get(cart_slice, "value", 0),
    },
  ];

  const menuItems = [
    {
      id: 1,
      name: "Sweets & Snacks",
      content: ["Savory products", "Nut-based snacks", "Cold snacks", "Milk and dairy products", "Bakery products", "Hot snacks"],
    },
    {
      id: 2,
      name: "Spices",
      content: ["cumin", "clove", "coriander", "cinnamon", "turmeric", "fenugreeks"],
    },
    {
      id: 3,
      name: "Utensils",
      content: ["pressure cooker", "wet grinder"],
    },
    {
      id: 4,
      name: "Whole Grinds",
    },
    {
      id: 5,
      name: "Wet Grinds",
    },
    {
      id: 6,
      name: "Blog",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("");

  const [categoryData, setCategoryData] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [currencyValues, setCurrencyValues] = useState([]);
  const [open, close] = useState(false);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const [currentCountry, setCurrentCountry] = useState([]);

  const [popup, setPopup] = useState(false);

  const fetchData = async () => {
    try {
      const result = await Promise.all([getFilteredcategory(), collectAllCountry(), getCurrency(), getCurrentCountry()]);

      setCategoryData(_.get(result, "[0].data.data", ""));
      setCountryData(_.get(result, "[1].data.data", ""));
      setCurrencyValues(_.get(result, "[2].data.data", ""));
      let currency = _.get(result, `[2].data.data[${_.get(Country.getCountryByCode(_.get(result, "[3].data.country", "")), "currency", "")}]`);

      let current_country = _.get(result, "[1].data.data", []).filter((res) => {
        return res.currency_code === currency.code;
      });
      _.get(current_country, "[0]", "").value = currency.value;

      setCurrentCountry(_.get(current_country, "[0]", ""));

      dispatch(LOAD_COUNTRY_DATAS(_.get(current_country, "[0]", "")));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (path === "/") {
      setTimeout(() => {
        setPopup(true);
      }, 5000);
    }
  }, [path]);

  const getCartCount = async () => {
    try {
      const result = await collectCartCount();
      dispatch(UPDATE_CART_COUNT(_.get(result, "data.data[0].count", "")));
    } catch (err) {}
  };

  useEffect(() => {
    getCartCount();
  }, [_.get(cart_slice, "value", 0)]);

  const checkLoginData = async () => {
    try {
      setLoading(true);
      const result = await Promise.all([checkClientLoginStatus()]);

      if (_.get(result, "[0].data.message", "") === "Invalid token") {
        return localStorage.clear();
      }
      dispatch(LOAD_AUTH_DATAS(_.get(result, "[0].data.data", [])));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLoginData();
  }, []);

  const getWishlistCount = async () => {
    try {
      const result = await collectWishlistCount();
      dispatch(UPDATE_WISHLIST_COUNT(_.get(result, "data.data[0].count", "")));
    } catch (err) {}
  };

  useEffect(() => {
    getWishlistCount();
  }, [_.get(wishlist_slice, "value", 0)]);

  const items = [
    {
      key: "4",
      label: "a danger item",
    },
  ];

  const handleCountry = (res) => {
    try {
      setCurrentCountry(res);
      let newFormation = {
        ...res,
        value: _.get(currencyValues[res.currency_code], "value", ""),
      };
      dispatch(LOAD_COUNTRY_DATAS(newFormation));
    } catch (err) {
      console.log(err);
    }
  };

  const floatingDatas = [
    {
      id: 1,
      name: "Help Center",
      icon: <IconHelper.whatsappIcon className="!text-green-500" />,
      link: "https://wa.me/+919500409740",
    },
    {
      id: 2,
      name: "Account",
      icon: <IconHelper.accountIcon />,
      link: _.isEmpty(auth_slice) ? "/login" : "/my-profile",
    },
    {
      id: 3,
      name: "Cart",
      icon: <IconHelper.cartIcon />,
      link: _.isEmpty(auth_slice) ? "/login" : "/shopping-cart",
    },
    {
      id: 4,
      name: "Wishlist",
      icon: <IconHelper.favIcon />,
      link: _.isEmpty(auth_slice) ? "/login" : "/favorite-items",
    },
  ];

  return (
    <div className=" bg-white center_col_div justify-between">
      {/* top  */}
      <div onMouseEnter={() => setSelectedCategory("")} className="py-4 px-[8vw] center_row_div justify-between w-full shadow border-b-2">
        <div className="center_row_div gap-x-10">
          {TopLayer2.map((res, index) => {
            return (
              <Link href={res.to} key={index} className="text-sm flex items-center hover:!text-primary_color !text-secondary_color">
                {res?.name} <res.icon className="text-lg" />
              </Link>
            );
          })}
        </div>
        <div className="center_row_div gap-x-10">
          {TopLayer.map((res, index) => {
            return (
              <Link href={res.to} key={index} className="text-sm hover:!text-primary_color !text-secondary_color">
                {res?.name}
              </Link>
            );
          })}
        </div>
      </div>
      {/* mid navbar */}
      <div onMouseEnter={() => setSelectedCategory("")} className="center_row_div w-full px-[8vw] justify-between py-4">
        <Link href="/">
          <Image src={Logo} alt="logo" />
        </Link>
        {/* search */}
        <div className="border border-gray-400  w-[400px] center_row_div h-[40px]">
          <input
            onClick={() => {
              setSearch(true);
            }}
            type="text"
            className="w-[300px] h-full border-none outline-none indent-2 placeholder:text-sm"
            placeholder="I am Searching for... "
          />
          <button className="bg-primary_color w-[100px] h-full text-white">Search</button>
        </div>
        {/* profile */}
        <div className="center_row_div gap-x-6">
          <Dropdown
            menu={{
              items: countryData.map((res, index) => {
                return {
                  label: (
                    <div
                      onClick={() => {
                        handleCountry(res);
                      }}
                      className="!text-secondary_color !font-medium"
                    >
                      <Avatar size={"small"} shape="square" src={_.get(res, "flag_url", "")} /> {_.get(res, "currency_code", "")}
                    </div>
                  ),
                  key: res.currency_code,
                };
              }),
            }}
          >
            <div className="!text-sm min-w-[80px] center_row_div  gap-x-2 !cursor-pointer !text-secondary_color !font-medium border px-3 py-1 !shadow-inner">
              <Avatar size={"small"} shape="square" src={_.get(currentCountry, "flag_url", "")} /> {_.get(currentCountry, "currency_code", "")}
            </div>
          </Dropdown>
          {CartIcon.map((res, index) => {
            return (
              <Link href={_.isEmpty(auth_slice) ? "/login" : res.link} key={index} className={`${index === 2 && "pl-4"} relative`}>
                <res.icon className="text-2xl" />
                <div className={`${index === 2 ? "hidden" : "block"} absolute -right-2 -top-2`}>
                  <div className={`size-[20px] ${res?.count > 0 ? "vissible" : "invisible"} capitalize rounded-full bg-primary_color center_row_div text-[10px] text-white`}>{res?.count}</div>
                </div>
              </Link>
            );
          })}

          {_.isEmpty(auth_slice) ? (
            <div className="center_row_div gap-x-2">
              <Link href={"/login"} className="hover:text-primary_color font-medium">
                SignIn
              </Link>
              <span className="text-gray-300">|</span>
              <Link href={"/signup"} className="hover:text-primary_color font-medium">
                Signup
              </Link>
            </div>
          ) : (
            <Link href={"/my-profile"}>
              <Profilecard />
            </Link>
          )}
        </div>
      </div>
      {/* menu */}
      <div className="w-full bg-secondary_color px-[8vw] center_row_div h-[50px] justify-between relative">
        <div className="center_row_div gap-x-4">
          <Link href={"/more/category"} className="w-[200px] h-[50px] bg-white mt-2 rounded-t-lg center_row_div gap-x-2 cursor-pointer">
            <CgMenuLeftAlt />
            <h1>All Categories</h1>
            <IconHelper.DropdownIcon className="text-2xl" />
          </Link>

          <div className="center_row_div gap-x-8 pl-4">
            <Link href={"/"} className=" cursor-pointer text-white">
              Home
            </Link>
            {categoryData.map((res, index) => {
              return (
                <div onMouseEnter={() => setSelectedCategory(res?._id)} key={index} className="text-white gap-x-2">
                  {!_.isEmpty(res.sub_category) ? (
                    <Dropdown
                      menu={{
                        items:
                          selectedCategory === res?._id
                            ? _.get(res, "sub_category", [])?.map((res1, index) => {
                                return {
                                  key: index + 1,
                                  label: (
                                    <Link href={`/explore/${res?._id}/?subcategory=${res1?._id}`} className=" !font-Poppins my-1 hover:!text-primary_color !capitalize">
                                      {res1?.sub_category_name}
                                    </Link>
                                  ),
                                };
                              })
                            : [],
                      }}
                      arrow
                      placement="bottomLeft"
                    >
                      <Link href={`/explore/${res?._id}`} className="center_row_div cursor-pointer capitalize relative">
                        {res.category_name}
                        <IconHelper.DropdownIcon className="!text-lg" />
                      </Link>
                    </Dropdown>
                  ) : (
                    <Link href={`/explore/${res?._id}`} className="capitalize cursor-pointer">
                      {res.category_name}
                    </Link>
                  )}
                </div>
              );
            })}
            <Link href={"/blogs"} className=" cursor-pointer text-white">
              Blogs
            </Link>
          </div>
        </div>
        <button className="rounded bg-white text-sm px-3 py-2 text-secondary_color">Get the App</button>
      </div>

      {search && <SearchProducts searchEnabled={true} setSearch={setSearch} />}

      {/* Floating button */}
      <FloatButton.Group
        trigger="hover"
        className="!left-7"
        open={open}
        onClick={() => {
          close(!open);
        }}
        icon={<IconHelper.BlogComments className="!text-primary_color" />}
      >
        {floatingDatas.map((res, index) => {
          return (
            <Link href={res.link} key={index} target="_blank">
              <FloatButton key={index} className="!my-4 !bg-white" size="large" icon={res.icon} tooltip={res.name} />
            </Link>
          );
        })}
      </FloatButton.Group>
      {/* Initial banner Pop-up */}
      <>
        <Modal
          open={popup}
          onCancel={() => {
            setPopup(false);
          }}
          style={{ background: "transparent" }}
          footer={false}
          width={"60%"}
          className="relative"
          closable={false}
        >
          <div className="min-h-[60vh] gap-y-5 text-white rounded-lg w-full bg-center bg-no-repeat bg-cover popup_image !font-Poppins center_col_div">
            <h1 className="text-5xl uppercase border-4 px-5 py-1 text-white font-bold">FREE SHIPPING OFFER</h1>
            <p className="text-2xl text-center leading-loose">
              Buy our Products $50 & ABOVE <br />
              TO GET FREE SHIPPING WORLD WIDE
            </p>
            <p className="w-[80%] text-lg text-center  leading-loose">
              <span className="bg-primary_color px-3 py-1 rounded-sm">Note</span> : Once your Order reaches above $50; In Check Out page, you could see the FREE SHIPPING Check Box; please check it to make use of this free shipping offer.
            </p>
          </div>
          <div
            onClick={() => {
              setPopup(false);
            }}
            className="size-[50px] cursor-pointer absolute -right-2 -top-2 rounded-full bg-primary_color border-2 border-white center_row_div"
          >
            <IconHelper.crossDelete className="!text-2xl !text-white" />
          </div>
        </Modal>
      </>
    </div>
  );
};

export default Navbar;
