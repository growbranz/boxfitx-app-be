import express from "express";
import { connectDB } from "./config/db.js";
import { AuthRouter } from "./routes/auth.routes.js";
import { MemberRouter } from "./routes/member.routes.js";
import { DashboardRouter } from "./routes/dashboard.routes.js";
import { PlanRouter } from "./routes/plan.routes.js";
import "./cron/membershipExpiry.cron.js";
import { AttendanceRouter } from "./routes/attendance.routes.js";
const app = express();
connectDB();
app.use(express.json());
app.use("/auth", AuthRouter);
app.use("/api/members", MemberRouter);
app.use("/api/dashboard", DashboardRouter);
app.use("/api/plans", PlanRouter);
app.use("/api/attendance", AttendanceRouter);
app.get("/", (req, res) => {
    res.json({
        message: "Box fitx application works",
    });
});
app.listen(3000, () => {
    console.log(`server listening on PORT 3000`);
});
//# sourceMappingURL=index.js.map