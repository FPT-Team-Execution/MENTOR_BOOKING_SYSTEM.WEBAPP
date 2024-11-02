import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getRequests } from '../../services/requestService';
import { getMeeting } from '../../services/meetingService';
import { RequestType } from '../../types/request.type';
import { MeetingType } from '../../types/meeting.type';
import { decode } from "../../utils/utils";
import { TokenData } from "../../types/common.types";

interface CalendarEvent {
  title: string;
  status: string;
  start: Date;
  end: Date;
  location: string
}

// Khởi tạo localizer cho calendar
const localizer = momentLocalizer(moment);

const MyCalendar: React.FC = () => {
  // Khai báo state cho events với kiểu CalendarEvent[]
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [userInfo, setUserInfo] = useState<TokenData>();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    // Giải mã `accessToken` và lưu vào `userInfo`
    if (accessToken != null) {
      setUserInfo(decode(accessToken));
    }
  }, [accessToken]);
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // Kiểm tra nếu `userInfo` và `nameidentifier` đã được thiết lập
        if (userInfo?.nameidentifier) {

          const allRequests = await getRequests(1, 10, "asc");
          const allMeeting = await getMeeting(1, 10);
          const filteredRequests = allRequests.responseRequestModel.items.filter(request =>
            request.mentorId == userInfo.nameidentifier && request.status == "0"
          );


          const calendarEvents: CalendarEvent[] = filteredRequests.flatMap((request) => {
            const meeting = allMeeting.responseRequestModel.items.find(
              (meet: MeetingType) => meet.requestId == request.id
            );
            const getMeetingStatusText = (status: string | number) => {
              switch (status) {
                case "0":
                case 0:
                  return "New";
                case "1":
                case 1:
                  return "Done";
                case "2":
                case 2:
                  return "Delayed";
                case "3":
                case 3:
                  return "Canceled";
                default:
                  return "Unknown Status"; // Trường hợp không xác định
              }
            };

            // Nếu có meeting phù hợp với requestId
            if (meeting) {
              return {
                title: `${request.title}`,
                status: getMeetingStatusText(meeting.status),
                start: new Date(request.start), // Assuming `startDate` is a date string
                end: new Date(request.end), // Assuming `endDate` is a date string
                location: meeting.location || "No location specified",
              };
            }
            return [];
          });

          setEvents(calendarEvents);
          console.log('Fetched Requests:', filteredRequests);
        }
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, [userInfo]); // Chỉ chạy khi `userInfo` thay đổi và đã có giá trị

  // Custom component để hiển thị event với title và status
  const EventComponent = ({ event }: { event: CalendarEvent }) => (
    <span>
      <strong>{event.title}</strong>
      <div>Status: {event.status}</div>
      <div>
        {moment(event.start).format('HH:mm')} - {moment(event.end).format('HH:mm')}
      </div>
      <div>Location: {event.location}</div>
    </span>
  );

  return (
    <div style={{ height: '80vh' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        selectable
        onSelectEvent={event => alert(`${event.title} \n Location: ${event.location}`)} // Hành động khi chọn sự kiện
        onSelectSlot={slotInfo => alert(`Selected slot: \n\n${slotInfo.start} - ${slotInfo.end}`)} // Hành động khi chọn khoảng thời gian
        components={{
          event: EventComponent,  // Sử dụng custom component cho event
        }}
      />
    </div>
  );
};

export default MyCalendar;



