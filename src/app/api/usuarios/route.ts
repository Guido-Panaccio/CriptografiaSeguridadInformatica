import {NextRequest, NextResponse} from "next/server"
import prisma from "../../../../prisma/client"

export const GET = async (req: NextRequest) => {
    // return NextResponse.json(
    //     {message: "obteniendo usuarios"}, 
    //     {status: 200})
    const usuarios = await prisma.usuarios.findMany()
    return NextResponse.json({
        usuarios
    }) 
}

export const POST = async (req: NextRequest) => {
    const requestData = await req.json();
    const credenciales = requestData.credenciales;

    try{
        const usuario = await prisma.usuarios.findFirst({
            where: {
                username: credenciales.usuario,
                contrasena: credenciales.contraseña,
            },
        });

        if (usuario) {
            // El usuario existe en la base de datos
            return NextResponse.json({
                mensaje: 'Usuario autenticado correctamente',
                usuario: usuario,
            });
        } else {
            // El usuario no existe en la base de datos
            return NextResponse.json({
                mensaje: 'Credenciales incorrectas',
            });
        }
        
    }catch(error){
        return NextResponse.json({
            error: 'Error al procesar la solicitud',
        });
    }
}