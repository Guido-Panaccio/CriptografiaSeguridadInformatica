import {NextRequest, NextResponse} from "next/server"
import prisma from "../../../../prisma/client"

export const GET = async (req: NextRequest) => {
    const usuario = req.nextUrl.searchParams.get("usuario")
    const nombreUsuario = req.nextUrl.searchParams.get("nombreUsuario")
    const apellidoUsuario = req.nextUrl.searchParams.get("apellidoUsuario")

    if (nombreUsuario && apellidoUsuario) {
        try{
            const pacientes = await prisma.usuarios.findMany({
                where: {
                    nombre: nombreUsuario,
                    apellido: apellidoUsuario,
                },
            });

            if (pacientes) {
                return NextResponse.json({
                    pacientes
                });
            } else {
                return NextResponse.json({
                    mensaje: 'No hay usuario registrado',
                });
            }
        } catch (error) {
            return NextResponse.json({
                error: 'Error al procesar la solicitud',
            });
        }
        } else{
            try{
                const user = await prisma.usuarios.findFirst({
                    where: {
                        username: usuario,
                    },
                });

                if (user) {
                    // El email existe en la base de datos
                    return NextResponse.json({
                        user,
                    });
                }

            }catch(error){
                return NextResponse.json({
                    error: 'Error al procesar la solicitud',
                });
            }
        }
    }

export const GET_BY_KEY = async (req: NextRequest) => {
    const usuario = req.nextUrl.searchParams.get("usuario")

    try{
        const user = await prisma.usuarios.findFirst({
            where: {
                idUsuario: Number(usuario),
            },
        });

        if (user) {
            // El email existe en la base de datos
            return NextResponse.json({
                user,
            });
        }

    }catch(error){
        return NextResponse.json({
            error: 'Error al procesar la solicitud',
        });
    }
}