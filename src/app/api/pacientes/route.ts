import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../../prisma/client"
interface Params {
    idPaciente: number
}

export const GET = async (req: NextRequest) => {
    const nombrePaciente = req.nextUrl.searchParams.get("nombrePaciente")
    const apellidoPaciente = req.nextUrl.searchParams.get("apellidoPaciente")
    const DNIPaciente = req.nextUrl.searchParams.get("DNIPaciente")

    if (nombrePaciente && apellidoPaciente && DNIPaciente) {
        try {
            const pacientes = await prisma.pacientes.findFirst({
                where: {
                    nombre: nombrePaciente,
                    apellido: apellidoPaciente,
                    documento: Number(DNIPaciente)
                },
            });

            if (pacientes) {
                return NextResponse.json({
                    pacientes
                });
            } else {
                return NextResponse.json({
                    mensaje: 'No hay paciente registrados',
                });
            }
        } catch (error) {
            return NextResponse.json({
                error: 'Error al procesar la solicitud',
            });
        }
    } else {
        try {
            const pacientes = await prisma.pacientes.findMany({
                orderBy: {
                    idPaciente: 'asc',
                },
                include: {
                    Examenes: true,
                    tipoPrepaga:true,
                },
            })
            // Reduce the nombre and apellido fields to the 10 first characters for every paciente and add ... at the end
            pacientes.forEach((paciente) => {
                paciente.nombre = "(encrypted) " + paciente.nombre.substring(0, 10) + '...'
                paciente.apellido = "(encrypted) " + paciente.apellido.substring(0, 10) + '...'
            })
            return NextResponse.json({
                pacientes
            })
        } catch (error) {
            return NextResponse.json({
                error: 'Error al procesar la solicitud',
            });
        }
    }
}

export const POST = async (req: NextRequest) => {
    const requestData = await req.json();
    const paciente = requestData.paciente;

    console.log('Paciente a insertar');
    console.log(paciente);

    try {
        const insertPaciente = await prisma.pacientes.create({
            data: {
                apellido: paciente.apellido,
                nombre: paciente.nombre,
                tipoDocumento: paciente.tipoDocumento,
                documento: paciente.documento,
                direccion: paciente.direccion,
                telefono: paciente.telefono,
                ocupacion: paciente.ocupacion,
                idPrepaga: paciente.idPrepaga,
            },
        })

        return NextResponse.json({
            mensaje: 'Paciente nuevo insertado',
            pacienteInsertado: insertPaciente,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: 'Error al procesar la solicitud',
        });
    }
}

export const PUT = async (req: NextRequest) => {
    const requestData = await req.json();
    const paciente = requestData.paciente;

    try {
        const updatedPaciente = await prisma.pacientes.update({
            where: {
                idPaciente: paciente.idPaciente,
            },
            data: {
                apellido: paciente.apellido,
                nombre: paciente.nombre,
                tipoDocumento: paciente.tipoDocumento,
                documento: paciente.documento,
                direccion: paciente.direccion,
                telefono: paciente.telefono,
                ocupacion: paciente.ocupacion,
                idPrepaga: paciente.idPrepaga,
            },
        });

        return NextResponse.json({
            mensaje: 'Paciente seleccionado modificado',
            pacienteInsertado: updatedPaciente,
        });
    } catch (error) {
        return NextResponse.json({
            error: 'Error al procesar la solicitud',
        });
    }
}


export const DELETE = async (req: NextRequest) => {
    const idPaciente = req.nextUrl.searchParams.get("IdPaciente")

    try {
        const pacienteEliminado = await prisma.pacientes.delete({
            where: {
                idPaciente: parseInt(idPaciente as string),
            },
        });

        return NextResponse.json({
            mensaje: 'Paciente seleccionado eliminado',
            pacienteEliminado: pacienteEliminado,
        });
    } catch (error) {
        return NextResponse.json({
            error: 'Error al procesar la solicitud',
        });
    }
}
