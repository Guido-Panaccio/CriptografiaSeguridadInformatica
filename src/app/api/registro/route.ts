import {NextRequest, NextResponse} from "next/server"
import prisma from "../../../../prisma/client"

export const GET = async (req: NextRequest) => {
    const usuario = req.nextUrl.searchParams.get("usuario")

    try{
        const user = await prisma.usuarios.findFirst({
            where: {
                username: usuario,
            },
        });

        if (user) {
            // El email existe en la base de datos
            return NextResponse.json({
                mensaje: true,
            });
        } else {
            // El usuario no existe en la base de datos
            return NextResponse.json({
                mensaje: false,
            });
        }
        
    }catch(error){
        return NextResponse.json({
            error: 'Error al procesar la solicitud',
        });
    }
}

export const POST = async (req: NextRequest) => {
    const requestData = await req.json();
    const credenciales = requestData.credenciales;

    try{
          const user = await prisma.usuarios.create({
            data: {
                apellido: credenciales.apellido,
                nombre: credenciales.nombre,
                tipoDocumento: credenciales.tipoDocumento,
                documento : credenciales.documento,
                direccion: null,
                telefono: null,
                username: credenciales.username,
                contrasena: credenciales.contrasena,
            },
          })
        
          console.log(user);
          return NextResponse.json({
            mensaje: 'Usuario autenticado correctamente',
            usuario: user,
        });
    }catch(error){
        return NextResponse.json({
            error: 'Error al procesar la solicitud',
        });
    }
}