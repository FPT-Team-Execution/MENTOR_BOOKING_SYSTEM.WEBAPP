/* eslint-disable @typescript-eslint/no-unused-vars */
import moment from "moment";
import React, { lazy, useState } from "react";
import {
  Form,
  Table,
  message,
  Modal,
  Input,
  Button,
  Select,
  DatePicker,
  Checkbox,
  Switch,
  Image,
  Upload,
  UploadFile,
  GetProp,
  UploadProps,
} from "antd";
import { MentorType } from "../../types/user.types";
import { mentorService } from "../../services/mentorService";
import { useRequest } from "ahooks";
import { PageRequestModel, PageResponseModel } from "../../types/common.types";
import { EditOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import axiosInstance from "../../utils/axios/axiosInstance";
import { RcFile } from "antd/es/upload";
import { delay } from "lodash";

const { Option } = Select;
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const MentorTable: React.FC = () => {
  const [query, setQuery] = useState<PageRequestModel>({
    page: 1,
    size: 10,
    sort: "asc",
  });
  const [avatar, setAvatar] = useState<string>("https://placehold.co/150");
  const [mentorPagination, setMentorPagination] =
    useState<PageResponseModel<MentorType>>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm<MentorType>();
  const { loading, refresh } = useRequest(
    async () => {
      await handleFetch();
    },
    {
      refreshDeps: [query],
    }
  );

  const handleFetch = async () => {
    try {
      const res = await mentorService.getMentors(query.page, query.size);
      if (res.isSuccess) {
        setMentorPagination(res.responseRequestModel);
        // console.log(res);
      } else {
        // console.log("Failed to fetch API");
        message.error(res.message);
      }
    } catch (err) {
      console.log("Failed to load students: " + err);
    }
  };

  const openDetailModal = (mentor: MentorType) => {
    setAvatar(
      mentor.avatarUrl == null || mentor.avatarUrl == ""
        ? "https://placehold.co/150"
        : mentor.avatarUrl!
    );
    form.setFieldsValue({
      id: mentor.id,
      fullName: mentor.fullName || "",
      avatarUrl: mentor.avatarUrl || "",
      email: mentor.email || "",
      phoneNumber: mentor.phoneNumber || "",
      industry: mentor.industry || "",
      gender: mentor.gender || "",
      birthday: mentor?.birthday ? moment(mentor.birthday) : null,
      userName: mentor.userName || "",
      consumePoint: mentor.consumePoint || 0,
      emailConfirmed: mentor.emailConfirmed,
      lockoutEnabled: mentor.lockoutEnabled,
    });
    setIsModalOpen(true);
  };

  const handleUpdate = async (mentor: MentorType) => {
    if (mentor) {
      try {
        setUploading(true);
        //TODO: call upload images
   

        //* update mentor
        const result =  await mentorService.updateMentor(mentor);
        if(result.isSuccess){
            message.success("Update Successful")
            setIsModalOpen(false);
            await refresh();
        }
        else{
            message.error("Update Successful")
        }
        setUploading(false);
        
        
      } catch (err) {
        message.error("Error occured");
        setUploading(false);
      }
    }
  };

  const handleUpdateCancel = () => {
    setIsModalOpen(false);
  };

  const handleChangePagination = (pageIndex: number, pageSize: number) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      size: pageSize,
      page: pageIndex,
    }));
  };

  const columns = [
    {
      title: "Fullname",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Industry",
      dataIndex: "industry",
      key: "industry",
    },
    {
      title: "Consume Point",
      width: 150,
      dataIndex: "consumePoint",
      key: "consumePoint",
    },
    {
      title: "Actions",
      key: "actions",
      width: 50,
      render: (record: MentorType) => (
        <div>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => openDetailModal(record)}
          ></Button>
        </div>
      ),
    },
  ];
  const [file, setFile] = useState<UploadFile | undefined>(undefined);
  const [uploading, setUploading] = useState<boolean>(false);

  const handlePreview = (file: UploadFile) => {
    const url = URL.createObjectURL(file as any);
    setAvatar(url);
  };
  const props: UploadProps = {
    onRemove: () => {
      setFile(undefined);
    },
    beforeUpload: (file) => {
      setFile(file);
      handlePreview(file);
      return false;
    },
    fileList: file ? [file] : [],
  };
  return (
    <div className="p-4">
      <Table
        loading={loading}
        dataSource={mentorPagination?.items ?? []}
        columns={columns}
        rowKey="id"
        pagination={{
          current: query.page,
          pageSize: query.size,
          total: mentorPagination?.totalPages || 0,
          onChange(page, pageSize) {
            handleChangePagination(page, pageSize);
          },
          showSizeChanger: true,
        }}
        bordered
      />
      <div className="flex"></div>
      <Modal
        className="flex"
        title="Profile Detail"
        open={isModalOpen}
        
        onCancel={handleUpdateCancel}
      >
        <Form className="flex-1" form={form} layout="vertical" onFinish={handleUpdate} >
          <div hidden>
            <Form.Item name="id" label="Mentor ID">
              <Input readOnly />
            </Form.Item>
          </div>
          <div className="my-2">
            <Upload {...props}>
              <div className="relative flex items-center justify-center w-38 h-38 cursor-pointer">
                <Image
                  loading="lazy"
                  preview={false}
                  src={avatar}
                  width={150}
                  height={150}
                  className="object-cover transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out">
                  <button
                    style={{ border: 0, background: "none" }}
                    type="button"
                  >
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </button>
                </div>
              </div>
            </Upload>
          </div>
          <Form.Item hidden name="avatarUrl" label="Avatar URL">
            <Input placeholder="https://example.com/avatar.jpg" />
          </Form.Item>
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[
              { required: true, message: "Please enter your full name." },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email.",
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              { required: true, message: "Please enter your phone number." },
            ]}
          >
            <Input type="tel" />
          </Form.Item>

          <Form.Item
            name="industry"
            label="Industry"
            rules={[{ required: true, message: "Please enter your industry." }]}
          >
            <Input placeholder="Mentor Industry" />
          </Form.Item>

          <div className="flex justify-start gap-4">
            <Form.Item
              className="w-36"
              name="gender"
              label="Gender"
              rules={[
                { required: true, message: "Please select your gender." },
              ]}
            >
              <Select placeholder="Select Gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item
              className="w-auto"
              name="birthday"
              label="Birthday"
              rules={[
                { required: true, message: "Please select your birthday." },
              ]}
            >
              <DatePicker
                showTime
                className="w-auto"
                onChange={(date, dateString) => {}}
                placeholder="No birthday set"
              />
            </Form.Item>
          </div>

          <Form.Item
            name="userName"
            label="Username"
            rules={[{ required: true, message: "Please enter your username." }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="consumePoint"
            label="Consume Point"
            rules={[
              { required: true, message: "Please enter the consume point." },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <div className="flex justify-start gap-4">
            <Form.Item
              name="emailConfirmed"
              label="Email Confirmed"
              valuePropName="checked"
            >
              <Checkbox className="text-primary" disabled>
                Is Email Confirmed
              </Checkbox>
            </Form.Item>

            <Form.Item name="lockoutEnabled" label="Lockout Enabled">
              <Switch />
            </Form.Item>
            
          </div>
          <div className="flex justify-end">
          <Form.Item >
              <Button loading={uploading} type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default MentorTable;
