import React, { useState } from "react";
import { Form, Input, Button, DatePicker, Select, message } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { CREATE_PROJECT } from "../../utils/apiUrl/baseUrl";

const { TextArea } = Input;
const { Option } = Select;

interface CreateProjectProps {
  onProjectCreated: () => void;
}

const CreateProjectForm: React.FC<CreateProjectProps> = ({
  onProjectCreated,
}) => {
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: any) => {
    setLoading(true);
    const { title, description, dueDate, semester, mentorId } = values;

    try {
      await axios.post(CREATE_PROJECT, {
        title,
        description,
        dueDate: dueDate.toISOString(),
        semester,
        mentorId,
      });
      message.success("Project created successfully!");
      onProjectCreated();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      message.error("Failed to create project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Project Title"
        name="title"
        rules={[{ required: true, message: "Please enter the project title" }]}
      >
        <Input placeholder="Enter project title" />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[
          { required: true, message: "Please enter the project description" },
        ]}
      >
        <TextArea placeholder="Enter project description" rows={4} />
      </Form.Item>
      <Form.Item
        label="Due Date"
        name="dueDate"
        rules={[{ required: true, message: "Please select the due date" }]}
      >
        <DatePicker
          style={{ width: "100%" }}
          format="YYYY-MM-DD"
          disabledDate={(current) => current && current < dayjs().endOf("day")}
        />
      </Form.Item>
      <Form.Item
        label="Semester"
        name="semester"
        rules={[{ required: true, message: "Please select a semester" }]}
      >
        <Select placeholder="Select semester">
          <Option value="Fall 2024">Fall 2024</Option>
          <Option value="Spring 2025">Spring 2025</Option>
        </Select>
      </Form.Item>
      // TODO: Add mentor dropdown // By getMentors API or hardcode.
      <Form.Item
        label="Mentor ID"
        name="mentorId"
        rules={[{ required: true, message: "Please enter the mentor ID" }]}
      >
        <Input placeholder="Enter mentor ID" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Create Project
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateProjectForm;
