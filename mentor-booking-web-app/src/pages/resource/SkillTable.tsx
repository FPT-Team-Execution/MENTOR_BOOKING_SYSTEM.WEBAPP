import {
    Button,
    DatePicker,
    Form,
    Input,
    message,
    Modal,
    Select,
    Table,
    TableProps,
  } from "antd";
  import { useState } from "react";
  import { PageRequestModel, PageResponseModel } from "../../types/common.types";
  import { Major } from "../../types/resource.types";
  import { useRequest } from "ahooks";
  import { majorServices } from "../../services/majorService";
  import { CaretRightOutlined, EditOutlined } from "@ant-design/icons";
  import moment from "moment";
  
  export const SkillTable = () => {
    const [isUpdate, setIsUpdate] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [query, setQuery] = useState<PageRequestModel>({
      page: 1,
      size: 10,
      sort: "asc",
    });
    const [major, setMajor] = useState<Major>();
    const [majorPagination, setMajorPagination] =
      useState<PageResponseModel<Major>>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm<Major>();
    const { loading, refresh } = useRequest(
      async () => {
        await handleFetch();
      },
      {
        refreshDeps: [query],
      }
    );
    const handleUpdate = async (major: Major) => {
      if (major) {
        try {
          setActionLoading(true);
          console.log(major);
          //* update mentor
          const result = await majorServices.updateMajor(major);
          if (result.isSuccess) {
            message.success("Update Successful");
            setIsModalOpen(false);
            await refresh();
          } else {
            message.error("Update Successful");
          }
          setActionLoading(false);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
          message.error("Error occured");
          setActionLoading(false);
        }
      }
    };
    const handleUpdateCancel = () => {
      setIsModalOpen(false);
    };
    const columns: TableProps<Major>["columns"] = [
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
      },
      {
        title: "Actions",
        key: "actions",
        width: 50,
        render: (record: Major) => (
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
    const openDetailModal = async (major: Major) => {
      setIsUpdate(true);
      const majorResponse = await majorServices.getMajorById(major.id);
      const majorGetById = majorResponse.responseRequestModel;
      setMajor(majorGetById);
      // Initial form value
      form.setFieldsValue({
        id: major.id,
        name: major.name || "",
        parentName: majorGetById.parentName || "",
        createdOn: majorGetById?.createdOn
          ? moment(majorGetById.createdOn)
          : undefined,
        updatedOn: majorGetById?.updatedOn
          ? moment(majorGetById.updatedOn)
          : undefined,
      });
  
      setIsModalOpen(true);
    };
    const openCreateModal = async () => {
      setIsUpdate(false);
      // Initial form value
      form.setFieldsValue({
        id: major?.id,
        name: major?.name || "",
        parentName: major?.parentName || "",
        createdOn: major?.createdOn ? moment(major.createdOn) : undefined,
        updatedOn: major?.updatedOn ? moment(major.updatedOn) : undefined,
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
    const handleFetch = async () => {
      try {
        const res = await majorServices.getMajors(query);
        if (res.isSuccess) {
          setMajorPagination(res.responseRequestModel);
        } else {
          // console.log("Failed to fetch API");
          message.error(res.message);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        message.error("Faile to load data");
      }
    };
    const menuItems =
      majorPagination?.items.map((item) => ({
        label: item.name,
        key: item.id.toString(),
        icon: <CaretRightOutlined />,
      })) || [];
    const defaultValue =
      majorPagination?.items.find((item) => {
        return item.name == major?.parentName;
      }) || undefined;
    return (
      <div className="w-auto p-2">
        <div style={{ padding: "24px" }} className="border rounded-lg">
          <h1>Majors</h1>
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
            loading={loading}
            dataSource={majorPagination?.items}
            columns={columns}
            rowKey="id"
            pagination={{
              current: query.page,
              pageSize: query.size,
              total: majorPagination?.totalPages || 0,
              onChange(page, pageSize) {
                handleChangePagination(page, pageSize);
              },
              showSizeChanger: true,
            }}
            bordered
          />
          <Modal
            title={isUpdate ? "Detail" : "Create Major"}
            footer={null}
            open={isModalOpen}
            onCancel={handleUpdateCancel}
          >
            <div className="">
              <Form
                className=""
                form={form}
                layout="vertical"
                onFinish={handleUpdate}
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
                    { required: true, message: "Please enter major name." },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item name="parentName" label="Major Root">
                  <Select
                    loading={loading}
                    placeholder="Select super major"
                    defaultValue={defaultValue}
                    options={menuItems} // Assuming menuItems is the array of options you created
                  />
                </Form.Item>
  
                <div className="flex justify-between gap-2">
                  <Form.Item
                    className="flex-1"
                    name="createdOn"
                    label="Created On"
                  >
                    <DatePicker
                      disabled
                      readOnly
                      showTime
                      className="w-auto"
                      placeholder="Created date"
                    />
                  </Form.Item>
  
                  <Form.Item
                    className="flex-1"
                    name="updatedOn"
                    label="Updated On"
                  >
                    <DatePicker
                      disabled
                      readOnly
                      showTime
                      className="w-auto"
                      placeholder="Updated date"
                    />
                  </Form.Item>
                </div>
  
                <div className="flex justify-end">
                  <Form.Item>
                    <Button
                      loading={actionLoading}
                      type="primary"
                      htmlType="submit"
                    >
                      {isUpdate ? "Update" : "Create"}
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
  
  export function formatDateTime(dateTime: string): string {
    const date = new Date(dateTime);
  
    // Lấy các phần ngày, tháng, năm
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
  
    // Lấy các phần giờ, phút, giây
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
  
    // Xác định AM hoặc PM
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Đổi thành giờ 12 tiếng và đảm bảo 0 giờ thành 12
  
    // Trả về chuỗi đã định dạng
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;
  }
  