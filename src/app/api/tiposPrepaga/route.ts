import {NextRequest, NextResponse} from "next/server"
import prisma from "../../../../prisma/client"

export const GET = async (req: NextRequest) => {
    try{
        const tiposPrepagas = await prisma.tiposPrepagas.findMany({

        });

        if (tiposPrepagas) {
            return NextResponse.json({
                tiposPrepagas
            });
        } else {
            return NextResponse.json({
                mensaje: 'No hay prepagas registradas',
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
    const tipoPrepaga = requestData.tipoPrepaga;

    try {
        const insertPaciente = await prisma.tiposPrepagas.create({
            data: {
                idPrepaga: tipoPrepaga.idPrepaga,
                descripcion: tipoPrepaga.descripcion,
            },
        })

        return NextResponse.json({
            mensaje: 'Prepaga nueva insertado',
            pacienteInsertado: insertPaciente,
        });
    } catch (error) {
        return NextResponse.json({
            error: 'Error al procesar la solicitud',
        });
    }
}

export const PUT = async (req: NextRequest) => {
    const requestData = await req.json();
    const tipoPrepaga = requestData.tipoPrepaga;

    try {
        const updatedPaciente = await prisma.tiposPrepagas.update({
            where: {
                idPrepaga: tipoPrepaga.idPrepagaModificar,
            },
            data: {
                idPrepaga: tipoPrepaga.idPrepaga,
                descripcion: tipoPrepaga.descripcion,
            },
        });

        return NextResponse.json({
            mensaje: 'Prepaga seleccionado modificado',
            pacienteInsertado: updatedPaciente,
        });
    } catch (error) {
        return NextResponse.json({
            error: 'Error al procesar la solicitud',
        });
    }
}

export const DELETE = async (req: NextRequest) => {
    const idPrepaga = req.nextUrl.searchParams.get("IdPrepaga")

    try {
        const pacienteEliminado = await prisma.tiposPrepagas.delete({
            where: {
                idPrepaga: idPrepaga?.toString(),
            },
        });

        return NextResponse.json({
            mensaje: 'Prepaga seleccionado eliminado',
            pacienteEliminado: pacienteEliminado,
        });
    } catch (error) {
        return NextResponse.json({
            error: 'Error al procesar la solicitud',
        });
    }
}