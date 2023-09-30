import React, { useState } from "react";
import { Button, Form, Input } from "antd";

const SignIn = () => {
  const [isError, setIsError] = useState(false);

  const onFinish = (values) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("email", values.email);
    urlencoded.append("password", values.password);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(
      "https://easy-generator-backend.vercel.app/user/login",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "false") {
          setIsError(true);
        } else {
          window.location.href = "/dashboard";
        }
      })
      .catch((error) => alert(error));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <h1>Sign In </h1>
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
          <Input placeholder="Enter your Email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        {isError && (
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <label style={{ color: "red" }}>
              Either email or password is incorrect
            </label>
          </Form.Item>
        )}

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Sign In
          </Button>
          <a className="link" href="/signup">
            Don't have account then click here
          </a>
        </Form.Item>
      </Form>
    </>
  );
};
export default SignIn;
