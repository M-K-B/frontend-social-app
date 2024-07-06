import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useHistory } from "react-router-dom";

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
};
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

const passwordRules = [
  { required: true, message: 'Please input your password!' }
];

const emailRules = [
  { required: true, message: 'Please input your email!', whitespace: true },
  { type: 'email', message: 'Please enter a valid email address' }
];

const Login = () => {
  const history = useHistory();

  const handleSubmit = async (values) => {
    try {
      const { email, password } = values;
      const response = await fetch('http://localhost:8001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Login successful
        localStorage.setItem('jwtToken', data.token);  // Store token in localStorage
        history.push("/");  // Redirect to home page after successful login
      } else {
        // Login failed
        message.error(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error('An error occurred during login. Please try again.');
    }
  };

  return (
    <>
      <Form name="login" {...formItemLayout} onFinish={handleSubmit}>
        <Form.Item name="email" label="Email" rules={emailRules}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={passwordRules}>
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Login</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
