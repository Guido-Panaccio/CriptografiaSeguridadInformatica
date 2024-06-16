import { IUsuario } from "./usuario";

export interface IRol {
    idRol: string;
    descripcion: string;
    Usuarios: IUsuario[]; // Relación inversa con Exámenes
  }