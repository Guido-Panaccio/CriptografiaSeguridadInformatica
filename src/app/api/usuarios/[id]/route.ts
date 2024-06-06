import {NextRequest, NextResponse} from "next/server"

interface Params {
    id: string
}


export const GET = async (req: NextRequest, { params : {id} } : {params: Params}) => {
    return NextResponse.json(
        {message: `obteniendo usuario con id ${id}`}, 
        {status: 200})
}

export const PUT = async (req: NextRequest,  { params : {id} } : {params: Params}) => {
    return NextResponse.json(
        {message: `actualizando usuario con id ${id}`}, 
        {status: 200}
    )
}

export const DELETE = async (req: NextRequest, { params : {id} } : {params: Params}) => {
    return NextResponse.json(
        {message: `eliminando usuario con id ${id}`}, 
        {status: 200}
    )
}

