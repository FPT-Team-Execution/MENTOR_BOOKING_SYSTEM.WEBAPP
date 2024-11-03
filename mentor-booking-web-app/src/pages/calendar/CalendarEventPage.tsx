import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import paths from "../../routes/path";
import GoogleCalendar from "../../components/Calendar/GoogleCalendar";


const CalendarEventPage: React.FC = () => {
  const navigate = useNavigate();

  const handleOnBackClick = () => {
    navigate(paths.home); // Điều hướng về trang chính hoặc trang khác
  };

  return (
    <div>
      <h1>Calendar Events</h1>
      {/* {<MyCalendar />} Truyền mentorId vào MyCalendar */}
      <Button onClick={handleOnBackClick}>Back</Button>

      <GoogleCalendar />

    </div>
  );
};

export default CalendarEventPage;
