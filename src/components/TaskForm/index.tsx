import { Button, DialogContent, DialogTitle, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material"
import type { Task, TaskInput } from "../../domain/types/tasks.type";
import { useState, type FC } from "react";
import type { Maybe } from "../../domain/types";

interface TaskFormProps {
    onSubmit: (data: TaskInput) => void;
    task?: Maybe<Task>
}


const TaskForm: FC<TaskFormProps> = ({ onSubmit, task }) => {
    const segundosATiempo = (segundos: number) => {
        const minutos = Math.floor(segundos / 60);
        const segundosRestantes = segundos % 60;
        return `${minutos}:${segundosRestantes.toString().padStart(2, "0")}`;
    }

    const tiempoASegundos = (tiempo: string) => {
        const tiemposplit = tiempo.split(":")
        const minuto = parseInt(tiemposplit[0])
        const segundo = parseInt(tiemposplit[1])
        return (minuto * 60) + segundo
    }

    const [etiqueta, setEtiqueta] = useState(task?.etiqueta ?? '')
    const [tiempoinicio, setTiempoinicio] = useState(task ? segundosATiempo(task?.tiempoinicio) : '0:00')
    const [tiempofin, setTiempofin] = useState(task ? segundosATiempo(task?.tiempofin) : '0:00')
    const [descartar, setDescartar] = useState(task?.descartar ?? false)
    const [mensajeError, setMensajeError] = useState('')

    const handleChangeEtiqueta = (
        { target: { value } }: React.ChangeEvent<HTMLInputElement, Element>) => setEtiqueta(value)
    const handleChangeTiempo =
        ({ target: { value } }: React.ChangeEvent<HTMLInputElement, Element>) => setTiempoinicio(value)
    const handleChangeTiempo2 =
        ({ target: { value } }: React.ChangeEvent<HTMLInputElement, Element>) => setTiempofin(value)
    const handleChangeDescartar =
        (event: React.ChangeEvent<HTMLInputElement>) => { setDescartar(event.target.value === "si"); };

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (etiqueta === '') {
            setMensajeError('Por favor escriba el nombre de la etiqueta')
        } else if ((tiempoinicio === tiempofin)) {
            setMensajeError('El tiempo de inicio y de fin no pueden ser iguales')
        } else if ((tiempoinicio > tiempofin)) {
            setMensajeError('El tiempo de inicio no puede ser mayor al tiempo de fin')
        } else {
            onSubmit({
                ...task,
                etiqueta,
                tiempoinicio: tiempoASegundos(tiempoinicio),
                tiempofin: tiempoASegundos(tiempofin),
                descartar
            })
            setEtiqueta('')
            setTiempoinicio('0:00')
            setTiempofin('0:00')
            setDescartar(false)
        }
    }

    return (
        <>
            <DialogTitle>Agregar etiqueta</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <div>
                        Nombre de etiqueta
                    </div>
                    <div>
                        <TextField value={etiqueta} onChange={handleChangeEtiqueta} />
                    </div>
                    <div>
                        Tiempo de inicio
                    </div>
                    <div>
                        <TextField value={tiempoinicio} onChange={handleChangeTiempo} />
                    </div>
                    <div>
                        Tiempo de fin
                    </div>
                    <div>
                        <TextField value={tiempofin} onChange={handleChangeTiempo2} />
                    </div>
                    <div>
                        ¿Etiqueta de descarte?
                    </div>
                    <div>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={descartar ? "si" : "no"}
                            onChange={handleChangeDescartar}
                        >
                            <FormControlLabel value="no" control={<Radio />} label="No" />
                            <FormControlLabel value="si" control={<Radio />} label="Si" />
                        </RadioGroup>
                    </div>
                    <div>
                        {mensajeError}
                    </div>
                    <Button type="submit" variant="contained" color="primary">
                        Guardar
                    </Button>
                </form>
            </DialogContent>
        </>
    )
}

export default TaskForm