import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import type { Task } from "../../domain/types/tasks.type";
import type { FC } from "react";
import TaskListItem from "../TaskListItem";

interface TaskTableProps {
    tasks: Task[]
    onPlayTask: (tiempo: number) => void
    onDeleteTask: (id: number) => void
    onEditTask: (task: Task) => void
}

const TaskTable: FC<TaskTableProps> = ({ tasks, onPlayTask, onDeleteTask, onEditTask }) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 658 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Etiqueta</TableCell>
                        <TableCell>Tiempo inicio</TableCell>
                        <TableCell>Tiempo fin</TableCell>
                        <TableCell>¿Descartar?</TableCell>
                        <TableCell>Opciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.map((task) => {
                        return (
                            <TaskListItem
                                task={task}
                                key={task.id}
                                onPlay={onPlayTask}
                                onDelete={onDeleteTask}
                                onEdit={onEditTask}
                            />
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer >
    )
}

export default TaskTable