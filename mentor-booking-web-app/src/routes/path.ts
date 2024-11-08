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
  //resource
  resource: "/resource",

  request: "/requests",
  requestDetail: "/requests/:id",
  transaction: '/transactions',
  studentTransaction: "/students/transactions",
  meetingDetails: "/meeting/:id",
  studentRequestDetail: (studentId: string) => `/requests/${studentId}`,
};

export default paths;
