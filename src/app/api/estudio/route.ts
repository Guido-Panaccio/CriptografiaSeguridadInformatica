import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { writeFile } from 'fs/promises';
import path from 'path';


export const POST = async (req: NextRequest) => {
    try {
        const formData = await req.formData();

        const estudio = {
            tipoEstudio: formData.get('tipoEstudio')?.toString(),
            resultado: formData.get('resultado')?.toString() === '' ? null : formData.get('resultado')?.toString(),
            examenesIdExamen: Number(formData.get('examenesIdExamen')),
            Estudio: formData.get('Estudio') as File | string === '' ? null : formData.get('Estudio') as File,
            fechaRealizacion: new Date(formData.get('fechaRealizacion') as Date | string)
        };

        const formattedDate = estudio.fechaRealizacion.toISOString().replace(/[-:]/g, '');

        var filePathOnBDD = null;

        if (estudio.Estudio) {
            const bytes = await estudio.Estudio.arrayBuffer()
            const buffer = Buffer.from(bytes);
            const filePath = path.join(process.cwd(), `public/ImagenesEstudios`, `${formattedDate}_${estudio.Estudio.name}`);
            filePathOnBDD = `/ImagenesEstudios/${formattedDate}_${estudio.Estudio.name}`;
            await writeFile(filePath, buffer);
        }


        const insertEstudio = await prisma.estudios.create({
            data: {
                tipoEstudio: estudio.tipoEstudio || '',
                resultado: estudio.resultado,
                examenesIdExamen: estudio.examenesIdExamen,
                estudioPath: filePathOnBDD,
                fechaRealizacion: estudio.fechaRealizacion
            },
        })

        return NextResponse.json({
            mensaje: 'Estudio nuevo insertado',
            estudioInsertado: insertEstudio,
        });
    } catch (error) {
        return NextResponse.json({
            error: 'Error al procesar la solicitud',
        });
    }
};

export const PUT = async (req: NextRequest) => {
    try {
        const formData = await req.formData();

        const estudio = {
            idEstudio: Number(formData.get('idEstudio')),
            tipoEstudio: formData.get('tipoEstudio')?.toString(),
            resultado: formData.get('resultado')?.toString() === '' ? null : formData.get('resultado')?.toString(),
            examenesIdExamen: Number(formData.get('examenesIdExamen')),
            Estudio: formData.get('Estudio') as File | string === '' ? null : formData.get('Estudio') as File,
            estudioPath: formData.get('estudioPath')?.toString(),
            fechaRealizacion: new Date(formData.get('fechaRealizacion') as Date | string)
        };

        const formattedDate = estudio.fechaRealizacion.toISOString().replace(/[-:]/g, '');

        var filePathOnBDD = estudio.estudioPath;

        if (estudio.Estudio) {
            const bytes = await estudio.Estudio.arrayBuffer()
            const buffer = Buffer.from(bytes);
            const filePath = path.join(process.cwd(), `public/ImagenesEstudios`, `${formattedDate}_${estudio.Estudio.name}`);
            filePathOnBDD = `/ImagenesEstudios/${formattedDate}_${estudio.Estudio.name}`;
            await writeFile(filePath, buffer);
        }


        const updatedEstudio = await prisma.estudios.update({
            where: {
                idEstudio: estudio.idEstudio,
            },
            data: {
                tipoEstudio: estudio.tipoEstudio,
                resultado: estudio.resultado,
                estudioPath: filePathOnBDD,
                fechaRealizacion: estudio.fechaRealizacion
            },
        });

        return NextResponse.json({
            mensaje: 'Estudio nuevo insertado',
            estudioInsertado: updatedEstudio,
        });
    } catch (error) {
        return NextResponse.json({
            error: 'Error al procesar la solicitud',
        });
    }
}

export const DELETE = async (req: NextRequest) => {
    const idEstudio = req.nextUrl.searchParams.get("IdEstudio")

    try {
        const estudioEliminado = await prisma.estudios.delete({
            where: {
                idEstudio: parseInt(idEstudio as string), // Asegúrate de convertir el ID a un número si es necesario
            },
        });

        return NextResponse.json({
            mensaje: 'Estudio seleccionado eliminado',
            examenEliminado: estudioEliminado,
        });
    } catch (error) {
        return NextResponse.json({
            error: 'Error al procesar la solicitud',
        });
    }
}