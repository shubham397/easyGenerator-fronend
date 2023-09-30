import React from "react";
import { Button, Form, Input } from "antd";
const onFinish = (values) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("name", values.name);
  urlencoded.append("email", values.email);
  urlencoded.append("password", values.password);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  fetch(
    "https://easy-generator-backend.vercel.app/user/createUser",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => (window.location.href = "/dashboard"))
    .catch((error) => alert(error));
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const validatePassword = (_, value) => {
  if (!value) {
    return Promise.reject("Password is required");
  }

  if (value.length < 8) {
    return Promise.reject("Password must be at least 8 characters long");
  }

  if (!/[A-Za-z]/.test(value)) {
    return Promise.reject("Password must contain at least 1 letter");
  }

  if (!/\d/.test(value)) {
    return Promise.reject("Password must contain at least 1 number");
  }

  if (!/[!@#$%^&*]/.test(value)) {
    return Promise.reject("Password must contain at least 1 special character");
  }

  return Promise.resolve();
};

const SignUp = () => (
  <>
    <h1>Sign Up</h1>
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="E-mail"
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input placeholder="Enter your email" />
      </Form.Item>

      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input your name",
          },
        ]}
      >
        <Input placeholder="Enter your name" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            validator: validatePassword,
          },
        ]}
      >
        <Input.Password placeholder="Enter your password" />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="confirm_password"
        rules={[
          {
            required: true,
            message: "Please input your password again",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (
                getFieldValue("password") !== getFieldValue("confirm_password")
              ) {
                return Promise.reject("Password must be same");
              }
              return Promise.resolve();
            },
          }),
        ]}
      >
        <Input.Password placeholder="Enter your password again" />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Sign Up
        </Button>
        <a href="/" className="link">
          If you have account then click here
        </a>
      </Form.Item>
    </Form>
  </>
);
export default SignUp;
