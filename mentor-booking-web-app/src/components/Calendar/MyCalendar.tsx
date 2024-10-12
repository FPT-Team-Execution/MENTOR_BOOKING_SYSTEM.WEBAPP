import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Định nghĩa interface cho props
interface MyCalendarProps {
  mentorId: string; // Khai báo kiểu cho mentorId
}

// Định nghĩa interface cho event bao gồm cả status
interface CalendarEvent {
  id: string;
  title: string;
  status: string;
  start: Date;
  end: Date;
  allDay: boolean;
}

// Khởi tạo localizer cho calendar
const localizer = momentLocalizer(moment);

const MyCalendar: React.FC<MyCalendarProps> = ({ mentorId }) => {
  // Khai báo state cho events với kiểu CalendarEvent[]
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    // Dữ liệu ảo để demo
    const demoEvents = [
      {
        id: "1",
        title: "Meeting with Mentor",
        status: "Confirmed",  // Status của sự kiện
        start: new Date(2024, 9, 10, 10, 0), // 10 October 2024, 10:00 AM
        end: new Date(2024, 9, 10, 12, 0),  // 10 October 2024, 12:00 PM
        allDay: false,
      },
      {
        id: "2",
        title: "Code Review",
        status: "Pending",  // Status của sự kiện
        start: new Date(2024, 9, 12, 14, 0), // 12 October 2024, 2:00 PM
        end: new Date(2024, 9, 12, 15, 30), // 12 October 2024, 3:30 PM
        allDay: false,
      },
      {
        id: "3",
        title: "Project Presentation",
        status: "Completed",  // Status của sự kiện
        start: new Date(2024, 9, 15, 9, 0),  // 15 October 2024, 9:00 AM
        end: new Date(2024, 9, 15, 11, 0),   // 15 October 2024, 11:00 AM
        allDay: false,
      },
    ];

    setEvents(demoEvents);
  }, [mentorId]);

  // Custom component để hiển thị event với title và status
  const EventComponent = ({ event }: { event: CalendarEvent }) => (
    <span>
      <strong>{event.title}</strong>
      <div>Status: {event.status}</div>
      <div>
        {moment(event.start).format('HH:mm')} - {moment(event.end).format('HH:mm')}
      </div>
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
        onSelectEvent={event => alert(event.title)} // Hành động khi chọn sự kiện
        onSelectSlot={slotInfo => alert(`Selected slot: \n\n${slotInfo.start} - ${slotInfo.end}`)} // Hành động khi chọn khoảng thời gian
        components={{
          event: EventComponent,  // Sử dụng custom component cho event
        }}
      />
    </div>
  );
};

export default MyCalendar;



// const fetchEvents = async () => {
    //   try {
    //     const data = await getEventsByMentorId(mentorId, 1, 10);
    //     const formattedEvents = data.map(event => ({
    //       id: event.id,
    //       title: event.summary,
    //       start: new Date(event.start), // Chuyển đổi sang Date object
    //       end: new Date(event.end), // Chuyển đổi sang Date object
    //       allDay: false, // Thiết lập nếu đây là sự kiện cả ngày hay không
    //     }));
    //     setEvents(formattedEvents); // Gán dữ liệu đã định dạng vào state
    //   } catch (error) {
    //     console.error('Error fetching events:', error);
    //   }
    // // };  

    // fetchEvents();//Fetch Api