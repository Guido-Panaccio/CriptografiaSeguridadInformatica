export interface IMedico{
    idMedico: number;
    apellido: string;
    nombre: string;
    tipoDocumento: string;
    documento: number;
    direccion?: string;
    telefono?: string;
    especialidad: string;
    idPrepaga: string;
  }