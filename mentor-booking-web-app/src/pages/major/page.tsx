import { Form, message, Table, TableProps } from "antd";
import { useState } from "react";
import { PageRequestModel, PageResponseModel } from "../../types/common.types";
import { Major } from "../../types/resource.types";
import { useRequest } from "ahooks";
import { majorServices } from "../../services/majorService";

export const MajorPage = () => {
  const [query, setQuery] = useState<PageRequestModel>({
    page: 1,
    size: 10,
    sort: "asc",
  });
  const [majorPagination, setMajorPagination] =
    useState<PageResponseModel<Major>>();
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [form] = Form.useForm<Major>();
  const { loading, refresh } = useRequest(
    async () => {
      await handleFetch();
    },
    {
      refreshDeps: [query],
    }
  );

  const columns : TableProps<Major>['columns']= [
    {
    
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (_,__,index: number) => index + 1
      
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Section",
      dataIndex: "parentName",
      key: "parentName",
    },
    {
      title: "Create On",
      dataIndex: "createOn",
      key: "createOn",
      render: (datetime) => formatDateTime(datetime)
    },
    {
      title: "Update On",
      dataIndex: "updateOn",
      key: "updateOn",
      render: (datetime) => formatDateTime(datetime)
      

    },
    // {
    //   title: "Actions",
    //   key: "actions",
    //   width: 50,
    //   render: (record: MentorType) => (
    //     <div>
    //       <Button
    //         type="link"
    //         icon={<EditOutlined />}
    //         onClick={() => openDetailModal(record)}
    //       ></Button>
    //     </div>
    //   ),
    // },
  ];
  
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
        console.log(res);
      } else {
        // console.log("Failed to fetch API");
        message.error(res.message);
      }
    } catch (err) {
      console.log("Failed to load students: " + err);
    }
  };

  return (
    <div className="w-auto">
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
    </div>
  );
};

export function formatDateTime(dateTime: string): string {
  const date = new Date(dateTime);

  // Lấy các phần ngày, tháng, năm
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
  const year = date.getFullYear();

  // Lấy các phần giờ, phút, giây
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  // Xác định AM hoặc PM
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Đổi thành giờ 12 tiếng và đảm bảo 0 giờ thành 12

  // Trả về chuỗi đã định dạng
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;
}
