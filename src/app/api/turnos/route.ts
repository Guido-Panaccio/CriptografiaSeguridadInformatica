import {NextRequest, NextResponse} from "next/server"
import prisma from "../../../../prisma/client"

export const GET = async (req: NextRequest) => {
    const idTurno = req.nextUrl.searchParams.get("idTurno")
    const fechaTurno = req.nextUrl.searchParams.get("fechaTurno")
    const sala = req.nextUrl.searchParams.get("sala")

    if (fechaTurno && sala) {
     const data = await prisma.turnos.findFirst({
            where: {
                fechaTurno: new Date(fechaTurno),
                idSala: Number(sala),
            },
        });

        if (data && data.idTurno !== Number(idTurno)) {
            return NextResponse.json({
                existe : true,
                mensaje: "El turno ya esta reservado"
            });
        } else {
            return NextResponse.json({
                existe: false,
                mensaje: "El turno esta disponible"
            });
        }
     } else {
        try{
            const turnos = await prisma.turnos.findMany({
                orderBy: {
                    idTurno: 'asc',
                },
                include: {
                    paciente: true,
                    medico: true, 
                    usuario: true,
                    sala: true,
                },
            });

            if (turnos) {
                return NextResponse.json({
                    turnos
                });
            } else {
                return NextResponse.json({
                    mensaje: 'No hay turnos registrados',
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
    const turno = requestData.turno;

    try {
        const insertarTurno = await prisma.turnos.create({
            data: {
                idTurno: turno.idTurno,
                fechaTurno: new Date(turno.fechaTurno),
                idPaciente: turno.idPaciente,
                idMedico: turno.idMedico,
                idUsuario: turno.idUsuario,
                idSala: turno.idSala,
            },
        })

        return NextResponse.json({
            mensaje: 'Turno nuevo insertado',
            turnoInsertado: insertarTurno,
        });
    } catch (error) {
        return NextResponse.json({
            error: 'Error al procesar la solicitud',
        });
    }
}

export const PUT = async (req: NextRequest) => {
    const requestData = await req.json();
    const turno = requestData;
    try {
        const updatedTurno = await prisma.turnos.update({
            where: {
                idTurno: turno.idTurno,
            },
            data: {
                idTurno: turno.idTurno,
                fechaTurno: new Date(turno.fechaTurno),
                idPaciente: turno.idPaciente,
                idMedico: turno.idMedico,
                idUsuario: turno.idUsuario,
                idSala: turno.idSala,
            },
        });
        return NextResponse.json({
            mensaje: 'Turno seleccionado modificado',
            turnoInsertado: updatedTurno,
        });
    } catch (error) {
        return NextResponse.json({
            error: 'Error al procesar la solicitud',
        });
    }
}


export const DELETE = async (req: NextRequest) => {
    const idTurno = req.nextUrl.searchParams.get("IdTurno")

    try {
        const turnoEliminado = await prisma.turnos.delete({
            where: {
                idTurno: parseInt(idTurno as string), // Asegúrate de convertir el ID a un número si es necesario
            },
        });

        return NextResponse.json({
            mensaje: 'Turno seleccionado eliminado',
            turnoEliminado: turnoEliminado,
        });
    } catch (error) {
        return NextResponse.json({
            error: 'Error al procesar la solicitud',
        });
    }
}
