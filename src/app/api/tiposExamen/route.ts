import {NextRequest, NextResponse} from "next/server"
import prisma from "../../../../prisma/client"

export const GET = async (req: NextRequest) => {
    try{
        const tiposExamenes = await prisma.tiposExamenes.findMany({
            include: {
                examenes: true,
            },
        });

        if (tiposExamenes) {
            return NextResponse.json({
                tiposExamenes
            });
            
        } else {
            return NextResponse.json({
                mensaje: 'No hay tipos de examenes registrados',
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
    const tipoExamen = requestData.tipoExamen;

    try {
        const insertTipoExamen = await prisma.tiposExamenes.create({
            data: {
                tipoExamen: tipoExamen.tipoExamen,
                descripcion: tipoExamen.descripcion,
            },
        })

        return NextResponse.json({
            mensaje: 'Tipo de examen nuevo insertado',
            tipoExamenInsertado: insertTipoExamen,
        });
    } catch (error) {
        return NextResponse.json({
            error: 'Error al procesar la solicitud',
        });
    }
}

export const PUT = async (req: NextRequest) => {
    const requestData = await req.json();
    const tipoExamen = requestData.tipoExamen;

    try {
        const updatedTipoExamen = await prisma.tiposExamenes.update({
            where: {
                tipoExamen: tipoExamen.tipoExamenModificar,
            },
            data: {
                tipoExamen: tipoExamen.tipoExamen,
                descripcion: tipoExamen.descripcion,
            },
        });

        return NextResponse.json({
            mensaje: 'Tipo de examen seleccionado modificado',
            tipoExamenModificado: updatedTipoExamen,
        });
    } catch (error) {
        return NextResponse.json({
            error: 'Error al procesar la solicitud',
        });
    }
}

export const DELETE = async (req: NextRequest) => {
    const tipoExamen = req.nextUrl.searchParams.get("TipoExamen")

    try {
        const tipoExamenEliminado = await prisma.tiposExamenes.delete({
            where: {
                tipoExamen: tipoExamen?.toString(),
            },
        });

        return NextResponse.json({
            mensaje: 'Tipo de examen seleccionado eliminado',
            tipoExamenEliminado: tipoExamenEliminado,
        });
    } catch (error) {
        return NextResponse.json({
            error: 'Error al procesar la solicitud',
        });
    }
}