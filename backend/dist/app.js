import express from "express";
import cors from "cors";
import tasksRoutes from "./routes/tasks.routes.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/tasks", tasksRoutes);
app.get("/", (_req, res) => {
    res.send("backend is working");
});
export default app;
//# sourceMappingURL=app.js.map