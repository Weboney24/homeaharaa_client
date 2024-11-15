"use client";
import { formValidation } from "@/helper/form_validation";
import { Button, Divider, Form, Input, Modal, Select, Spin, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { Country, State } from "country-state-city";
import _ from "lodash";
import { ERROR_NOTIFICATION, MESSAGE_HANDLERS, SUCCESS_NOTIFICATION } from "@/helper/notification_helper";
import { addDeliveryAddress, deleteMyDeliveryAddress, getMyDeliveryAddress, updateMyDeliveryAddress } from "@/helper/api_helper";
import { IconHelper } from "@/helper/iconhelper";
import Addresscard from "../../component/Cards/Addresscard";
import EmptyData from "../../component/EmptyData";
import DeliveryAddressForm from "../../component/Forms/DeliveryAddressForm";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const DeliveryAddress = () => {
  const searchParams = useSearchParams();

  const [form] = Form.useForm();

  const addressType = [
    {
      id: 1,
      name: "Home Address",
      icon: IconHelper.homeIcon,
    },
    {
      id: 2,
      name: "Office Address",
      icon: IconHelper.officeIcon,
    },
  ];

  const router = useRouter();

  const [current_address, set_CurrentAddress] = useState(_.get(addressType, "[0].name", ""));
  const [open, setOpen] = useState(Boolean(searchParams.get("add")) || false);
  const [allDeliveryAddresss, setAlLDeliveryAddress] = useState([]);
  const [allCountry] = useState(Country.getAllCountries());
  const [allState, setAllState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");

  const handleCountryChange = (value) => {
    try {
      setAllState([]);
      form.setFieldsValue({
        state: "",
      });
      const country_flag = allCountry.filter((country) => {
        return country.name === value;
      });
      const Filtered_States = State.getAllStates().filter((res) => {
        return res.countryCode === _.get(country_flag, "[0].isoCode", "");
      });
      setAllState(Filtered_States);
    } catch {}
  };

  const handleFinish = async (values) => {
    try {
      setLoading(true);
      values.addressType = current_address;
      let result = "";
      if (id) {
        result = await updateMyDeliveryAddress(values, id);
      } else {
        result = await addDeliveryAddress(values);
      }
      SUCCESS_NOTIFICATION(result);
      handleCancel();
      fetchData();
      if (Boolean(searchParams.get("add")) || false) {
        router.push("/checkout");
      }
    } catch (err) {
      ERROR_NOTIFICATION(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
    set_CurrentAddress(_.get(addressType, "[0].name", ""));
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getMyDeliveryAddress();
      setAlLDeliveryAddress(_.get(result, "data.data", []));
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const result = await deleteMyDeliveryAddress(id);
      SUCCESS_NOTIFICATION(result);
      fetchData();
    } catch (err) {
      ERROR_NOTIFICATION(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    setOpen(true);
    form.setFieldsValue(id);
    set_CurrentAddress(id.addressType);
    setId(id?._id);
  };

  let props = {
    form: form,
    handleFinish: handleFinish,
    set_CurrentAddress: set_CurrentAddress,
    handleCountryChange: handleCountryChange,
    allCountry: allCountry,
    handleCancel: handleCancel,
    addressType: addressType,
    current_address: current_address,
    allState: allState,
  };

  return (
    <Spin spinning={loading} className="w-full">
      <div className="w-full">
        <div className="center_row_div justify-between">
          <h5 className="text-lg font-semibold  text-primary_color">Delivery Address :</h5>
          <Tag
            onClick={() => {
              setOpen(true);
            }}
            className="cursor-pointer bg-primary_color !text-white !border-transparent !font-Poppins"
          >
            Add new Address
          </Tag>
        </div>
        <p className="text-slate-400 mt-4">The following addresses will be used on the checkout page</p>
      </div>
      <Divider />
      <div className="flex flex-col gap-y-2 w-full" id="add_delivery_address">
        {_.isEmpty(allDeliveryAddresss) ? (
          <EmptyData message={MESSAGE_HANDLERS.EMPTY_DELIVERY_ADDRESS} porduct={false} />
        ) : (
          allDeliveryAddresss.map((res, index) => {
            return <Addresscard key={index} res={res} handleDelete={handleDelete} handleEdit={handleEdit} />;
          })
        )}
      </div>
      <Modal open={open} footer={false} closable={false} width={600} title={<div className="text-primary_color !font-Poppins">{id ? "Edit" : "Add New"} Delivery Address</div>} destroyOnClose>
        <DeliveryAddressForm {...props} />
      </Modal>
    </Spin>
  );
};

export default DeliveryAddress;
