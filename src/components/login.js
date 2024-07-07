import React, { useContext } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../Contexts/UserContext';

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
};

const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } }
};

const passwordRules = [{ required: true, message: 'Please input your password!' }];

const emailRules = [
  { required: true, message: 'Please input your email!', whitespace: true },
  { type: 'email', message: 'Please enter a valid email address' }
];

const Login = () => {
  const history = useHistory();
  const { login } = useContext(UserContext);

  const handleSubmit = async (values) => {
    try {
      const { email, password } = values;
      await login(email, password);
      history.push("/"); // Redirect to home page after successful login
    } catch (error) {
      console.error('Login error:', error);
      message.error('Login failed. Please try again.');
    }
  };

  return (<>
    <Form name="login" {...formItemLayout} onFinish={handleSubmit}>
      <Form.Item name="email" label="Email" rules={emailRules}>
        <Input />
      </Form.Item>

      <Form.Item name="password" label="Password" rules={passwordRules}>
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
    <ul>
        <li><Link to="/signup">Register Here</Link></li>
      </ul>
    </>
  );
};

export default Login;
