import { ITipoExamen } from "@/types/tiposExamenes";

const apiUrl = `http://localhost:3000/api/tiposExamen`;

export const getAllTiposExamenes = async (): Promise<ITipoExamen[]> => {
    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        cache: 'no-store',
    });

    if(response.ok) {
        const data = await response.json();
        return data.tiposExamenes;
    }else {
        throw new Error('Error al querer obtener los tipos de examenes');
    } 
};

export const insertarTipoExamen = async (infoTipoExamen: ITipoExamen) : Promise<ITipoExamen | void> => {

    const tipoExamenNuevo = {
        tipoExamen:{
            tipoExamen: infoTipoExamen.tipoExamen,
            descripcion: infoTipoExamen.descripcion
        }
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tipoExamenNuevo)
        });

        if(response.ok) {
            const data = await response.json();
            return data.pacientes
        }else {
            throw new Error('Error al querer ingresar el tipo de examen');
        } 
    } catch (error) {
        console.error('Error:', error);
    }
};

export const editarTipoExamen = async (infoTipoExamen: ITipoExamen, tipoExamenModificar: string) : Promise<ITipoExamen | void> => {

    const tipoExamenEditar = {
        tipoExamen:{
            tipoExamenModificar: tipoExamenModificar,
            tipoExamen: infoTipoExamen.tipoExamen,
            descripcion: infoTipoExamen.descripcion
        }
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tipoExamenEditar)
        });
    
        if (response.ok) {
            const data = await response.json();
            return data
        }else {
            throw new Error('Error al querer editar el tipo de examen');
        } 
    } catch (error) {
        console.error('Error:', error);
    }   
};

export const eliminarTipoExamen = async (tipoExamen: string) : Promise<void> => {
    try {
        const response = await fetch(`${apiUrl}?TipoExamen=${tipoExamen}`, {
            method: 'DELETE',
        }); 
        
        if (!response.ok) {
            throw new Error('Error al querer eliminar el tipo de examen');
        }
    } catch (error) {
        console.error('Error:', error);
    }  
};