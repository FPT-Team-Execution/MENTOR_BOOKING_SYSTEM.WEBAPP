import React from "react";
import { Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import MyCalendar from "../../components/Calendar/MyCalendar"; // Đảm bảo đường dẫn chính xác
import paths from "../../routes/path";

const CalendarEventPage: React.FC = () => {
  const navigate = useNavigate();
  const { mentorId } = useParams<{ mentorId: string }>(); // Lấy mentorId từ URL

  const handleOnBackClick = () => {
    navigate(paths.home); // Điều hướng về trang chính hoặc trang khác
  };

  return (
    <div>
      <h1>Calendar Events</h1>
      {mentorId && <MyCalendar mentorId={mentorId} />} {/* Truyền mentorId vào MyCalendar */}
      <Button onClick={handleOnBackClick}>Back</Button>
    </div>
  );
};

export default CalendarEventPage;
