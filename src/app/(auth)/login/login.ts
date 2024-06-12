import { GET } from "@/app/api/usuarios/route";
import { NextRequest } from "next/server";


export const verificarUsuario = async (username: string, password: string) => {
    const credenciales = {
        credenciales:{
            usuario: username,
            contraseña: password
        }
    };

    console.log(JSON.stringify(credenciales))

    const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credenciales)
    });
    
    if (response.ok) {
        const data = await response.json();
        console.log('Mensaje POST ok con + ' + data.mensaje);
        return data.mensaje
    } else {
        throw new Error('Error en la solicitud');
    }

    // const params = {
    //     usuario: username,
    //     contraseña: password
    // };

    // const queryString = new URLSearchParams(params).toString();
    // const apiUrl = `http://localhost:3000/api/login?${queryString}`;
    // console.log(apiUrl)
    // try {
    //     const response = await fetch(apiUrl, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //             // Puedes añadir más encabezados si es necesario
    //         }
    //     });

    //     if (response.ok) {
    //         const data = await response.json();
    //         console.log('Mensaje GET ok con + ' + data.mensaje);
    //         return data.mensaje
    //     } else {
    //         throw new Error('Error en la solicitud');
    //     }
    // } catch (error) {
    //     console.error('Error al obtener los datos:', error);
    // }
};