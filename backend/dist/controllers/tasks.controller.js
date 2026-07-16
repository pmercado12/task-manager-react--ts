import { prisma } from '../lib/prisma.js';
export const getTasks = async (req, res) => {
    try {
        const tasks = await prisma.tasks.findMany({
            orderBy: {
                fecha_creacion: "asc"
            }
        });
        res.json(tasks);
    }
    catch (error) {
        console.error("Error al obtener tareas:", error);
        res.status(500).json({ error: "No se pudieron obtener las tareas" });
    }
};
export const createTask = async (req, res) => {
    try {
        const newTask = {
            id: req.body.id,
            text: req.body.text,
            state: req.body.state
        };
        if (newTask.text === undefined || newTask.text.trim() === "") {
            return res.status(400).json({ error: "El campo 'texto' es obligatorio" });
        }
        /*const response = await prisma.tasks.create({
            data: newTask,
        });*/
        const response = newTask;
        res.status(201).json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear la tarea" });
    }
};
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.tasks.delete({
            where: { id: id },
        });
        res.status(200).json("ok");
    }
    catch (error) {
        res.status(404).json({ error: "No se pudo eliminar la tarea" });
    }
};
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { text, state } = req.body;
        const updatedTask = await prisma.tasks.update({
            where: { id: id }, // Buscamos por el ID de la URL
            data: {
                ...(state !== undefined && { state }),
            },
        });
        res.json(updatedTask);
    }
    catch (error) {
        // Prisma lanza un error si el ID no existe
        res.status(404).json({ error: "Tarea no encontrada o error de datos" });
    }
};
//# sourceMappingURL=tasks.controller.js.map