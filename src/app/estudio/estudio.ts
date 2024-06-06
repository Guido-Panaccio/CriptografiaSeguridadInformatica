import { IEstudio } from "@/types/estudio";
import {IExamen} from "../../types/examen";

const apiUrl = `http://localhost:3000/api/estudio`;

export const insertarEstudio = async (infoEstudio: IEstudio): Promise<IEstudio | void> => {
    const formData = new FormData();
    formData.append('tipoEstudio', infoEstudio.tipoEstudio);
    formData.append('resultado', infoEstudio.resultado || ''); // Asegúrate de manejar un valor nulo si es necesario
    formData.append('examenesIdExamen', String(infoEstudio.examenesIdExamen || '')); // Convierte a string si es necesario
    formData.append('Estudio', infoEstudio.Estudio || ''); // Aquí se adjunta el archivo
    formData.append('fechaRealizacion', infoEstudio.fechaRealizacion.toString());

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            return data.pacientes;
        } else {
            throw new Error('Error al querer ingresar al paciente');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

export const editarEstudio = async (infoEstudio: IEstudio) : Promise<IEstudio | void> => {

    const formData = new FormData();
    formData.append('idEstudio', infoEstudio.idEstudio.toString());
    formData.append('tipoEstudio', infoEstudio.tipoEstudio);
    formData.append('resultado', infoEstudio.resultado || ''); // Asegúrate de manejar un valor nulo si es necesario
    formData.append('examenesIdExamen', String(infoEstudio.examenesIdExamen || '')); // Convierte a string si es necesario
    formData.append('Estudio', infoEstudio.Estudio || ''); // Aquí se adjunta el archivo
    formData.append('estudioPath', infoEstudio.estudioPath || '');
    formData.append('fechaRealizacion', infoEstudio.fechaRealizacion.toString());

    try {
        const response = await fetch(apiUrl, {
            method: 'PUT',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Error al querer ingresar al paciente');
        }
    } catch (error) {
        console.error('Error:', error);
    } 
};

export const eliminarEstudio = async (idEstudio: number) : Promise<void> => {
    try {
        const response = await fetch(`${apiUrl}?IdEstudio=${idEstudio}`, {
            method: 'DELETE',
        }); 
        
        if (!response.ok) {
            throw new Error('Error al querer eliminar el estudio');
        }
    } catch (error) {
        console.error('Error:', error);
    }  
};