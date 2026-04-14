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