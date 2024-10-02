export const getApiConfig = {
  getAllSchools: {
    url: "/get-schools",
    method: "GET",
  },
  getSingleSchool: {
    url: "/get-single-school",
    method: "GET",
  },
  loginTeacher: {
    url: "/login-teacher",
    method: "GET",
  },
  getAllTeachers: {
    url: "/get-all-teachers",
    method: "GET",
  },
  getAllSubjects: {
    url: "/all-subject",
    method: "GET",
  },
  getAllClasses: {
    url: "/all-class",
    method: "GET",
  },
  getAllSections: {
    url: "/get-all-sections",
    method: "GET",
  },
  getAllSessions: {
    url: "/get-all-sessions",
    method: "GET",
  },
  getAllStudents: {
    url: "/get-all-students",
    method: "GET",
  },
  getAllParents: {
    url: "/get-all-parents",
    method: "GET",
  },
  addStudent: {
    url: "/create-student/:schoolId",
    method: "POST",
  },
  getSingleStudent: (studentId) => ({
    url: `/get-student/${studentId}`,
    method: "GET",
  }),
  getAllTeachers: {
    url: "/get-all-teachers",
    method: "GET",
  },
  getAllNotice: {
    url: "/all-notice",
    method: "GET",
  },
  getAllSections: {
    url: "/get-all-sections",
    method: "GET",
  },
  getAllSubjects: {
    url: "/all-subject",
    method: "GET",
  },
  getAllClassesWithSections: {
    url: "/get-allclass-withsection",
    method: "GET",
  },
  getAllSubjects: {
    url: "/all-subject",
    method: "GET",
  },
  getAllExamCategories: {
    url: "/get-examgroup",
    method: "GET",
  },
  getAllExamTypes: {
    url: "/get-examtype",
    method: "GET",
  },
  getSubjectGroup: {
    url: "/all-subject-groups",
    method: "GET",
  },
  getallstudentsinfo: {
    url: "/getallstudentsinfo",
    method: "GET",
  },
  getAllStaff: {
    url: "/get-all-staffs",
    method: "GET",
  },
  getAllTeachers: {
    url: "/get-all-teachers",
    method: "GET",
  },
  overallAttendanceStudent: {
    url: "/get-student-attendance-byid",
    method: "GET",
  },
  getAllNotices: {
    url: "/all-notice",
    method: "GET",
  },
};
