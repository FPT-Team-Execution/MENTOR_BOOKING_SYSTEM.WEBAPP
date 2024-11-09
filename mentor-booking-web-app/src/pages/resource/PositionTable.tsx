import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Table,
  TableProps,
} from "antd";
import { useState } from "react";
import { PageRequestModel, PageResponseModel } from "../../types/common.types";
import { Position } from "../../types/resource.types";
import { useRequest } from "ahooks";
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { positionService } from "../../services/positionService";

export const PositionTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [query, setQuery] = useState<PageRequestModel>({
    page: 1,
    size: 10,
    sort: "asc",
  });
  const [position, setPosition] = useState<Position>();
  const [positionPagination, setPositionPagination] =
    useState<PageResponseModel<Position>>();
  const [form] = Form.useForm<Position>();

  const handleFetchPositions = async () => {
    try {
      const res = await positionService.getPositions(query);
      console.log('response' + JSON.stringify(res))
      if (res.isSuccess) {
        const filteredPositions: 
        PageResponseModel<Position> = {
            ...res.responseRequestModel,
            items:
              res.responseRequestModel.items.filter(
                (p) => p.status === "Activated"
              ) || [],
          };
        setPositionPagination(filteredPositions);
      } else {
        message.error("Failed to load positions");
      }
    } catch {
      message.error("Failed to load data");
    }
  };

  const { loading, refresh } = useRequest(handleFetchPositions, {
    refreshDeps: [query],
  });

  const handleCreateSubmit = async (position: Position)=> {
    try {
      setActionLoading(true);
      const result = await positionService.createPosition(position);

      if (result.isSuccess) {
        message.success("Position created successfully");
        setIsModalOpen(false);
        await refresh();
      } else {
        message.error("Failed to create position");
      }
    } catch {
      message.error("An error occurred");
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdate = async (position: Position) => {
    try {
      if (!position) return;
      console.log('position' + JSON.stringify(          position));
      setActionLoading(true);
      const result = await positionService.updatePositon(position);

      if (result.isSuccess) {
        message.success("Position updated successfully");
        setIsModalOpen(false);
        await refresh();
      } else {
        message.error("Failed to update position");
      }
    } catch {
      message.error("An error occurred");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteConfirm = async (position: Position) => {
    try {
    //   const result = await positionService.deletePositon(position);
    const result = await positionService.deletePositon(position.id);
      if (result.isSuccess) {
        message.success("Position deleted successfully");
        await refresh();
      } else {
        message.error("Failed to delete position");
      }
    } catch {
      message.error("Delete failed. Try again later");
    }
  };

  const openCreateModal = () => {
    setPosition(undefined);
    form.resetFields();
    setIsModalOpen(true);
  };

  const columns: TableProps<Position>["columns"] = [
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
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: Position) => (
        <div>
          <Button icon={<EditOutlined />} type="link" onClick={() => openEditModal(record)}>
            
          </Button>
          <Popconfirm
            title="Delete this position?"
            onConfirm={() => handleDeleteConfirm(record)}
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <Button
              type="link"
              icon={<DeleteOutlined style={{ color: "red" }} />}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const openEditModal = (position: Position) => {
    setPosition(position);
    form.setFieldsValue({
      id: position.id,
      name: position.name,
      description: position.description,
    });
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const handlePaginationChange = (page: number, pageSize: number) => {
    setQuery({ ...query, page, size: pageSize });
  };

  return (
    <div>
      <div className="w-auto p-2">
        <div style={{ padding: "24px" }} className="border rounded-lg">
          <h1>Positions</h1>
          <div className="py-2 flex justify-end">
            <Button
              type="primary"
              htmlType="submit"
              name="create"
              onClick={openCreateModal}
              loading={actionLoading}
            >
              Create
            </Button>
          </div>
          <Table
            loading={loading}
            dataSource={positionPagination?.items}
            columns={columns}
            rowKey="id"
            pagination={{
              current: query.page,
              pageSize: query.size,
              total: positionPagination?.totalItems,
              onChange: handlePaginationChange,
            }}
            bordered
          />
          <Modal
            title={position ? "Edit Position" : "Create Position"}
            visible={isModalOpen}
            footer={null}
            onCancel={handleModalCancel}
          >
            <Form
              form={form}
              onFinish={position ? handleUpdate : handleCreateSubmit}
              layout="vertical"
            >
                <div hidden>
                <Form.Item name="id" label="Position ID">
                  <Input readOnly />
                </Form.Item>
              </div>
              <Form.Item
                name="name"
                label="Position Name"
                rules={[
                  { required: true, message: "Please enter the position name" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  { required: true, message: "Please enter a description" },
                ]}
              >
                <Input />
              </Form.Item>
              <div className="form-footer">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={actionLoading}
                >
                  {position ? "Update" : "Create"}
                </Button>
              </div>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
};
