import { IPaciente } from "./pacientes";

export interface IPrepaga {
    idPrepaga: string,
    descripcion: string,
    Pacientes: IPaciente[] | null;
};