"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const GetSymbol = ({ custom }) => {
  let currency_slice = useSelector((data) => data.country_slice);
  const [symbol, setSymbol] = useState("");

  useEffect(() => {
    setSymbol(_.get(currency_slice, "value.currency_symbol", ""));
  }, [_.get(currency_slice, "value.currency_code", "")]);

  return custom || symbol;
};

export default GetSymbol;
