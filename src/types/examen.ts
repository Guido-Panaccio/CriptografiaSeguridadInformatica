import { IEstudio } from "./estudio";
import { IPaciente } from "./pacientes";
import { ITipoExamen } from "./tiposExamenes";
import { IUsuario } from "./usuario";

export interface IExamen {
  idExamen: number;
  idPaciente: number;
  idUsuario: number; // Esto hace referencia al ID del usuario
  tipoExamen: string;
  observaciones: string | null;
  fechaRealizacion: Date;
  usuario: IUsuario | null; // Relación con el modelo IUsuario
  tipoExamenObject: ITipoExamen | null;
  estudio: IEstudio[] | null;
  paciente: IPaciente | null;
}