import { cookies } from "next/headers";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUsuario } from "@/types/usuario";

export const getUserByUsername = async (username: string) => {
    const params = {
        usuario: username,
    };

    const queryString = new URLSearchParams(params).toString();
    const apiUrl = `http://localhost:3000/api/usuario?${queryString}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store',
        });

        if (response.ok) {
            const data = await response.json();
            return data.user
        } else {
            throw new Error('Error en la solicitud');
        }
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
};

export const obtenerUsuarioActual = async () => {
    const cookieStore = cookies()
    const token = cookieStore.get("OutSiteJWT")

    let nombreUsuario = "Usuario";
    if (token) {
        const decodedToken = jwt.verify(token.value, 'secret') as JwtPayload
        const firstKey = Object.keys(decodedToken)[0]
        nombreUsuario = decodedToken[firstKey]
    }
    
    const usuario = await getUserByUsername(nombreUsuario);
    return usuario;
}