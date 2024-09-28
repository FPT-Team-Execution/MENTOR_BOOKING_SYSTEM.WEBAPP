import React, { useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, Select, Spin } from 'antd';
import { studentRegister, confirmEmail } from '../../services/authService';
import useNotification from 'antd/es/notification/useNotification';

type FieldType = {
  email: string;
  password: string;
  fullName: string;
  gender: string;
  majorId: string;
  university: string;
  industry: string;
  role: string;
};

type ConfirmToken = {
  email: string;
  token: string;
};

const majors = [{
  marjorId: 'C7DDCF7F-4A55-431B-8BC7-136C6E3844F3',
  label: 'SE'
}, 
{
  marjorId: 2,
  label: 'SS'
}, 
{
  marjorId: 3,
  label: 'SA'
}];

const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const App: React.FC = () => {
  const [api, contextHolder] = useNotification();
  const [isConfirmToken, setIsConfirmToken] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  const onFinish: FormProps<FieldType>['onFinish'] = async (values: FieldType) => {
    setIsLoading(true); // Start loading
    try {
      values.industry = 'Software';
      values.role = 'Student';
      const { res } = await studentRegister(values);
      if (res?.data.isSuccess) {
        setIsConfirmToken(true);
        api.open({
          message: 'Notification',
          description:
            'Register sucessfully!',
          duration: 5,
        })
      } else {
        api.open({
          message: 'Notification',
          description: res?.data.message,
          duration: 5,
        })
      }
    } catch {
      api.open({
        message: 'Notification',
        description:
          'Something went wrong! Please try again.',
        duration: 5,
      })
    } finally {
      setIsLoading(false); // End loading
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const confirmToken: FormProps<ConfirmToken>['onFinish'] = async (values) => {
    setIsLoading(true);
    const { res, err } = await confirmEmail(values) 
    if (res) {
      api.open({
        message: 'Notification',
        description: res?.data.message,
        duration: 5,
      })
    }
    if (err) {
      api.open({
        message: 'Notification',
        description:
          'Something went wrong! Please try again.',
        duration: 5,
      })
    }
    setIsLoading(false);
  };

  return (
    <div className=''>
    {contextHolder}
    <div className='flex justify-center h-screen bg-gray-50 relative'>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-10">
          <Spin size="large" />
        </div>
      )}
      
      <div className={`w-1/2 self-center bg-white rounded-lg ring-1 ring-slate-500 shadow-md p-6 relative ${isLoading ? 'opacity-50' : ''}`}>
        {!isConfirmToken ? (
          <Form
            className=''
            name="basic"
            {...formItemLayout}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className='flex justify-center'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
                <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
                <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
              </svg>
            </div>
            <p className='text-lg mb-10 font-bold'>Welcome to Booking Mentor System</p>

            <Form.Item<FieldType>
              label="Full Name"
              name="fullName"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your mail!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The new password that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: 'Please select gender!' }]}
            >
              <Select placeholder="select your gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="majorId"
              label="Major"
              rules={[{ required: true, message: 'Please select major!' }]}
            >
              <Select placeholder="select your major">
                {majors.map(major => (<Option key={major.marjorId} value={major.marjorId}>{major.label}</Option>))}
              </Select>
            </Form.Item>

            <Form.Item<FieldType>
              label="University"
              name="university"
              rules={[{ required: true, message: 'Please input your university!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <Form
            name="basic"
            {...formItemLayout}
            onFinish={confirmToken}
            autoComplete="off"
          >
            <h2 className='text-lg font-bold'>Confirm Email</h2>
            <Form.Item<ConfirmToken>
              label="Email"
              name="email"
            >
              <Input readOnly />
            </Form.Item>
            <Form.Item<ConfirmToken>
              label="Token"
              name="token"
              rules={[{ required: true, message: 'Please input token!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Confirm
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
    </div>
  );
};

export default App;
