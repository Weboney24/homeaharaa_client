"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FiX } from "../assets/icons/vander";

const ContactModal = ({ url }) => {
  let [modal, setModal] = useState(false);

  return (
    <>
      <div className="mt-5">
        <Link href="#" scroll={false} onClick={() => setModal(true)} data-type="iframe" className="video-play-icon read-more lightbox text-orange-500 font-medium">
          View on Google map
        </Link>
      </div>
      {modal && (
        <div className="w-full h-screen bg-slate-900/80 fixed top-0 left-0 bottom-0 right-0 z-999 flex items-center justify-center">
          <div className="w-full h-full px-5 md:px-40 md-py-20 py-5">
            <iframe src={url} width="100%" height="100%" title="myfram" loading="lazy"></iframe>
          </div>
          <button className="text-slate-400 absolute top-[20px] right-[20px]" onClick={() => setModal(false)}>
            <FiX className="size-5" />
          </button>
        </div>
      )}
    </>
  );
};

export default ContactModal;
