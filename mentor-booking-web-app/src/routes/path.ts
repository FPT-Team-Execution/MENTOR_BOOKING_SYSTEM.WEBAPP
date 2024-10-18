const paths = {
  //Authen pages
  home: "/homepage",
  login: "/login",
  register: "/register",
  logout: "/logout",

  //Mentor pages
  mentors: "/mentors",
  mentorDetail: "/mentors/:id",

  //Student pages
  students: "/students",
  studentDetail: "/students/:id",

  //Calender pages
  calender: "/calendar",
  calenderDetail: "/calender/:id",
  mentorCalender: (mentorId: string) => `/calendar/${mentorId}`,
  //Booking pages
  booking: "/booking",
  bookingDetail: "/booking/:id",

  feedback: "/feedback",

  student: "/students",

  // dashboard page
  dashboard: "admin/dashboard",
  //student
  project: "students/project",
};

export default paths;
