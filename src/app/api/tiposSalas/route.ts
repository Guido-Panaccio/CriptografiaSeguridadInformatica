import {NextRequest, NextResponse} from "next/server"
import prisma from "../../../../prisma/client"

export const GET = async (req: NextRequest) => {
    const idSala = req.nextUrl.searchParams.get("idSala")
    if (idSala) {
     const data = await prisma.turnos.findFirst({
            where: {
                idSala: Number(idSala),
            },
        });
        if (data?.idSala === Number(idSala)) {

            return NextResponse.json({
                existe : true,
                mensaje: "El número de sala ya existe"
            });
        } else {
            return NextResponse.json({
                existe: false,
                mensaje: "El número de sala esta disponible"
            });
        }
    } else {
        try{
            const tiposSalas = await prisma.tiposSalas.findMany({

            });
            if (tiposSalas) {
                return NextResponse.json({
                    tiposSalas
                });
            } else {
                return NextResponse.json({
                    mensaje: 'No hay salas registradas',
                });
            }
            
        }catch(error){
            return NextResponse.json({
                error: 'Error al procesar la solicitud',
            });
        }
    }
}

export const POST = async (req: NextRequest) => {
    const requestData = await req.json();
    const sala = requestData

    try{
        const insertarSala = await prisma.tiposSalas.create({
            data: {
                descripcion: sala.descripcionSala,
                idSala: Number(sala.idSala),
            },
        });
        if (insertarSala) {
            return NextResponse.json({
                salaInsertada :insertarSala
            });
        } else {
            return NextResponse.json({
                mensaje: 'No se pudo crear la sala',
            });
        }
        
    }catch(error){
        console.log(error)
        return NextResponse.json({
            error: 'Error al procesar la solicitud',
        });
    }
}

export const PUT = async (req: NextRequest) => {
    const requestData = await req.json();
    try{
        const sala = await prisma.tiposSalas.update({
            where: {
                idSala: Number(requestData.idSalaViejo),
            },
            data: {
                idSala: Number(requestData.idSala),
                descripcion: requestData.descripcionSala,
            },
        });
        if (sala) {
            return NextResponse.json({
                mensaje : 'Sala editada',
                salaInsertada : sala
            });
        } else {
            return NextResponse.json({
                mensaje: 'No se pudo editar la sala',
            });
        }
        
    }catch(error){
        return NextResponse.json({
            error: 'Error al procesar la solicitud',
        });
    }
}

export const DELETE = async (req: NextRequest) => {
    const idSala = req.nextUrl.searchParams.get("IdSala")
    try{
        const salaEliminada = await prisma.tiposSalas.delete({
            where: {
                idSala: parseInt(idSala as string),
            },
        });
        if (salaEliminada) {
            return NextResponse.json({
                mensaje: 'Sala eliminada',
                salaEliminada: salaEliminada
            });
        } else {
            return NextResponse.json({
                mensaje: 'No se pudo eliminar la sala',
            });
        }
        
    }catch(error){
        console.log(error)
        return NextResponse.json({
            error: 'Error al procesar la solicitud',
        });
    }
}

