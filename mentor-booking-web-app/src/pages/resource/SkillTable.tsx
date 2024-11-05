import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Select,
  Table,
  TableProps,
} from "antd";
import { useState } from "react";
import { PageRequestModel, PageResponseModel } from "../../types/common.types";
import { SkillSummary } from "../../types/resource.types";
import { useRequest } from "ahooks";
import {
  DeleteOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { skillService } from "../../services/skillService";
import { mentorService } from "../../services/mentorService";
import { MentorType } from "../../types/user.types";

export const SkillTable = () => {
  const [isPressEnter, setIsPressEnter] = useState<boolean>(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [query, setQuery] = useState<PageRequestModel>({
    page: 1,
    size: 10,
    sort: "asc",
  });
  const [queryMentor, setQueryMentor] = useState<PageRequestModel>({
    page: 1,
    size: 10,
    sort: "asc",
  });
  const [skill, setSKill] = useState<SkillSummary>();
  const [skillPagination, setMajorPagination] =
    useState<PageResponseModel<SkillSummary>>();
  const [mentorPagination, setMentorPagination] =
    useState<PageResponseModel<MentorType>>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm<SkillSummary>();
  const { loading, refresh } = useRequest(
    async () => {
      await handleFetch();
    },
    {
      refreshDeps: [query],
    }
  );
  const { loadingMentor, refreshMentor } = useRequest(
    async () => {
      await handleFetchMentors();
    },
    {
      refreshDeps: [query],
    }
  );
  const handleCreateSubmit = async (skill: SkillSummary) => {
    if (!skill) return;

    try {

      setActionLoading(true);

      const result = await skillService.createSkill(skill);

      if (result.isSuccess) {
        message.success("Create Successful");
        setIsModalOpen(false);
        await refresh();
      } else {
        message.error("Create Failed");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      message.error("An error occurred");
    } finally {
      setActionLoading(false);
    }
  };
  const handleUpdate = async (newSkillName: string) => {
    if (!skill) return;

    try {
      setActionLoading(true);
      //check skill name value
      if (skill.name == newSkillName) {
        setIsModalOpen(false);
        return;
      }
      const updateSkill = {
        ...skill,
        name: newSkillName,
      };
      const result = await skillService.updateSkill(updateSkill);

      if (result.isSuccess) {
        message.success("Update Successful");

        setIsModalOpen(false);
        await refresh();
      } else {
        message.error("Update Failed");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      message.error("An error occurred");
    } finally {
      setActionLoading(false);
    }
  };
  const handleUpdateCancel = () => {
    setIsModalOpen(false);
  };
  const columns: TableProps<SkillSummary>["columns"] = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (_, __, index: number) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: SkillSummary) => (
        <Input
          defaultValue={text}
          onFocus={() => setSKill(record)}
          onPressEnter={(e) => {
            setIsPressEnter((pre) => !pre);
            handleUpdate(e.target.value);
          }} //submit when pressEnter
          onBlur={(e) => {
            if (isPressEnter) {
              setIsPressEnter((pre) => !pre);
              return;
            }
            return alert(e.target.value);
          }} //lost focus
        />
      ),
    },
    {
      minWidth: 100,
      title: "Mentor",
      dataIndex: "mentorName",
      key: "mentorName",
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      minWidth: 100,
      render: (record: SkillSummary) => (
        <div className="inline">
          <Popconfirm
            title="Delete the skill"
            description="Are you sure to delete this skill?"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            onConfirm={() => handleDeleteConfirm(record.id)}
          >
            <Button
              type="link"
              icon={<DeleteOutlined className="text-red-600" />}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];
  const handleDeleteConfirm = async (skillId: string) => {
    try {
      const deleteSkillResponse = await skillService.deleteSKill(skillId);
      if (!deleteSkillResponse.isSuccess) {
        message.error(deleteSkillResponse.message);
        return;
      }
      await refresh();
      message.success(deleteSkillResponse.message);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      message.error("Delete failed. Try again later");
    }
  };
  //   const openDetailModal = async (skill: SkillSummary) => {
  //     setIsUpdate(true);
  //     const skillResponse = await skillService.getSkillById(skill.id);
  //     const skillGetById = skillResponse.responseRequestModel;
  //     setSKill(skillGetById);
  //   const defaultValue =
  //   majorPagination?.items.find((item) => {
  //     return item.parentName == skill?.parentName;
  //   }) || undefined;
  // Initial form value
  //     form.setFieldsValue({
  //       id: skill.id,
  //       name: skill.name,
  //       mentorName: skill.mentorName,
  //       mentorId: skill.mentorId,
  //       mentorEmail: skill.mentorEmail,
  //     });

  //     setIsModalOpen(true);
  //   };
  const openCreateModal = async () => {
    setSKill(undefined);
    // Initial form value
    form.setFieldsValue({
      id: "",
      name: "",
      mentorName:  "",
      mentorId: "",
      mentorEmail: "",
    });

    setIsModalOpen(true);
  };

  const handleChangePagination = (pageIndex: number, pageSize: number) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      size: pageSize,
      page: pageIndex,
    }));
  };
  const handleFetchMentors = async () => {
    try {
      const res = await mentorService.getMentors(
        queryMentor.page,
        queryMentor.size
      );
      if (res.isSuccess) {
        const mentorSortByName: PageResponseModel<MentorType> = {
          ...res.responseRequestModel,
          items: res.responseRequestModel.items.sort((a, b) =>
            a.fullName.localeCompare(b.fullName)
          ),
        };

        setMentorPagination(mentorSortByName);
      } else {
        // console.log("Failed to fetch API");
        message.error(res.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      message.error("Failed to load mentors");
    }
  };
  const handleFetch = async () => {
    try {
      const res = await skillService.getSkills(query);
      if (res.isSuccess) {
        //filter activated major
        const sortByMentorNameSkill: PageResponseModel<SkillSummary> = {
          ...res.responseRequestModel,
          items: res.responseRequestModel.items.sort((a, b) =>
            a.mentorName.localeCompare(b.mentorName)
          ),
        };

        setMajorPagination(sortByMentorNameSkill);
      } else {
        // console.log("Failed to fetch API");
        message.error(res.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      message.error("Faile to load data");
    }
  };
  const mentorsItems =
    mentorPagination?.items.map((item) => ({
      label: item.fullName,
      key: item.id.toString(),
      icon: <UserOutlined />,
    })) || [];

    const handleScroll = (event : any) => {
        const { target } = event;
        if (target.scrollTop + target.clientHeight >= target.scrollHeight) {
          // User has scrolled to the bottom
          alert('Scrolled to the bottom');
          // Here you can load more options or perform any action
        }
      };
  return (
    <div className="w-auto p-2">
      <div style={{ padding: "24px" }} className="border rounded-lg">
        <h1>Skills</h1>
        <div className="py-2 flex justify-end">
          <Button
            loading={actionLoading}
            type="primary"
            htmlType="submit"
            name="create"
            onClick={openCreateModal}
          >
            Create
          </Button>
        </div>
        <Table
          loading={loading && loadingMentor}
          dataSource={skillPagination?.items}
          columns={columns}
          rowKey="id"
          pagination={{
            current: query.page,
            pageSize: query.size,
            total: skillPagination?.totalPages || 0,
            onChange(page, pageSize) {
              handleChangePagination(page, pageSize);
            },
            showSizeChanger: true,
          }}
          bordered
        />
        <Modal
          title={"Create Skill"}
          footer={null}
          open={isModalOpen}
          onCancel={handleUpdateCancel}
        >
          <div className="">
            <Form
              className=""
              form={form}
              layout="vertical"
              onFinish={handleCreateSubmit}
            >
              <div hidden>
                <Form.Item name="id" label="Mentor ID">
                  <Input readOnly />
                </Form.Item>
              </div>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  { required: true, message: "Please enter skill name." },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="mentorName"
                label="Mentor"
                rules={[
                  { required: true, message: "Please enter major name." },
                ]}
              >
                <Select
                  // defaultValue={defaultValue}
                  showSearch
                  optionFilterProp="label"
                  placeholder="Select mentor"
                  loading={loading}
                  onPopupScroll={(e) => handleScroll(e)}
                  options={mentorsItems}
                />
              </Form.Item>
              <div className="flex justify-end">
                <Form.Item>
                  <Button
                    loading={actionLoading}
                    type="primary"
                    htmlType="submit"
                  >
                    {"Create"}
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </Modal>
      </div>
    </div>
  );
};
