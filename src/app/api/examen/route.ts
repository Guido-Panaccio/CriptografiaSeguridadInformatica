import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../../prisma/client"

export const GET = async (req: NextRequest) => {
    const IdPaciente = req.nextUrl.searchParams.get("idPaciente");

    try {
        const examenes = await prisma.examenes.findMany({
            where: {
                idPaciente: Number(IdPaciente),
            },
            include: {
                usuario: true,
                tipoExamenObject: true,
                estudio: true,
                paciente: true,
            },
            orderBy: {
                fechaRealizacion: 'desc',
            },
        });
        return NextResponse.json({
            examenes
        });
    } catch (error) {
        return NextResponse.json({
            error: 'Error al procesar la solicitud',
        });
    }
}

export const POST = async (req: NextRequest) => {
    const requestData = await req.json();
    const examen = requestData.examen;

    console.log(examen);

    try {
        const insertExamen = await prisma.examenes.create({
            data: {
                idPaciente: examen.idPaciente,
                idUsuario: examen.idUsuario,
                tipoExamen: examen.tipoExamen,
                observaciones: examen.observaciones,
                fechaRealizacion: examen.fechaRealizacion,
            },
        })

        return NextResponse.json({
            mensaje: 'Examen nuevo insertado',
            examenInsertado: insertExamen,
        });
    } catch (error) {
        return NextResponse.json({
            error: 'Error al procesar la solicitud',
        });
    }
}

export const PUT = async (req: NextRequest) => {
    const requestData = await req.json();
    const examen = requestData.examen;

    try {
        const updatedExamen = await prisma.examenes.update({
            where: {
                idExamen: examen.idExamen,
            },
            data: {
                tipoExamen: examen.tipoExamen,
                observaciones: examen.observaciones,
                fechaRealizacion: examen.fechaRealizacion,
            },
        });

        return NextResponse.json({
            mensaje: 'Examen seleccionado modificado',
            examenModificado: updatedExamen,
        });
    } catch (error) {
        return NextResponse.json({
            error: 'Error al procesar la solicitud',
        });
    }
}

export const DELETE = async (req: NextRequest) => {
    const idExamen = req.nextUrl.searchParams.get("IdExamen")

    try {
        const examenEliminado = await prisma.examenes.delete({
            where: {
                idExamen: parseInt(idExamen as string), // Asegúrate de convertir el ID a un número si es necesario
            },
        });

        return NextResponse.json({
            mensaje: 'Examen seleccionado eliminado',
            examenEliminado: examenEliminado,
        });
    } catch (error) {
        return NextResponse.json({
            error: 'Error al procesar la solicitud',
        });
    }
}