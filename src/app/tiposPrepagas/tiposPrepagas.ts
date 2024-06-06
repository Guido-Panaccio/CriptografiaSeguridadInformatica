import { IPrepaga } from "@/types/prepaga";

const apiUrl = `http://localhost:3000/api/tiposPrepaga`;

export const getAllPrepagas = async (): Promise<IPrepaga[]> => {
    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        cache: 'no-store',
    });

    if(response.ok) {
        const data = await response.json();
        return data.tiposPrepagas;
    }else {
        throw new Error('Error al querer obtener las prepagas');
    } 
};

export const insertarPrepaga = async (infoTipoPrepaga: IPrepaga) : Promise<IPrepaga | void> => {

    const tipoPrepagaNuevo = {
        tipoPrepaga:{
            idPrepaga: infoTipoPrepaga.idPrepaga,
            descripcion: infoTipoPrepaga.descripcion
        }
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tipoPrepagaNuevo)
        });

        if(response.ok) {
            const data = await response.json();
            return data.pacientes
        }else {
            throw new Error('Error al querer ingresar la prepaga');
        } 
    } catch (error) {
        console.error('Error:', error);
    }
};

export const editarPrepaga = async (infoTipoPrepaga: IPrepaga, idPrepagaModificar: string) : Promise<IPrepaga | void> => {

    const tipoPrepagaEditar = {
        tipoPrepaga:{
            idPrepagaModificar: idPrepagaModificar,
            idPrepaga: infoTipoPrepaga.idPrepaga,
            descripcion: infoTipoPrepaga.descripcion
        }
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tipoPrepagaEditar)
        });
    
        if (response.ok) {
            const data = await response.json();
            return data
        }else {
            throw new Error('Error al querer editar al paciente');
        } 
    } catch (error) {
        console.error('Error:', error);
    }   
};

export const eliminarPrepaga = async (idPrepaga: string) : Promise<void> => {
    try {
        const response = await fetch(`${apiUrl}?IdPrepaga=${idPrepaga}`, {
            method: 'DELETE',
        }); 
        
        if (!response.ok) {
            throw new Error('Error al querer eliminar la prepaga');
        }
    } catch (error) {
        console.error('Error:', error);
    }  
};