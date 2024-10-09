import { LikeOutlined } from "@ant-design/icons";
import { Button, Col, Row, Statistic } from "antd";
import DashboardTable from "../../components/dashboard/DashboardTable";
const Dashboard = () => {
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="Active Users" value={112893} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Point Balance (FPoint)"
            value={2364}
            precision={2}
          />
          {/* <Button style={{ marginTop: 16 }} type="primary">
      Recharge
    </Button> */}
        </Col>
        <Col span={12}>
          <Statistic title="Active Users" value={112893} loading />
        </Col>
        <Col span={12}>
          <Statistic title="Feedback" value={1128} prefix={<LikeOutlined />} />
        </Col>
      </Row>
      <DashboardTable />
      {/* TODO: Add Calendar */}
    </>
  );
};

export default Dashboard;
