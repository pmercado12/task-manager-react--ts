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

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

/*
curl.exe -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"id":3,"title":"New task","completed":false}'

curl.exe -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{ \"id\":3 , \"title\" : \"New task\", \"completed\" : false }'

,\"title\":\"New task\",\"completed\":false

npm install prisma @prisma/client

npx prisma init

docker run --name postgres-container \
  -e POSTGRES_PASSWORD=123456 \
  -p 5432:5432 \
  -v postgres_data:/var/lib/postgresql \
  -d postgres:16


  docker run --name postgres-container \
  -e POSTGRES_PASSWORD=123456 \
  -e TZ=America/La_Paz \
  -e PGTZ=America/La_Paz \
  -p 5432:5432 \
  -v postgres_data:/var/lib/postgresql \
  -d postgres:16

  npx prisma migrate dev
*/