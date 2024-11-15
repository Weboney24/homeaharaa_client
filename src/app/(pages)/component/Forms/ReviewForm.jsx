import { emailValidation, formValidation } from "@/helper/form_validation";
import { Button, Form, Input, Rate } from "antd";
import React from "react";

const ReviewForm = ({ handleFinish, form }) => {
  return (
    <Form onFinish={handleFinish} form={form} layout="vertical" className="!mt-4 flex flex-wrap justify-between w-full">
      <Form.Item initialValue={4.5} label="Your Ratings" className="w-full" name="rating" rules={[formValidation("Select Your ratings")]}>
        <Rate allowHalf />
      </Form.Item>
      <Form.Item className="w-[48%]" label="Your Name" name="user_name" rules={[formValidation("Enter Your Name")]}>
        <Input placeholder="Name" className="antd_input !w-full" />
      </Form.Item>
      <Form.Item className="w-[48%]" label="Your Email" name="user_email" rules={emailValidation("Enter Your Email")}>
        <Input placeholder="Email" className="antd_input !w-full" />
      </Form.Item>
      <Form.Item label="Your Review" className="w-full" name="comment" rules={[formValidation("Enter Your Review")]}>
        <Input.TextArea placeholder="Review" className="antd_input !h-[150px] !w-full" />
      </Form.Item>
      <Form.Item className="!w-full">
        <Button htmlType="submit" className="antd_button">
          Post
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ReviewForm;
