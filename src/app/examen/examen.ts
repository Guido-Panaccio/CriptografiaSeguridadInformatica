import {IExamen} from "../../types/examen";

const apiUrl = `http://localhost:3000/api/examen`;

export const getExamenesByPaciente = async (idPaciente: string): Promise<IExamen[]> => {
    const params = {
        idPaciente: idPaciente,
    };
    
    const queryString = new URLSearchParams(params).toString();

    const response = await fetch(apiUrl + `?${queryString}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        cache: 'no-store',
    });

    if(response.ok) {
        const data = await response.json();
        return data.examenes
    }else {
        throw new Error('Error al querer obtener los examenes del paciente');
    } 
};

export const insertarExamen = async (infoExamen: IExamen) : Promise<IExamen | void> => {

    const examenNuevo = {
        examen: {
            idPaciente: infoExamen.idPaciente,
            idUsuario: infoExamen.idUsuario,
            tipoExamen: infoExamen.tipoExamen,
            observaciones: infoExamen.observaciones,
            fechaRealizacion: infoExamen.fechaRealizacion
        }
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(examenNuevo)
        });

        if(response.ok) {
            const data = await response.json();
            return data.pacientes
        }else {
            throw new Error('Error al querer ingresar al paciente');
        } 
    } catch (error) {
        console.error('Error:', error);
    }
};

export const editarExamen = async (infoExamen: IExamen) : Promise<IExamen | void> => {

    const examenEditar = {
        examen:{
            idExamen: infoExamen.idExamen,
            idPaciente: infoExamen.idPaciente,
            idUsuario: infoExamen.idUsuario,
            tipoExamen: infoExamen.tipoExamen,
            observaciones: infoExamen.observaciones,
            fechaRealizacion: infoExamen.fechaRealizacion,
            usuario: infoExamen.usuario
        }
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(examenEditar)
        });
    
        if (response.ok) {
            const data = await response.json();
            return data.pacientes
        }else {
            throw new Error('Error al querer editar al paciente');
        } 
    } catch (error) {
        console.error('Error:', error);
    }   
};

export const eliminarExamen = async (idExamen: number) : Promise<void> => {
    try {
        const response = await fetch(`${apiUrl}?IdExamen=${idExamen}`, {
            method: 'DELETE',
        }); 
        
        if (!response.ok) {
            throw new Error('Error al querer eliminar al examen');
        }
    } catch (error) {
        console.error('Error:', error);
    }  
};