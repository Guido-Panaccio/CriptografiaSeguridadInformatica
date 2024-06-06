import { IExamen } from "./examen";

export interface ITipoExamen {
    tipoExamen: string,
    descripcion: string,
    examenes: IExamen[] | null;
};