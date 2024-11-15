"use client";
import React, { useState } from "react";

export default function Counter({
  qtn,
  hanldeIncrement,
  handleDecrement,
  product_id,
  variant_id,
}) {
  return (
    <>
      <div className="qty-icons">
        <button
          onClick={() => handleDecrement(product_id, variant_id)}
          className="size-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md bg-orange-500/5 hover:bg-orange-500 text-orange-500 hover:text-white minus"
        >
          -
        </button>
        <input
          min="0"
          name="quantity"
          value={qtn}
          type="number"
          readOnly
          className="h-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md bg-orange-500/5 hover:bg-orange-500 text-orange-500 hover:text-white pointer-events-none w-16 ps-4 quantity mx-1"
        />
        <button
          onClick={() => hanldeIncrement(product_id, variant_id)}
          className="size-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md bg-orange-500/5 hover:bg-orange-500 text-orange-500 hover:text-white plus"
        >
          +
        </button>
      </div>
    </>
  );
}
