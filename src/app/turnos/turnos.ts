import { ISalas } from "@/types/salas";
import {ITurno} from "../../types/turnos";

const apiUrl = `http://localhost:3000/api/turnos`;

export const getAllturnos = async (): Promise<ITurno[]> => {
    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        cache: 'no-store',
    });

    if(response.ok) {
        const data = await response.json();
        return data.turnos
    }else {
        throw new Error('Error al querer obtener los turnos');
    } 
};

export const insertarTurno = async (infoturno: ITurno) : Promise<ITurno | void> => {

    const turnoNuevo = {
        turno:{
            idTurno: infoturno.idTurno,
            idPaciente: infoturno.idPaciente,
            idMedico: infoturno.idMedico,
            idSala: infoturno.idSala,
            fechaTurno: infoturno.fechaTurno,
            idUsuario: infoturno.idUsuario,
        }
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(turnoNuevo)
        });

        if(response.ok) {
            const data = await response.json();
            return data.turnos
        }else {
            throw new Error('Error al querer ingresar al turno');
        } 
    } catch (error) {
        console.error('Error:', error);
    }
};


export const editarTurno = async (infoTurno: any) : Promise<ITurno | void> => {
    try {
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(infoTurno)
        });
        if (response.ok) {
            const data = await response.json();
            return data.turnos
        }else {
            throw new Error('Error al querer editar al turno');
        } 
    } catch (error) {
        console.error('Error:', error);
    }   
};

export const eliminarTurno = async (idTurno: number) : Promise<void> => {
    try {
        const response = await fetch(`${apiUrl}?IdTurno=${idTurno}`, {
            method: 'DELETE',
        }); 
        
        if (!response.ok) {
            throw new Error('Error al querer eliminar al turno');
        }
    } catch (error) {
        console.error('Error:', error);
    }  
};

export const getSalaEstaReservada = async (idTurno: string, fechaTurno : string, sala: string): Promise <ISalas | void> => {
    const params = {
        idTurno: idTurno,
        fechaTurno: fechaTurno,
        sala: sala
    };
    const queryString = new URLSearchParams(params).toString();
    const apiUrl = `http://localhost:3000/api/turnos?${queryString}`;

    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        cache: 'no-store',
    });

    if(response.ok) {
        const data = await response.json();
        return data.existe;
    }else {
        throw new Error('Error al querer obtener las salas');
    } 
    
}