import { useState, type FC, type RefObject } from "react"
import type { Task } from "../../domain/types/tasks.type"
import { Box, Button } from "@mui/material";
import { PlayArrow as PlayIcon, Pause as PauseIcon, VolumeOff as VolMuteIcon, VolumeUp as VolumeIcon, SkipPrevious as InicioIcon } from '@mui/icons-material';

interface TaskPlayerProps {
    tasks: Task[]
    playerRef: RefObject<HTMLVideoElement | null>;
}

const TaskPlayer: FC<TaskPlayerProps> = ({ tasks, playerRef }) => {
    const [reproduciendo, setReproduciendo] = useState(false)
    const [mutear, SetMutear] = useState(false)
    const [tiempoActual, setTiempoActual] = useState('')
    const [tiempoFinal, setTiempoFinal] = useState('')

    const segundosATiempo = (segundos: number) => {
        const minutos = Math.floor(segundos / 60);
        const segundosRestantes = segundos % 60;
        return `${minutos}:${segundosRestantes.toString().padStart(2, "0")}`;
    }

    const segmentosDescartados = tasks
        .filter(task => task.descartar)
        .sort((a, b) => a.tiempoinicio - b.tiempoinicio)
        .map(task => ({
            inicio: task.tiempoinicio,
            fin: task.tiempofin,
            duracion: task.tiempofin - task.tiempoinicio
        }));
    return (
        <>
            <video
                ref={playerRef}
                src="src/components/TaskVideos/ejemploentrevista.mp4"
                controls={false}
                width="100%"
                height="100%"
                onTimeUpdate={(e) => {
                    setTiempoActual(segundosATiempo(Math.round(e.currentTarget.currentTime)))
                    setTiempoFinal(segundosATiempo(Math.round(e.currentTarget.duration)))
                    const tiempoAhora = e.currentTarget.currentTime;
                    const segmento = segmentosDescartados.find(
                        s => tiempoAhora >= s.inicio && tiempoAhora < s.fin
                    );
                    if (segmento) {
                        e.currentTarget.currentTime = segmento.fin;
                    } else {
                    }
                }}
            />
            <Box display="flex" justifyContent="space-between" alignItems="center">
                {!reproduciendo ?
                    <Button onClick={() => {
                        if (!playerRef.current) return;
                        playerRef.current.play()
                        setReproduciendo(true)
                    }}>
                        <PlayIcon />
                    </Button>
                    :
                    <Button onClick={() => {
                        if (!playerRef.current) return;
                        playerRef.current.pause()
                        setReproduciendo(false)
                    }}>
                        <PauseIcon />
                    </Button>
                }
                {!mutear ?
                    <Button onClick={() => {
                        if (!playerRef.current) return;
                        playerRef.current.muted = true
                        SetMutear(true)
                    }}>
                        <VolumeIcon />
                    </Button>
                    :
                    <Button onClick={() => {
                        if (!playerRef.current) return;
                        playerRef.current.muted = false
                        SetMutear(false)
                    }}>
                        <VolMuteIcon />
                    </Button>
                }
                <Button onClick={() => {
                    if (!playerRef.current) return;
                    playerRef.current.currentTime = 0;
                }}>
                    <InicioIcon />
                </Button>
                <Button onClick={() => {
                    if (!playerRef.current) return;
                    playerRef.current.currentTime = playerRef.current.currentTime - 10
                    if (playerRef.current.currentTime < 0) {
                        playerRef.current.currentTime = 0
                    }
                }}>
                    - 10
                </Button>
                <Button onClick={() => {
                    if (!playerRef.current) return;
                    playerRef.current.currentTime = playerRef.current.currentTime + 10
                    if (playerRef.current.currentTime > playerRef.current.duration) {
                        playerRef.current.currentTime = playerRef.current.duration
                        playerRef.current.pause()
                        setReproduciendo(true)
                    }
                }}>
                    + 10
                </Button>
                {tiempoActual} / {tiempoFinal}
            </Box>
        </>
    )
}

export default TaskPlayer