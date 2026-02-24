import type { Task } from "../types/tasks.type"

export const tasksDefault: Task[] = [
    {
        id: 1,
        etiqueta: 'Inicio',
        tiempoinicio: 0,
        tiempofin: 32,
        descartar: true,
    },
    {
        id: 2,
        etiqueta: 'Introducción',
        tiempoinicio: 32,
        tiempofin: 98,
        descartar: false,
    },
]