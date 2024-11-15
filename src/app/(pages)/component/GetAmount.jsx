"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const GetAmount = ({ value, custom }) => {
  let currency_slice = useSelector((data) => data.country_slice);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    setAmount(Number(custom || _.get(currency_slice, "value.value", "")) * Number(value));
  }, [_.get(currency_slice, "value.currency_code", ""), value]);

  return Number(amount).toFixed(2);
};

export default GetAmount;
