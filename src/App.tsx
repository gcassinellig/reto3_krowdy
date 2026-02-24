import { Box, Button, Dialog, } from "@mui/material";
import { useRef, useState } from "react"
import type { Maybe } from "./domain/types";
import type { Task, TaskInput } from "./domain/types/tasks.type";
import { tasksDefault } from "./domain/constants";
import TaskTable from "./components/TaskTable";
import TaskForm from "./components/TaskForm";
import TaskPlayer from "./components/TaskPlayer";

interface DialogState {
  open: boolean;
  task?: Maybe<Task>
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(tasksDefault)

  const playerRef = useRef<HTMLVideoElement | null>(null);

  const saltarAlMinuto = (segundo: number) => {
    if (playerRef.current) {
      playerRef.current.currentTime = segundo;
    }
  };

  const [dialogState, setDialogState] = useState<DialogState>({
    open: false,
    task: null
  })

  const handleCloseDialog = () => {
    setDialogState({
      task: null,
      open: false
    })
  }

  const handleClickOpenDialog = (task?: Task) => {
    setDialogState({
      task,
      open: true
    })
  }

  const handleSubmit = (task: TaskInput) => {
    if (!task.id) {
      setTasks([...tasks, {
        ...task,
        id: tasks.length + 1
      }])
      handleCloseDialog()
      return
    }
    setTasks(tasks.map(taskItem => {
      if (taskItem.id === task.id) {
        return {
          ...taskItem,
          etiqueta: task.etiqueta,
          tiempoinicio: task.tiempoinicio,
          tiempofin: task.tiempofin,
          descartar: task.descartar
        }
      }
      return taskItem
    }))
    handleCloseDialog()
  }

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  const handleEditTask = (task: Task) => {
    handleClickOpenDialog(task)
  }

  const handlePlayTask = (tiempo: number) => {
    saltarAlMinuto(tiempo)
  }

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" border={1}>
        <Box>
          <TaskPlayer tasks={tasks} playerRef={playerRef} />
        </Box>
      </Box>

      <TaskTable tasks={tasks} onPlayTask={handlePlayTask} onDeleteTask={handleDeleteTask} onEditTask={handleEditTask} />

      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleClickOpenDialog()}
        >
          Agregar etiqueta
        </Button>
      </div>
      <Dialog open={dialogState.open} onClose={handleCloseDialog}>
        <TaskForm onSubmit={handleSubmit} task={dialogState.task} />
      </Dialog>
    </>
  )
}

export default App