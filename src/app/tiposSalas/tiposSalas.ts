import { ISalas } from "@/types/salas";

const apiUrl = `http://localhost:3000/api/tiposSalas`;

export const getAllSalas = async (): Promise<ISalas[]> => {
    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        cache: 'no-store',
    });

    if(response.ok) {
        const data = await response.json();
        return data.tiposSalas;
    }else {
        throw new Error('Error al querer obtener las salas');
    } 
};

export const editarSala = async (infoSala: any) : Promise<ISalas | void> => {
    try {
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(infoSala)
        });

        if(response.ok) {
            const data = await response.json();
            return data.tiposSalas;
        }else {
            throw new Error('Error al querer editar la sala');
        } 
    } catch (error) {
        console.error('Error:', error);
    }
}

export const eliminarSala = async (idSala: number) : Promise<void> => {
    try {
        const response = await fetch(`${apiUrl}?IdSala=${idSala}`, {
            method: 'DELETE',
        }); 
        
        if (!response.ok) {
            throw new Error('Error al querer eliminar la sala');
        }
    } catch (error) {
        console.error('Error:', error);
    }  
};

export const insertarSala = async (infoSala: any) : Promise<ISalas | void> => {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(infoSala)
        });

        if(response.ok) {
            const data = await response.json();
            return data.tiposSalas;
        }else {
            throw new Error('Error al querer insertar la sala');
        } 
    } catch (error) {
        console.error('Error:', error);
    }
}

export const getSala = async (idSala: string): Promise<ISalas | void> => {
    try {
        const response = await fetch(`${apiUrl}?idSala=${idSala}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store',
        });
        if (response.ok) {
            const data = await response.json();
            return data.existe;
        } else {
            throw new Error('Error al querer obtener la sala');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}