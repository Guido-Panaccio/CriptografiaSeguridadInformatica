import { IMedico } from "@/types/medico";

export const getMedico = async (nombreMedico: string, apellidoMedico: string, DNIMedico: string): Promise<IMedico | void> => {
    const params = {
        nombreMedico: nombreMedico,
        apellidoMedico: apellidoMedico,
        DNIMedico: DNIMedico
    };

    const queryString = new URLSearchParams(params).toString();
    const apiUrl = `http://localhost:3000/api/medico?${queryString}`;
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
                // Puedes añadir más encabezados si es necesario
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Mensaje GET ok con + ' + data.mensaje );
            return data.medico;
        } else {
            throw new Error('Error en la solicitud');
        }
    } catch (error) {
        console.error('Error al obtener el Medico:', error);
    }
};