import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { schoolRoute } from "./Routes/school.Route.js";
import { studentRoute } from "./Routes/student.Route.js";
import { parentRoute } from "./Routes/parent.Route.js";
import { subjectRoute } from "./Routes/subject.Route.js";
import { adminRoute } from "./Routes/admin.Route.js";
import { teacherRoute } from "./Routes/teacher.Route.js";
import { teacherAttendenceRoute } from "./Routes/teacherAttendence.Route.js";
import bodyParser from "body-parser";
import { complaintRoute } from "./Routes/complaint.Route.js";
import { marksRoute } from "./Routes/marks.Route.js";
import { singleSubjectMarkRoute } from "./Routes/singleSubjectMark.Route.js";
import { staffRoute } from "./Routes/staff.Route.js";
import { noticeRoute } from "./Routes/notice.Route.js";
import { studentAttendenceRoute } from "./Routes/studentAttendence.Route.js";
import { staffAttendanceRoute } from "./Routes/staffAttendance.route.js";
import { classRoute } from "./Routes/class.Route.js";
import { sectionRoute } from "./Routes/section.Route.js";
import { sessionRoute } from "./Routes/session.Route.js";
import { studentHistoryRoute } from "./Routes/studentHistory.Route.js";
import { loginUserRouter } from "./Routes/loginUser.Route.js";
import { subjectGroupRoute } from "./Routes/subjectGroup.Route.js";
import { termRoute } from "./Routes/term.Route.js";
import { examTypeRoute } from "./Routes/examType.route.js";
import { examScheduleRoute } from "./Routes/examSchedule.Route.js";
import { markRoute } from "./Routes/mark.Route.js";
import { classTimeTableRoute } from "./Routes/classTimeTable.Route.js";
import { resultRoute } from "./Routes/result.Route.js";
import { ContactRoute } from "./Routes/Contact.Route.js";
import { feesDiscountRouter } from "./Routes/feesDiscount.Route.js";
import { feesTypeRouter } from "./Routes/feesType.Route.js";
import { feesGroupRouter } from "./Routes/feesGroup.Route.js";
import { feesMasterRouter } from "./Routes/feesMaster.Route.js";

const app = express();

// Whitelist localhost and local network IP addresses
const whitelist = [
    "http://localhost:5174",
    /^http:\/\/192\.168\.\d{1,3}\.\d{1,3}:5174$/, // This allows IPs like 192.168.x.x:5174
];

// Dynamic CORS origin function to check if the request origin is in the whitelist
const corsOptions = {
    origin: function (origin, callback) {
        if (
            !origin ||
            whitelist.some((allowedOrigin) =>
                allowedOrigin instanceof RegExp
                    ? allowedOrigin.test(origin)
                    : allowedOrigin === origin
            )
        ) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

app.use(cookieParser());

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Welcome to our School. Deployment is complete");
});

app.use("/api", noticeRoute);
app.use("/api", subjectRoute);
app.use("/api", schoolRoute);
app.use("/api", studentRoute);
app.use("/api", parentRoute);
app.use("/api", adminRoute);
app.use("/api", teacherRoute);
app.use("/api", teacherAttendenceRoute);
app.use("/api", complaintRoute);
app.use("/api", marksRoute);
app.use("/api", singleSubjectMarkRoute);
app.use("/api", staffRoute);
app.use("/api", studentAttendenceRoute);
app.use("/api", staffAttendanceRoute);
app.use("/api", classRoute);
app.use("/api", sectionRoute);
app.use("/api", sessionRoute);
app.use("/api", sectionRoute);
app.use("/api", studentHistoryRoute);
app.use("/api", loginUserRouter);
app.use("/api", subjectGroupRoute);
app.use("/api", termRoute);
app.use("/api", examTypeRoute);
app.use("/api", examScheduleRoute);
app.use("/api", markRoute);
app.use("/api", classTimeTableRoute);
app.use("/api", resultRoute);
app.use("/api", ContactRoute);
app.use("/api", feesDiscountRouter);
app.use("/api", feesTypeRouter);
app.use("/api", feesGroupRouter);
app.use("/api", feesMasterRouter);

// Global error handling middleware
app.use((err, req, res, next) => {
    let { statusCode, message } = err;
    res.status(statusCode).json(message);
});

export { app };
