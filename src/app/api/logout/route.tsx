import {NextRequest, NextResponse} from "next/server"
import {sign} from "jsonwebtoken"
import {serialize} from "cookie"

export const GET = async (req: NextRequest) => {
    const serialized = serialize("OutSiteJWT", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
        maxAge: -1, // elimina la cookie inmediatamente
    })

    const response = NextResponse.json({
        mensaje: 'Sesion cerrada correctamente',
    })
    response.headers.set("Set-Cookie", serialized)
    return response
}




