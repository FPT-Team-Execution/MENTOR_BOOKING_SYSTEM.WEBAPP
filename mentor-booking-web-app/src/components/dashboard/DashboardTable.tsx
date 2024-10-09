import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
const DashBoardTable = () => {
  interface DataType {
    key: string;
    projectName: string;
    address: string;
    tags: string[];
  }
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      projectName: "John Brown",
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      projectName: "Jim Green",
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      projectName: "Joe Black",
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  return <Table<DataType> columns={columns} dataSource={data} />;
};

export default DashBoardTable;
