import React, { useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { studentService } from '../../../services/studentService';
import { CreateStudentType } from '../../../types/student.types';

const { Option } = Select;

const majors = [
  { majorId: '903B6085-4CC3-47F3-BBDD-0F8319E5AABB', label: 'SE' },
  { majorId: '71577EAF-EBF1-4B23-A48D-CF8561B1C7DB', label: 'SS' },
  { majorId: 'DFDB83A4-18E0-447E-9EC8-7C8B39EE6F3A', label: 'SA' }
];

const CreateStudent: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (student: CreateStudentType) => {
    setLoading(true);
    try {
      const result = await studentService.createStudent(student);
      if (result.isSuccess) {
        message.success('Student created successfully');
        form.resetFields();
      } else {
        message.error(result.message)
      }
      
    } catch {
      message.error('Failed to create student');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please enter the email' }]}
        >
          <Input placeholder="user@example.com" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter the password' }]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[{ required: true, message: 'Please enter the full name' }]}
        >
          <Input placeholder="Enter full name" />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: 'Please select the gender' }]}
        >
          <Select placeholder="Select gender">
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Major"
          name="majorId"
          rules={[{ required: true, message: 'Please select the major' }]}
        >
          <Select placeholder="Select major">
            {majors.map((major) => (
              <Option key={major.majorId} value={major.majorId}>
                {major.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="University"
          name="university"
          rules={[{ required: true, message: 'Please enter the university' }]}
        >
          <Input placeholder="Enter university" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create Student
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateStudent;
