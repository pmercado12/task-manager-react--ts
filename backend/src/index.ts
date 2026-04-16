
import { prisma } from './lib/prisma.js' // Recuerda la extensión .js si usas ESM puro

import cors from 'cors';
import express from 'express';

const app = express();
const PORT = 3000;
//dotenv.config();


app.use(express.json());
app.use(cors());


app.get("/", (req:any,res:any)=>{
    res.send("backend is working");
});

app.get("/tasks", async (req:any,res:any)=>{
    try {        
        const tasks = await prisma.tasks.findMany();
        res.json(tasks);
    } catch (error) {
        console.error("Error al obtener tareas:", error);
        res.status(500).json({ error: "No se pudieron obtener las tareas" });
    }     
});

app.post("/tasks", async (req:any, res:any) => {    
    
    try {
        const newTask = {
            id: req.body.id,
            text: req.body.text,
            state: req.body.state
        };

        const response = await prisma.tasks.create({
            data: newTask,
        });

        res.status(201).json(newTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear la tarea" });
    }    
});

app.delete("/tasks/:id", async (req:any, res:any) => {    
    try {
        const { id } = req.params;

        await prisma.tasks.delete({
        where: { id: id },
        });

        // 204 significa "No Content", éxito pero sin nada que devolver
        res.status(200).json("ok"); 
    } catch (error) {
        res.status(404).json({ error: "No se pudo eliminar la tarea" });
    }
});

app.put('/tasks/:id', async (req:any, res:any) => {
    try {
        const { id } = req.params;
        const { text, state } = req.body;

        const updatedTask = await prisma.tasks.update({
        where: { id: id }, // Buscamos por el ID de la URL
        data: {
            //text: text,
            state: state,
        },
        });

        res.json(updatedTask);
    } catch (error) {
        // Prisma lanza un error si el ID no existe
        res.status(404).json({ error: "Tarea no encontrada o error de datos" });
    }



});

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
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
*/