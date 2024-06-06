import { IPaciente } from "./pacientes";
import { IUsuario } from "./usuario";
import {IMedico} from "./medico";

export interface ITurno {
  idTurno: number;
  idPaciente: number;
  idMedico: number;
  idSala: number;
  fechaTurno: Date;
  idUsuario: number; 
  paciente: IPaciente;
  usuario: IUsuario;
  medico: IMedico;
}