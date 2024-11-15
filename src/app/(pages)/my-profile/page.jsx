"use client";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Spin } from "antd";
import { emailValidation, formValidation, MobileNumberValidation } from "@/helper/form_validation";
import { useSelector } from "react-redux";
import _ from "lodash";
import { IconHelper } from "@/helper/iconhelper";
import { ERROR_NOTIFICATION, SUCCESS_NOTIFICATION } from "@/helper/notification_helper";
import { updateUser } from "@/helper/api_helper";
import { LOAD_AUTH_DATAS } from "@/app/redux/auth_slice";
import { useDispatch } from "react-redux";
import { Country } from "country-state-city";

export default function UserAccount() {
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const userdata = useSelector((data) => data?.auth_slice);

  const [loading, setLoading] = useState(false);

  const [allCountry] = useState(Country.getAllCountries());

  const prpareForm = () => {
    setLoading(true);
    form.setFieldsValue({
      first_name: _.get(userdata, "value.first_name", ""),
      last_name: _.get(userdata, "value.last_name", ""),
      user_name: _.get(userdata, "value.user_name", ""),
      user_email: _.get(userdata, "value.user_email", ""),
      mobile_number: _.get(userdata, "value.mobile_number", ""),
      alternate_mobile_number: _.get(userdata, "value.alternate_mobile_number", ""),
      country_details: _.get(userdata, "value.country_details", ""),
      gender_details: _.get(userdata, "value.gender_details", ""),
    });
    setLoading(false);
  };

  useEffect(() => {
    prpareForm();
  }, [_.get(userdata, "value.user_email", "")]);

  const handleFinish = async (values) => {
    try {
      setLoading(true);
      const result = await updateUser(values);
      SUCCESS_NOTIFICATION(result);
      dispatch(LOAD_AUTH_DATAS(_.get(result, "data.data", [])));
    } catch (err) {
      ERROR_NOTIFICATION(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Spin spinning={loading} className="w-full">
        <div className="w-full">
          <div className="center_row_div justify-between">
            <h5 className="text-lg font-semibold  text-primary_color">Account Details :</h5>
          </div>
        </div>
        {/* form */}
        <Form form={form} layout="vertical" className="!pt-4 flex flex-wrap gap-y-2 gap-x-1 !w-full" onFinish={handleFinish}>
          <Form.Item className="!w-[49%]" label="First Name" name="first_name" rules={[formValidation("Enter First Name")]}>
            <Input placeholder="First Name" className="antd_input !w-[100%] !font-Poppins !text-lg" />
          </Form.Item>

          <Form.Item className="!w-[49%]" label="Last name" name="last_name" rules={[formValidation("Enter Last name")]}>
            <Input placeholder="Last name" className="antd_input !w-[100%] !font-Poppins !text-lg" />
          </Form.Item>

          <Form.Item className="!w-[49%]" label="Mobile Number" name="mobile_number" rules={MobileNumberValidation("Enter Mobile Number")}>
            <Input placeholder="Mobile Number" type="number" className="antd_input !w-[100%] !font-Poppins !text-lg" />
          </Form.Item>

          <Form.Item className="!w-[49%]" label="Alternate Mobile Number" name="alternate_mobile_number" rules={MobileNumberValidation("Enter Alternate Mobile Number")}>
            <Input type="number" placeholder="Alternate Mobile Number" className="antd_input !w-[100%] !font-Poppins !text-lg" />
          </Form.Item>

          <Form.Item className="!w-[49%]" label="Country" name="country_details" rules={[formValidation("Select Your Country")]}>
            <Select className="antd_input w-[100%]" showSearch placeholder="Select your country">
              {allCountry.map((res, index) => {
                return (
                  <Select.Option key={index} value={res.name}>
                    <h1 className="!font-Poppins !text-lg"> {res?.name}</h1>
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item className="!w-[49%]" label="Gender" name="gender_details" rules={[formValidation("Select Your Gender")]}>
            <Select className="antd_input w-[100%] placeholder:!font-Poppins placeholder:!text-lg" showSearch placeholder="Select your Gender">
              {["Male", "Female", "Others"].map((res, index) => {
                return (
                  <Select.Option key={index} value={res}>
                    <h1 className="!font-Poppins !text-lg"> {res}</h1>
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <div className="!w-full">
            <Form.Item className="!w-[100%]" label="Diaplay Name" name="user_name" rules={[formValidation("Enter Display Name")]}>
              <Input placeholder="Diaplay Name" className="antd_input !w-[100%] !font-Poppins !text-lg" />
            </Form.Item>
            <div className="!font-Poppins pb-4 center_row_div justify-start">
              <IconHelper.infoIcon className="text-primary_color" /> This will be how your name will be displayed in the account section and in reviews
            </div>
          </div>
          <Form.Item className="!w-[100%]" label="Email Address" name="user_email" rules={emailValidation("Enter Valid Email")}>
            <Input placeholder="Email Address" className="antd_input !w-[100%] !font-Poppins !text-lg" />
          </Form.Item>
          <Form.Item className="!w-[50%]">
            <Button htmlType="submit" className="antd_button">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
}
