import {NextRequest, NextResponse} from "next/server"
import prisma from "../../../../prisma/client"
import {sign} from "jsonwebtoken"
import {serialize} from "cookie"
import bcrypt from 'bcryptjs'
import * as nodemailer from 'nodemailer';

const MAX_AGE = 60 * 60 * 10 // 10 hours

const codigosAutenticacion: { [key: string]: string } = {};

// Configuración del servicio de correo electrónico (puedes usar cualquier proveedor)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.ADD_2FA,
        pass: process.env.PS_2FA
    }
});

// Función para generar un código de verificación
function generarCodigoVerificacion(username:string): string {
    // Generar un código aleatorio de 6 dígitos
    const codigo = Math.floor(100000 + Math.random() * 900000).toString();
    codigosAutenticacion[username] = codigo;
    return codigo;
}

// Función para enviar el código de verificación por correo electrónico
async function enviarCorreoVerificacion(direccion: string, codigo: string): Promise<void> {
    const mailOptions = {
        from: process.env.ADD_2FA,
        to: direccion, // Correo electrónico del usuario
        subject: 'Código de Verificación',
        text: `Tu código de verificación es: ${codigo}`
    };
    console.log(mailOptions);

    transporter.sendMail(mailOptions,function(error, info){
        if (error){
           console.log(error);
        }else{
           console.log('Message sent: ' + info.response);
        };
    });
}

 
export const GET = async (req: NextRequest) => {
    const usuario = req.nextUrl.searchParams.get("usuario")
    const contraseña = req.nextUrl.searchParams.get("contraseña") || ""


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
            },
        });

        if (user) {
            // Verificar si contraseña es correcta con bcrypt
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

export const POST = async (req: NextRequest) => {
    const requestData = await req.json();

    const usuario = requestData.credenciales.usuario;
    const contraseña = requestData.credenciales.contraseña;
    const codigo = requestData.credenciales.codigo;

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
                username: usuario
            },
        });
        if (user) {
            if (!codigo){            
                // El usuario existe en la base de datos
                const match = bcrypt.compareSync(contraseña, user.contrasena)
                if(!match){
                    return NextResponse.json({
                        mensaje: 'Credenciales incorrectas',
                    });
                }
                const response = NextResponse.json({
                    mensaje: 'Usuario autenticado correctamente',
                    usuario: usuario,
                })
                const codigoVerificacion = generarCodigoVerificacion(usuario)
                await enviarCorreoVerificacion(usuario, codigoVerificacion)
                return response
            } else {
                // Tiene codigo
                const match = bcrypt.compareSync(contraseña, user.contrasena)
                if(!match){
                    return NextResponse.json({
                        mensaje: 'Credenciales incorrectas',
                    });
                }
                if (codigosAutenticacion[usuario]===codigo){
                    const response = NextResponse.json({
                        mensaje: 'Usuario autenticado correctamente',
                        usuario: usuario,
                    })
                    response.headers.set("Set-Cookie", serialized)
                    return response
                } else {                   
                    return NextResponse.json({
                        mensaje: 'Credenciales incorrectas',
                    });
                }                
            }
        } else {
            // El usuario no existe en la base de datos
            return NextResponse.json({
                mensaje: 'Credenciales incorrectas',
            });
        }
    }
        catch(error){
        return NextResponse.json({
            error: 'Error al procesar la solicitud',
        });
    }
}