import { IExamen } from "./examen";

export interface IUsuario {
    idUsuario: number;
    apellido: string;
    nombre: string;
    tipoDocumento: string;
    documento: number;
    direccion?: string;
    telefono?: string;
    username?: string;
    contrasena?: string;
    Examenes: IExamen[]; // Relación inversa con Exámenes
  }