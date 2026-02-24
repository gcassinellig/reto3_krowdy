import type { FC } from "react"
import type { Task } from "../../domain/types/tasks.type"
import { Button, TableCell, TableRow } from "@mui/material"
import { Delete as DeleteIcon, Edit as EditIcon, PlayArrow as PlayIcon, Block as NoPlayIcon } from '@mui/icons-material';

interface TaskListItemProps {
    task: Task
    onPlay: (taskTiempo: number) => void
    onDelete: (taskId: number) => void
    onEdit: (task: Task) => void
}

const TaskListItem: FC<TaskListItemProps> = ({ task, onPlay, onDelete, onEdit }) => {
    const handleClickPlay = () => {
        onPlay(task.tiempoinicio)
    }
    const handleClickDelete = () => {
        onDelete(task.id)
    }
    const handleClickEdit = () => {
        onEdit(task)
    }
    const segundosATiempo = (segundos: number) => {
        const minutos = Math.floor(segundos / 60);
        const segundosRestantes = segundos % 60;
        return `${minutos}:${segundosRestantes.toString().padStart(2, "0")}`;
    }
    return (
        <TableRow
            key={task.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell>
                {task.etiqueta}
            </TableCell>
            <TableCell>
                {segundosATiempo(task.tiempoinicio)}
            </TableCell>
            <TableCell>
                {segundosATiempo(task.tiempofin)}
            </TableCell>
            <TableCell>
                {task.descartar ? "Sí" : "No"}
            </TableCell>
            <TableCell>
                {task.descartar ?
                    <Button>
                        <NoPlayIcon />
                    </Button>
                    :
                    <Button onClick={() => handleClickPlay()}>
                        <PlayIcon />
                    </Button>
                }
                <Button onClick={() => handleClickEdit()}>
                    <EditIcon />
                </Button>
                <Button onClick={() => handleClickDelete()}>
                    <DeleteIcon />
                </Button>
            </TableCell>
        </TableRow>
    )
}

export default TaskListItem