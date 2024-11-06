import React, { useCallback, useState } from "react";
import { Form, Input, Button, DatePicker, Select, message } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { CREATE_PROJECT } from "../../utils/apiUrl/baseUrl";
import { MentorType } from "../../types/user.types";
import { mentorService } from "../../services/mentorService";
import MentorCard from "../mentor/MentorCard";
import { debounce } from "lodash";
import { projectService } from "../../services/projectService";
import { useNavigate } from "react-router-dom";
import paths from "../../routes/path";

const { TextArea } = Input;
const { Option } = Select;

interface CreateProjectProps {
  onProjectCreated: () => void;
}

const CreateProjectForm: React.FC<CreateProjectProps> = ({
  onProjectCreated,
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<string>("");
  const [mentorList, setMentorList] = useState<MentorType[]>([]);
  const [form] = Form.useForm(); // Create form instance
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: any) => {
    setLoading(true);
    const { title, description, dueDate, semester } = values;

    try {
      const projectData = {
        title, 
        description, 
        dueDate: dueDate.toISOString(),
        semester,
        mentorId: selectedMentor
      }
      const result = await projectService.createProject(projectData)
      message.success("Project created successfully!");
      form.resetFields(); // Clear form fields after success
      setSelectedMentor(""); // Reset selected mentor
      navigate(paths.projectDetail.replace(":id", result.responseModel.projectId)); 
      onProjectCreated();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      message.error("Failed to create project.");
      form.resetFields(); // Clear form fields after success
      setSelectedMentor(""); // Reset selected mentor
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = useCallback(
    debounce((value: string) => {
      if (value) {
        searchMentor(value);
      } else {
        setMentorList([]);
      }
    }, 500),
    []
  );

  const searchMentor = async (value: string) => {
    try {
      const response = await mentorService.searchMentor(value);
      setMentorList(response);
    } catch (err) {
      console.log(err);
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
      <Form.Item label="Mentor" name="mentorId" rules={[{ required: true, message: "The project must have a mentor" }]}>
        <div>
          <Select
            showSearch
            placeholder="Search for a mentor"
            value={selectedMentor}
            onSearch={handleSearch}
            onChange={(value) => setSelectedMentor(value)}
            className="w-3/4"
            filterOption={false}
          >
            {mentorList.map((mentor) => (
              <Select.Option key={mentor.mentorId} value={mentor.mentorId}>
                {`${mentor.fullName} (${mentor.email})`}
              </Select.Option>
            ))}
          </Select>

          <div
            className={`transition-all duration-300 ${
              selectedMentor ? "opacity-100" : "opacity-0 h-0"
            }`}
          >
            {selectedMentor && <MentorCard mentorId={selectedMentor} />}
          </div>
        </div>
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
