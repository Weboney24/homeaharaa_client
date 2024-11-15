import _ from "lodash";
import { IconHelper } from "./iconhelper";
import { FiFacebook } from "react-icons/fi";
import { RiTwitterXFill } from "react-icons/ri";
import { SlSocialLinkedin, SlSocialPintarest } from "react-icons/sl";
import { MdOutlineMailOutline } from "react-icons/md";
import { TbBrandWhatsapp } from "react-icons/tb";
import { FaInstagram } from "react-icons/fa";


export const getImageUrl = (res) => {
  return res?.product_type !== "variable_product" ? _.get(res, "images[0].url", "") : _.get(res, "variable_products[0].product_images[0].path", "");
};

export const getProductPrice = (res, variant_id) => {
  if (res?.product_type !== "variable_product") {
    return `${res?.product_selling_price}`;
  } else {

    if (variant_id) {
      let price = _.get(res, "variable_products", []).filter((result) => {
        return result.sku === variant_id
      });

      return Number(price[0]?.Selling_Price);
    }
    let price = _.get(res, "variable_products", []).map((result) => {
      return Number(result.Selling_Price);
    });

    return variant_id ? 10 : `${Math.min(...price)} - ${Math.max(...price)}`;
  }
};


export const getPriceSymbol = () => {
  try {
    console.log(currency_slice)
    return "₹";
  } catch { }
}


export const PRODUCT_IMAGES = (productData, variant, solo) => {
  try {
    if (_.get(productData, "[0].product_type", "") === "variable_product") {

      if (variant) { return _.get(productData, "[0].variable_products", []).filter((res) => { return res.sku === variant; })[0]?.product_images; } else {
        if (solo) { return _.get(productData, "[0].variable_products[0].product_images[0].path", []) }
      }
    } else {
      if (solo) {
        return _.get(productData, "[0].images[0].url", []);
      } else {
        return _.get(productData, "[0].images", []);
      }
    }
  } catch (err) {
    console.log(err);
  }
};


export const PRODUCT_IMAGES_DETAILS = (productData, variant) => {
  try {

    if (_.get(productData, "product_type", "") === "variable_product") {

      return _.get(productData, "variable_products", []).filter((res) => {
        return res.sku === variant;
      })[0]?.product_images;
    } else {
      return _.get(productData, "images", []);
    }
  } catch (err) {
    console.log(err);
  }
};

export const getProductWeight = (res, variant_id) => {
  try {
    if (_.get(res, "[0].product_type", "") !== "variable_product") {
      return [{ weight: _.get(res, "[0].weights[0].weight_name", "") }];
    } else {
      const result = _.get(res, "[0].variable_products", []).map((res) => {
        return {
          weight: res.product_weight,
          variant_id: res.sku,
          field_key: res.field_key,
          product_image: _.get(res, "product_images[0].path", "")
        }
      })
      return result;
    }
  } catch { }
}

export const GET_FINAL_PRICE = (Price_details) => {
  try {
    let final_price = Price_details.map((res) => {
      return Number(res.total_price);
    })
    return _.sum(final_price)
  } catch { }
}

export const GET_PERCENTAGE_PRICE = (originalAmount, percentage) => {

  return Number(originalAmount) * (percentage / 100)
}

export const Tips = [
  {
    id: 1,
    title: "5%",
    value: 5,
  },
  {
    id: 2,
    title: "10%",
    value: 10,
  },
  {
    id: 3,
    title: "15%",
    value: 15,
  },
  {
    id: 4,
    title: "20%",
    value: 20,
  },
  {
    id: 5,
    title: "25%",
    value: 25,
  },
  {
    id: 6,
    title: "Cash",
    different: true,
  },
  {
    id: 7,
    title: "Custom Tip",
    different: true,
  },
  {
    id: 8,
    title: "No Tip",
    different: true,
  },
];

export const PaymentMethods = [
  {
    id: 1,
    icon: IconHelper.cashIcon,
    name: "Online Payment",

  },
  {
    id: 2,
    icon: IconHelper.onlinePaymentIcon,
    name: "Cash on Delivery",

  }
]

export const CouponDetails = [
  {
    id: 1,
    icon: IconHelper.couponIcon,
    name: "I have a Coupon",

  },
  {
    id: 2,
    icon: IconHelper.couponIcon,
    name: "I don't have a Coupon",

  }
]

export const OrderStatusTypes = [
  {
    id: 1,
    name: "placed",
    role: 1,
  },
  {
    id: 2,
    name: "confirmed",
    role: 2,
  },
  {
    id: 3,
    name: "processing",
    role: 2,
  },
  {
    id: 4,
    name: "out for delivery",
    role: 2,
  },
  {
    id: 5,
    name: "completed",
    role: 2,
  },
  {
    id: 6,
    name: "cancelled",
    role: 1,
  },
  // {
  //   id: 7,
  //   name: "exchange requested",
  //   role: 1,
  // },
  // {
  //   id: 8,
  //   name: "exchange approved",
  //   role: 2,
  // },
  // {
  //   id: 9,
  //   name: "exchange rejected",
  //   role: 2,
  // },
  // {
  //   id: 10,
  //   name: "exchange cancelled",
  //   role: 2,
  // },
  // {
  //   id: 11,
  //   name: "refund requested",
  //   role: 1,
  // },
  // {
  //   id: 12,
  //   name: "refund approved",
  //   role: 2,
  // },
  // {
  //   id: 13,
  //   name: "refund requested",
  //   role: 2,
  // },
  // {
  //   id: 14,
  //   name: "refund cancelled",
  //   role: 2,
  // },
];

export const OrderCancelTypes = [
  {
    id: 1,
    name: "placed",
    view: "admin",
    tag: "basic",
  },
  {
    id: 6,
    name: "cancelled",
    view: "customer",
    tag: "basic",
  },
];

export const GET_STATUS_STYLE = (status) => {
  switch (status) {
    case "placed":
      return { bgColor: "bg-blue-100", textColor: "text-blue-600" };
    case "confirmed":
      return { bgColor: "bg-green-100", textColor: "text-green-600" };
    case "processing":
      return { bgColor: "bg-yellow-100", textColor: "text-yellow-600" };
    case "out for delivery":
      return { bgColor: "bg-pink-100", textColor: "text-pink-700" };
    case "completed":
      return { bgColor: "bg-green-500", textColor: "text-white" };
    default:
      return { bgColor: "bg-gray-100", textColor: "text-gray-600" };
  }
};



export const CONVERT_CURRENCY = async (res) => {
  try {
    let price = getProductPrice(res, _.get(res, "variant", ""));
    // getProductPrice(res, _.get(res, "variant", ""))
    if (_.get(res, "product_type", "") === "variable_product") {
      console.log("variable_product", getProductPrice(res, _.get(res, "variant", "")));
      return 10
    } else {
      return await Convert(price).from("USD").to("INR")
    }
    // getProductPrice(res, _.get(res, "variant", ""));
    // console.log(await Convert(1).from("USD").to("INR"));
    return 10;
  } catch { }
};


export const SOCIAL_SHARING = [
  {
    id: 1,
    name: "Facebook",
    icon: FiFacebook,
    url: (url) => { return `https://www.facebook.com/sharer/sharer.php?u=${url}` }
  },
  {
    id: 2,
    name: "Twitter",
    icon: RiTwitterXFill,
    url: (url, title) => { return `https://twitter.com/intent/tweet?text=${title} - ${url}` }
  },
  {
    id: 3,
    name: "LinkedIn",
    icon: SlSocialLinkedin,
    url: (url, title, description) => { return `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${description}`; }

  },
  {
    id: 4,
    name: "Pinterest",
    icon: SlSocialPintarest,
    url: (url, title, description) => { return `https://www.pinterest.com/pin/create/button/?url=${url}&description=${description}`; }
  },
  {
    id: 5,
    name: "Email",
    icon: MdOutlineMailOutline,


    url: "mailto:?subject={TITLE}&body={URL}",

    url: (url, title, description) => { return `mailto:?subject=${title}&body=${url}`; }
  },
  {
    id: 6,
    name: "Whatsapp",
    icon: TbBrandWhatsapp,

    url: (url, title, description) => { return `https://wa.me/?text=${title} - ${url}`; }
  },

]

export const getIngredintFinalTotal = (compositeData) => {
  try {
    console.log(compositeData, "compositeData")
    let main_ingredient_price = _.sum(_.get(compositeData, "main_ingredient", []).map((res) => {
      return Number(res.current_unit?.price) * res.quantity
    }))
    let aditional_ingredient_price = _.sum(_.get(compositeData, "additional_ingredient", []).filter((res) => { return res.active === true }).map((res) => {
      return Number(res.current_unit?.price) * res.quantity
    }))

    return main_ingredient_price + aditional_ingredient_price
  } catch (e) {
    console.log(e)
  }
}