import Logo from "../assets/logo/Logo.png";
import FooterPayment from "../assets/images/payment.png";
import Products from "../assets/images/sweet.jpg";
import CartImage from "../assets/login/CartImage.png";
import MobileImage from "../assets/signup/NFCrIV.png";
import BannerImg from "../assets/banner/assorted_sweets.jpg";
import ShopGoodsImage from "../assets/about/image_1.png";
import FounderImage from "../assets/about/smiley-businesswomen.png";
import ChefImage from "../assets/about/image_2.png";
import CakeDeceratorImage from "../assets/about/image_3.png";
import CustomerServiceImage from "../assets/about/images_4.png";
import CashierImage from "../assets/about/image_5.png";
import AmlaPowderImage from "../assets/blogs/amla-pwdr-250x250.jpg";
import PalakkeeraiImage from "../assets/blogs/palak-keer-250x250.jpg";
import VallaraiKeeraiPowder from "../assets/blogs/vallara-keer-250x250.jpg";
import PulichaKeeraiPowder from "../assets/blogs/pulicha-keer-250x250.jpg";
import SigapuThanduKeeraiImage from "../assets/blogs/sigapu-thandu-keer-250x250.jpg";
import PonnanganiKeeraiImage from "../assets/blogs/04-D-0V6A9554-250x250.jpg";
import ThanduKeeraiImage from "../assets/blogs/001-250x250.jpg";
import MolaKeeraiPowderImage from "../assets/blogs/mulai-keerai-250x250.jpg";
import AraiKeeraiPowderImage from "../assets/blogs/arai-keerai-250x250.jpg";
import MilaguThakkaliKeeraiPowderImage from "../assets/blogs/05-E-0V6A9559-250x250.jpg";
import VenthayaKeeraiPowderImage from "../assets/blogs/venthaya-keer-250x250.jpg";
import SiruKeeraiPowderImage from "../assets/blogs/02-B0V6A9547-250x250.jpg";

// empty
import EmptyImage from "../app/assets/images/Empty.png";

// banner
import Banner1 from "../assets/images/banner.png";
import Banner3 from "../assets/images/banner6.jpg";
import Banner7 from "../assets/images/banner4.webp";
import _ from "lodash";

// category

import Sweet from "../assets/category/sweet.jpg";
import Spices from "../assets/category/spices.jpg";
import Utensils from "../assets/category/utensils.jpg";
import Whole from "../assets/category/whole.jpg";
import Grinder from "../assets/category/grinder.jpg";

// product

import Product1 from "../assets/images/product1.jpg";
import Product2 from "../assets/images/product2.jpg";
import Product3 from "../assets/images/product3.png";
import Product4 from "../assets/images/product4.png";
import Product5 from "../assets/images/product5.png";
import Product6 from "../assets/images/product6.jpg";
import Product7 from "../assets/images/product7.png";
import Product8 from "../assets/images/product8.jpg";
import Product9 from "../assets/images/product1.jpg";

// transparent
import Product11 from "../assets/images/1.jpg";
import Product12 from "../assets/images/2.jpg";
import Product13 from "../assets/images/3.jpg";
import Product14 from "../assets/images/4.jpg";
import Product15 from "../assets/images/5.jpg";
import Product16 from "../assets/images/6.jpg";

import Wave from "../assets/images/1.jpg";
import Login from "../assets/signup/login.png";
import Signup from "../assets/images/back.jpg";

// payment 
import Visa from '../assets/logo/visa.png';
import MasterCard from '../assets/logo/mastercard.png';
import Razerpay from '../assets/logo/razerpay.png';
import Stripe from '../assets/logo/stripe.jpg';
import Skrill from '../assets/logo/skrill.png';
import Paypal from '../assets/logo/paypal.jpg';

// about us 
import AboutAnimation from '../assets/logo/aboutus-animate.gif'


export const ImageHelper = {
  Logo: Logo,
  FooterPayment: FooterPayment,
  Sweet: Sweet,
  Spices: Spices,
  Utensils: Utensils,
  Whole: Whole,
  Grinder: Grinder,
  Product1: Product1,
  Product2: Product2,
  Product3: Product3,
  Product4: Product4,
  Product5: Product5,
  Product6: Product6,
  Product7: Product7,
  Product8: Product8,
  Product9: Product9,
  Product11: Product11,
  Product12: Product12,
  Product13: Product13,
  Product14: Product14,
  Product15: Product15,
  Product16: Product16,
  CartImage: CartImage,
  MobileImage: MobileImage,
  BannerImg: BannerImg,
  ShopGoodsImage: ShopGoodsImage,
  FounderImage: FounderImage,
  ChefImage: ChefImage,
  CakeDeceratorImage: CakeDeceratorImage,
  CustomerServiceImage: CustomerServiceImage,
  CashierImage: CashierImage,
  AmlaPowderImage: AmlaPowderImage,
  PalakkeeraiImage: PalakkeeraiImage,
  VallaraiKeeraiPowder: VallaraiKeeraiPowder,
  PulichaKeeraiPowder: PulichaKeeraiPowder,
  SigapuThanduKeeraiImage: SigapuThanduKeeraiImage,
  PonnanganiKeeraiImage: PonnanganiKeeraiImage,
  ThanduKeeraiImage: ThanduKeeraiImage,
  MolaKeeraiPowderImage: MolaKeeraiPowderImage,
  AraiKeeraiPowderImage: AraiKeeraiPowderImage,
  MilaguThakkaliKeeraiPowderImage: MilaguThakkaliKeeraiPowderImage,
  VenthayaKeeraiPowderImage: VenthayaKeeraiPowderImage,
  SiruKeeraiPowderImage: SiruKeeraiPowderImage,
  Wave: Wave,
  Login: Login,
  Signup: Signup,
  EmptyImage: EmptyImage,
  Banner1: Banner1,
  Visa: Visa,
  MasterCard: MasterCard,
  Razerpay: Razerpay,
  Stripe: Stripe,
  Skrill: Skrill,
  Paypal: Paypal,
  AboutAnimation: AboutAnimation
};

export const BannerImages = [
  {
    id: 1,
    pic: Banner1,
  },
  // {
  //   id: 3,
  //   pic: Banner3,
  // },
  // {
  //   id: 4,
  //   pic: Banner7,
  // },
];


export const PaymentLogo = [
  {
    id: 1,
    url: ImageHelper.Razerpay,
  },
  // {
  //   id: 2,
  //   url: ImageHelper.Paypal,
  // },
  {
    id: 3,
    url: ImageHelper.Stripe,
  },
  {
    id: 4,
    url: ImageHelper.MasterCard,
  },
  {
    id: 5,
    url: ImageHelper.Visa,
  },
];