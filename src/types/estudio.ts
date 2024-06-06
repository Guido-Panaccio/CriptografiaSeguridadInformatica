import { IExamen } from "./examen";

export interface IEstudio {
    idEstudio: number,
    tipoEstudio: string
    resultado: string | null,
    examenesIdExamen: number | undefined,
    Examen: IExamen | null,
    Estudio: File | null,
    estudioPath: string | null
    fechaRealizacion: Date;
};