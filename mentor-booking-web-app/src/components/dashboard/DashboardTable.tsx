import { message, Progress, Table } from "antd";
import type { TableProps } from "antd";
import { PageRequestModel, PageResponseModel } from "../../types/common.types";
import { useState } from "react";
import { ProjectType } from "../../types/project.type";
import { projectService } from "../../services/projectService";
import { useRequest } from "ahooks";
import moment from "moment";
import { progressService } from "../../services/progressService";
import { ProgressType } from "../../types/progress.type";
const DashBoardTable = () => {
  const [query, setQuery] = useState<PageRequestModel>({
    page: 1,
    size: 10,
    sort: "asc",
  });

  const [queryProgress, setQueryProgress] = useState<PageRequestModel>({
    page: 1,
    size: 10,
    sort: "asc",
  });
  const [projectPagination, setProjectPagination] =
    useState<PageResponseModel<ProjectType>>();
  const [progressPagination, setProgressPagination] =
    useState<PageResponseModel<ProgressType>>();
  const { loading } = useRequest(
    async () => {
      await handleFetch();
    },
    {
      refreshDeps: [query],
    }
  );
  const { loading: loadingProgress, run: runProgress } = useRequest(
    async (project: ProjectType) => {
      try {
        const res = await progressService.getProgressByProjectId(
          project.id,
          queryProgress
        );
        if (res.isSuccess) {
          if (res.responseRequestModel.totalPages > 1) {
            const index = queryProgress.page;
            setQueryProgress({
              ...queryProgress,
              size: queryProgress.size * (index + 1),
            });
            return;
          }
          setProgressPagination(res.responseRequestModel);
        } else {
          // console.log("Failed to fetch API");
          message.error(res.message);
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (ex) {
        message.error("Failed to load students");
      }
      
    },
    {
      manual: false,
      refreshDeps: [queryProgress],
    }
  );

 
  const handleFetch = async () => {
    try {
      const res = await projectService.getProjects(query);
      if (res.isSuccess) {
        //* load projects
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
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (dueDate: string | null) => {
        // Format the date to 'YYYY-MM-DD' if it's not null
        return (
          <div>
            {dueDate ? moment(dueDate).format("YYYY-MM-DD") : "No due date"}
          </div>
        );
      },
    },
    {
      width: 300,
      title: "Progress",
      key: "actions",
      render: (record: ProjectType) => {
        //TODO: call progress by project Id
        const completeProgress = progressPagination?.items.filter(
          (x) => x.isComplete == true
        );
        return (
          <div className="inline">
            <Progress
              percent={
                completeProgress?.length ||
                (0 / (progressPagination?.items.length || 0)) * 100
              }
              status="active"
            />
          </div>
        );
      },
    },
  ];
  const handleChangePagination = (pageIndex: number, pageSize: number) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      size: pageSize,
      page: pageIndex,
    }));
  };
  return (
    <>
      <Table
        loading={loading && loadingProgress}
        dataSource={projectPagination?.items}
        columns={columns}
        rowKey="id"
        className="border"
        pagination={{
          current: query.page,
          pageSize: query.size,
          total: projectPagination?.totalPages || 0,
          onChange(page, pageSize) {
            handleChangePagination(page, pageSize);
          },
          showSizeChanger: true,
        }}
        bordered
      />
    </>
  );
};

export default DashBoardTable;
