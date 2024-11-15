import { formValidation } from "@/helper/form_validation";
import { Button, Form, Input, Select } from "antd";
import _ from "lodash";
import React from "react";

const DeliveryAddressForm = ({ form, handleFinish, set_CurrentAddress, allState, handleCountryChange, allCountry, handleCancel, addressType, current_address }) => {
  return (
    <Form form={form} layout="vertical" className="!pt-4 flex flex-col gap-y-2" onFinish={handleFinish}>
      <Form.Item>
        <div className="center_row_div gap-x-4 justify-start">
          {addressType.map((res, index) => {
            return (
              <div
                onClick={() => {
                  set_CurrentAddress(res.name);
                }}
                key={index}
                className={`antd_input ${current_address === res.name ? "!bg-primary_color !text-white" : ""} !border !center_row_div gap-x-2 !font-Poppins !text-md cursor-pointer`}
              >
                <res.icon /> {res.name}
              </div>
            );
          })}
        </div>
      </Form.Item>
      <div className="center_row_div gap-x-4 justify-start">
        <Form.Item className="!w-[50%]" label="First Name" name="first_name" rules={[formValidation("Enter First Name")]}>
          <Input placeholder="First Name" className="antd_input !w-[100%]" />
        </Form.Item>
        <Form.Item className="!w-[50%]" label="Last name" name="last_name" rules={[formValidation("Enter Last name")]}>
          <Input placeholder="Last name" className="antd_input !w-[100%]" />
        </Form.Item>
      </div>
      <Form.Item className="!w-[100%]" label="Street Address" name="street_address" rules={[formValidation("Enter Street Address")]}>
        <Input.TextArea placeholder="Street Address" className="antd_input !w-[100%] !h-[50px]" />
      </Form.Item>
      <Form.Item className="!w-[100%]" label="Town / City" name="town_city" rules={[formValidation("Enter Town / City")]}>
        <Input placeholder="Town / City" className="antd_input !w-[100%]" />
      </Form.Item>
      <Form.Item className="!w-[100%]" label="Country / Region" name="country_region" rules={[formValidation("Enter Country / Region")]}>
        <Select
          className="antd_input !w-[100%]"
          showSearch
          onChange={(e) => {
            handleCountryChange(e);
          }}
          placeholder="Country / Region"
        >
          {allCountry.map((res, index) => {
            return (
              <Select.Option key={index} value={res.name}>
                {res.name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
      {!_.isEmpty(allState) && (
        <Form.Item className="!w-[100%]" label="State" name="state" rules={[formValidation("Enter State")]} placeholder="State">
          <Select className="antd_input !w-[100%]" showSearch>
            {allState.map((res, index) => {
              return (
                <Select.Option key={index} value={res.name}>
                  {res.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
      )}

      <Form.Item className="!w-[100%]" label="Pincode" name="pincode" rules={[formValidation("Enter Pincode")]}>
        <Input placeholder="Pincode" className="antd_input !w-[100%]" />
      </Form.Item>
      <Form.Item className="!w-[100%]" label="Mobile Number" name="mobile_number" rules={[formValidation("Enter Mobile Number")]}>
        <Input type="number" placeholder="Mobile Number" className="antd_input !w-[100%]" />
      </Form.Item>
      <div className="center_row_div gap-x-4 justify-start  !mt-1">
        <Form.Item className="!w-[50%]">
          <Button htmlType="submit" className="antd_button">
            Save
          </Button>
        </Form.Item>
        <Form.Item className="!w-[50%]">
          <Button onClick={handleCancel} className="antd_button !bg-secondary_color">
            Cancel
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default DeliveryAddressForm;
