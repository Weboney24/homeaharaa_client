import { emailValidation, formValidation } from "@/helper/form_validation";
import { Button, Form, Input, Rate } from "antd";
import React from "react";

const BlogCommentForms = ({ handleFinish, form, loading }) => {
  return (
    <Form onFinish={handleFinish} form={form} layout="vertical" className="!mt-4 flex flex-wrap justify-between w-full">
      <Form.Item className="w-[48%]" label="Your Name" name="user_name" rules={[formValidation("Enter Your Name")]}>
        <Input placeholder="Name" className="antd_input !w-full" />
      </Form.Item>
      <Form.Item className="w-[48%]" label="Your Email" name="user_email" rules={emailValidation("Enter Your Email")}>
        <Input placeholder="Email" className="antd_input !w-full" />
      </Form.Item>
      <Form.Item className="w-full" label="Your Website" name="user_website">
        <Input placeholder="eg : https://homeaharaa.com" className="antd_input !w-full" />
      </Form.Item>
      <Form.Item label="Your Review" className="w-full" name="comment" rules={[formValidation("Enter Your Review")]}>
        <Input.TextArea placeholder="Comments" className="antd_input !h-[150px] !w-full" />
      </Form.Item>
      <Form.Item className="!w-full">
        <Button loading={loading} htmlType="submit" className="antd_button">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BlogCommentForms;
