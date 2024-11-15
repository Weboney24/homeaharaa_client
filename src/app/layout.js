"use client";
import { DM_Sans } from "next/font/google";
import "./assets/scss/tailwind.scss";
import "./assets/css/materialdesignicons.css";
import { usePathname } from "next/navigation";
import Head from "next/head";

// const dm_sans = DM_Sans({
//   subsets: ["latin"],
//   variable: "--font-dm_sans",
// });

import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/scroll-to-top";
import { Provider } from "react-redux";
import { store } from "./redux/store";
export default function RootLayout({ children }) {
  let path = usePathname();
  let visible = ["login", "signup", "forgot-password", "reset-password", "signup-success", "reset-password", "not-found"].includes(String(path)?.split("/")[1]);

  return (
    <html lang="en" className="light scroll-smooth dm_sans" dir="ltr">
      <Head>
        <title>HomeAharaa - யாம் பெற்ற இன்பம் ! பெறுக இவ்வையகம் !</title>
      </Head>
      <body className={` selection:bg-primary_color selection:text-white  h-screen`}>
        <Provider store={store}>
          {!visible && (
            <div className="!h-[192px] bg-white">
              <Navbar />
            </div>
          )}
          <div>{children}</div>
          <ScrollToTop />
          {!visible && <Footer />}
        </Provider>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </body>
    </html>
  );
}
