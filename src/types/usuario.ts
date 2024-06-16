import { IExamen } from "./examen";
import { IRol } from "./rol";

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
    idRol?: string;
    Examenes: IExamen[]; // Relación inversa con Exámenes
    Rol: IRol | null;
  }