const paths = {
  //Authen pages
  home: "/homepage",
  login: "/login",
  callback: "/auth/callback",
  register: "/register",
  logout: "/logout",

  //Mentor pages
  mentors: "/mentors",
  mentorDetail: "/mentors/:id",

  //Student pages
  students: "/students",
  studentDetail: "/students/:id",
  studentRequests: "/students/requests",
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
  dashboard: "/dashboard",
  //student
  project: "/project",
  projectDetail: "/project/:id",
  //major
  major: "/resource/major",
  skill: "/resource/skill",

  request: "/requests",
  requestDetail: "/requests/:id",
  studentRequestDetail: (studentId: string) => `/requests/${studentId}`,
};

export default paths;
