import { GET } from "@/app/api/usuarios/route";
import { NextRequest } from "next/server";
import bcrypt from 'bcryptjs'

interface UserData {
    apellido: string;
    confirmPassword: string;
    documento: string;
    email: string;
    nombre: string;
    password: string;
    tipoDocumento: string;
}

const verificarEmailUsuario = async (username: string) => {
    const params = {
        usuario: username,
    };

    const queryString = new URLSearchParams(params).toString();
    const apiUrl = `http://localhost:3000/api/registro?${queryString}`;
    console.log(apiUrl)
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
            console.log('Mensaje GET ok con + ' + data.mensaje);
            return data.mensaje
        } else {
            throw new Error('Error en la solicitud');
        }
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
};

export const insertarUsuario = async (infoUsuario: UserData) => {
    //Verifico si previamente hay un usuario con ese mismo email
    var existenciaUsuario = await verificarEmailUsuario(infoUsuario.email)
    
    if(existenciaUsuario){
        return 'El email ingresado ya se encuentra en uso'
    }

    const credenciales = {
        credenciales:{
            apellido: infoUsuario.apellido,
            nombre: infoUsuario.nombre,
            tipoDocumento: infoUsuario.tipoDocumento,
            documento: Number(infoUsuario.documento),
            direccion: null,
            telefono: null,
            username: infoUsuario.email,
            contrasena: bcrypt.hashSync(infoUsuario.password, 10)
        }
    };

    console.log(JSON.stringify(credenciales))
    try{
        const response = await fetch('http://localhost:3000/api/registro', {
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
    }catch (error) {
        console.error('Error al obtener los datos:', error);
    }
    
    
};