import {cookies} from "next/headers"
import { NextRequest, NextResponse} from "next/server"
import {verify} from "jsonwebtoken"

export const GET = async (req: NextRequest) => {
    const cookieStore = cookies()
    const token = cookieStore.get("OutSiteJWT")

    if(!token){
        return NextResponse.json(
            {
                message: "No Autorizado"
            },
            {
                status: 401
            }
        )
    }

    const {value} = token
    const secret = process.env.JWT_SECRET || ""

    try{
        verify(value, secret)

        return NextResponse.json({
            usuario: "Autenticado"
        })
    }
    catch(e){
        return NextResponse.json(
            {
                message: "Error"
            },
            {
                status: 400
            }
        )
    }
}
