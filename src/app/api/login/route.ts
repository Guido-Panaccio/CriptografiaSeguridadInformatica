import {NextRequest, NextResponse} from "next/server"
import prisma from "../../../../prisma/client"
import {sign} from "jsonwebtoken"
import {serialize} from "cookie"

const MAX_AGE = 60 * 60 * 10 // 10 hours
 
export const GET = async (req: NextRequest) => {
    const usuario = req.nextUrl.searchParams.get("usuario")
    const contraseña = req.nextUrl.searchParams.get("contraseña")

    const secret = process.env.JWT_SECRET || ""
    const token = sign(
        {
           usuario,
        },
        secret,
        {
            expiresIn: MAX_AGE,
        }
    )
    const serialized = serialize("OutSiteJWT", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
        maxAge: MAX_AGE,
    })

    try{
        const user = await prisma.usuarios.findFirst({
            where: {
                username: usuario,
                contrasena: contraseña,
            },
        });

        if (user) {
            // El usuario existe en la base de datos
            const response = NextResponse.json({
                mensaje: 'Usuario autenticado correctamente',
                usuario: usuario,
            })
            response.headers.set("Set-Cookie", serialized)
            return response
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