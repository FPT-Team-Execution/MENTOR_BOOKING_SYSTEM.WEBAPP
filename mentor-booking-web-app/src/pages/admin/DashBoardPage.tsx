import { LikeOutlined } from "@ant-design/icons";
import { Col, message, Row, Statistic } from "antd";
import DashboardTable from "../../components/dashboard/DashboardTable";
import { useState } from "react";
import { MentorType, StudentType } from "../../types/user.types";
import { studentService } from "../../services/studentService";
import { PageRequestModel, PageResponseModel } from "../../types/common.types";
import { useRequest } from "ahooks";
import { mentorService } from "../../services/mentorService";
const Dashboard = () => {
  const [query, setQuery] = useState<PageRequestModel>({
    page: 1,
    size: 10,
    sort: "asc",
  });

  const [studentPagination, setStudentPagination] =
    useState<PageResponseModel<StudentType>>();
  const [pointStudents, setPointStudents] = useState<number>(0);

  const [mentorPagination, setMentorPagination] =
    useState<PageResponseModel<MentorType>>();

  const [mentorQuery, setMentorQuery] = useState<PageRequestModel>({
    page: 1,
    size: 10,
    sort: "asc",
  });
  //TODO: load students request
  const { studentLoading, studentRefresh } = useRequest(
    async () => {
      await handleStudentFetch();
    },
    {
      refreshDeps: [query],
    }
  );
  const handleStudentFetch = async () => {
    try {
      const res = await studentService.getStudents(query);
      if (res.isSuccess) {
        if (res.responseRequestModel.totalPages > 1) {
          const index = query.page;
          setQuery({
            ...query,
            size: query.size * (index + 1),
          });
          return;
        }
        setStudentPagination(res.responseRequestModel);
        //TODO: set total point
        const totalPoint = res.responseRequestModel.items.reduce(
          (acc, s) => acc + s.walletPoint,
          0
        );
        setPointStudents(totalPoint);
      } else {
        // console.log("Failed to fetch API");
        message.error(res.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      message.error("Failed to load students");
    }
  };
  //TODO: load mentors request
  const { loading: mentorLoading, refresh: mentorRefresh } = useRequest(
    async () => {
      await handleMentorFetch();
    },
    {
      refreshDeps: [query],
    }
  );
  const handleMentorFetch = async () => {
    try {
      const res = await mentorService.getMentors(query.page, query.size);
      if (res.isSuccess) {
        if (res.responseRequestModel.totalPages > 1) {
          const index = mentorQuery.page;
          setMentorQuery({
            ...mentorQuery,
            size: mentorQuery.size * (index + 1),
          });
          return;
        }
        setMentorPagination(res.responseRequestModel);
      } else {
        // console.log("Failed to fetch API");
        message.error(res.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      message.error("Failed to load students");
    }
  };

  return (
    <div className="flex flex-col py-2">
      <Row justify="center" gutter={24} className="basis-full my-2 gap-2">
        <Col xs={22} sm={10} md={6} lg={5} className="border rounded-lg">
          <Statistic
            loading={studentLoading}
            title="Students"
            value={studentPagination?.items.length}
          />
        </Col>
        {/* <Col xs={22} sm={10} md={5} lg={5} className="border rounded-lg">
          <Statistic title="Total Point (FPoint)" value={pointStudents} />
        </Col> */}
        <Col xs={22} sm={10} md={5} lg={5} className="border rounded-lg">
          <Statistic
            loading={mentorLoading}
            title="Mentors"
            value={mentorPagination?.items.length}
          />
        </Col>
        {/* <Col xs={22} sm={10} md={5} lg={5} className="border rounded-lg">
          <Statistic title="Feedback" value={1128} prefix={<LikeOutlined />} />
        </Col> */}
      </Row>
      <div className="basis-full">
        <DashboardTable />
      </div>
      {/* TODO: Add Calendar */}
    </div>
  );
};

export default Dashboard;
