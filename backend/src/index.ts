const cors = require('cors');
const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

let tasks=[
    {id:1, text:'Study express',state:'completed'},
    {id:2, text:'Study backend',state:'pending'}
];

app.get("/", (req:any,res:any)=>{
    res.send("backend is working");
});

app.get("/tasks", (req:any,res:any)=>{
    res.json(tasks);
});

app.post("/tasks", (req:any, res:any) => {    
    const newTask = {
        id: req.body.id,
        text: req.body.text,
        state: req.body.state
    };
    console.log('Tarea Registrada', newTask);
    tasks.push(newTask);
    res.json(newTask);
});

app.delete("/tasks/:id", (req:any, res:any) => {    
    const { id } = req.params;
    const index = tasks.findIndex(task => task.id == id);

    if (index !== -1) {
        tasks.splice(index, 1);
        res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
    } else {
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
});

app.put('/tasks/:id', (req:any, res:any) => {
    const { id } = req.params;
    const { state } = req.body;

    const task = tasks.find(u => u.id == id);

    if (task) {
        task.state = state;  // Actualiza el dato
        res.status(200).json({
            mensaje: 'Usuario actualizado',
            task
        });
    } else {
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
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
*/