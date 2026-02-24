import type { Maybe } from ".";

export interface Task {
    id: number;
    etiqueta: string;
    tiempoinicio: number;
    tiempofin: number;
    descartar: boolean;
}

export interface TaskInput {
    id?: Maybe<number>
    etiqueta: string;
    tiempoinicio: number;
    tiempofin: number;
    descartar: boolean;
}