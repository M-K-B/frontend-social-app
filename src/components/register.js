import React from 'react';
import { Form, Input, Button, message } from 'antd';

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
};
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    return new Promise((resolve, reject) => {
      return reject(response);
    });
  }
}

function json(response) {
  return response.json();
}

const emailRules = [
  { type: 'email', message: 'The input is not valid E-mail!' },
  { required: true, message: 'Please input your E-mail!' }
];

const passwordRules = [
  { required: true, message: 'Please input your password!' }
];

const confirmRules = [
  { required: true, message: 'Please confirm your password!' },
  ({ getFieldValue }) => ({
    validator(rule, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject('The passwords that you entered do not match!');
    }
  })
];

const usernameRules = [
  { required: true, message: 'Please input a unique username!', whitespace: true },
  { min: 4, message: 'Username must be at least 4 characters long' }
];

const firstNameRules = [
  { required: true, message: 'Missing your First name!', whitespace: true },
  { min: 2, message: 'First must be at least 2 characters long' },
  { pattern: /^[^\d]+$/, message: 'First name MUST NOT contain numbers' }
];

const lastNameRules = [
  { required: true, message: 'Missing your Last name!', whitespace: true },
  { min: 2, message: 'Lastname must be at least 2 characters long' },
  { pattern: /^[^\d]+$/, message: 'Last name MUST NOT contain numbers' }
];

class Register extends React.Component {
  handleSubmit = async (values) => {
    const { ...formData } = values;

    fetch('http://localhost:8001/register', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(status)
      .then(json)
      .then((data) => {
        message.success("User registered successfully");
      })
      .catch((error) => {
        message.error("Failed to register user");
      });
  }

  render() {
    return (
      <Form name="register" {...formItemLayout} onFinish={this.handleSubmit}>

        <Form.Item name="username" label="Username" rules={usernameRules}>
          <Input />
        </Form.Item>

        <Form.Item name="email" label="E-mail" rules={emailRules}>
          <Input />
        </Form.Item>

        <Form.Item name="firstName" label="First name" rules={firstNameRules}>
          <Input />
        </Form.Item>

        <Form.Item name="lastName" label="Last name" rules={lastNameRules}>
          <Input />
        </Form.Item>

        <Form.Item name="password" label="Password" rules={passwordRules}>
          <Input.Password />
        </Form.Item>

        <Form.Item name="confirmedPassword" label="Confirm Password" rules={confirmRules}>
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Register;
