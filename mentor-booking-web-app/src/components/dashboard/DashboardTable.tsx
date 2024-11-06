import {  message, Progress, Table } from "antd";
import type { TableProps } from "antd";
import { PageRequestModel, PageResponseModel } from "../../types/common.types";
import { useState } from "react";
import { ProjectType } from "../../types/project.type";
import { projectService } from "../../services/projectService";
import { useRequest } from "ahooks";
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";
const DashBoardTable = () => {
  const [query, setQuery] = useState<PageRequestModel>({
    page: 1,
    size: 10,
    sort: "asc",
  });
  const [projectPagination, setProjectPagination] =
    useState<PageResponseModel<ProjectType>>();
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
      const res = await projectService.getProjects(query);
      if (res.isSuccess) {
        //TODO: load projects

        setProjectPagination(res.responseRequestModel);
      } else {
        // console.log("Failed to fetch API");
        message.error(res.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      message.error("Failed to load data");
    }
  };

  const columns: TableProps<ProjectType>["columns"] = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (_, __, index: number) => index + 1,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "tilte",
    },
    {
      width: 150,
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (dueDate: string | null) => {
        // Format the date to 'YYYY-MM-DD' if it's not null
        return <div>{dueDate ? moment(dueDate).format('YYYY-MM-DD') : 'No due date'}</div>;
      },
    },
    {
      width: 300,
      title: "Progress",
      key: "actions",
      render: (record: ProjectType) => {
        //TODO: call progress by project Id
        
        return (
          <div className="inline">
            <Progress percent={50} status="active" />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Table
        loading={loading}
        dataSource={projectPagination?.items}
        columns={columns}
        rowKey="id"
        className="border"
        pagination={{
          current: query.page,
          pageSize: query.size,
          total: projectPagination?.totalPages || 0,
          onChange(page, pageSize) {
            // handleChangePagination(page, pageSize);
          },
          showSizeChanger: true,
        }}
        bordered
      />
    </>
  );
};

export default DashBoardTable;
