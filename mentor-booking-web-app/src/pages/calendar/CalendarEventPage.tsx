import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import paths from "../../routes/path";
import { useAuth } from "../../auth/AuthContext";
import { GOOGLE_CALENDAR_FRAME_URL } from "../../utils/apiUrl/baseUrl";


const CalendarEventPage: React.FC = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();

  const handleOnBackClick = () => {
    navigate(paths.home); // Điều hướng về trang chính hoặc trang khác
  };

  return (
    <div>
      <h1>Calendar Events</h1>
      {/* {<MyCalendar />} Truyền mentorId vào MyCalendar */}
      <Button onClick={handleOnBackClick}>Back</Button>

      <div>
        <iframe src={GOOGLE_CALENDAR_FRAME_URL(userInfo?.name)}
          width="auto"
          height="auto">
        </iframe>
      </div>

    </div>
  );
};

export default CalendarEventPage;
