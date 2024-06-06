"use client";

import { IExamen } from "@/types/examen";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { Button } from "./ui/button";
import { editarExamen, eliminarExamen } from "@/app/examen/examen";
import { IUsuario } from "@/types/usuario";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { FormEventHandler, useEffect, useState } from "react";
import { ITipoExamen } from "@/types/tiposExamenes";
import { getAllTiposExamenes } from "@/app/tiposExamenes/tiposExamenes";
import ListEstudio from "./ListEstudios";
import AddEstudio from "./AddEstudios";
import { GoDownload } from "react-icons/go";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from "axios";
// Extender la interfaz jsPDF para incluir autoTable
declare module 'jspdf' {
    interface jsPDF {
        autoTable: (options: any) => jsPDF;
    }
}



interface ExamenProps {
    examen: IExamen
}

const Examen: React.FC<ExamenProps> = ({ examen }) => {
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);

    const [tipoExamenToEdit, setTipoExamenToEdit] = useState<string>(examen.tipoExamen);
    const [observacionesToEdit, setObservacionesToEdit] = useState<string | null>(examen.observaciones)
    const [tipoExamen, setTipoExamen] = useState<ITipoExamen[] | null>([]);
    const router = useRouter();

    const handleDeleteExamen = async (idExamen: number) => {
        await eliminarExamen(idExamen);
        setOpenModalDelete(false);
        router.refresh();
    };

    function formatearMedico(usuarioMedico: IUsuario | null): string {
        return 'Dr: ' + usuarioMedico?.apellido + ', ' + usuarioMedico?.nombre;
    }

    function formatearFecha(fecha: string): string {
        const fechaConvertida = new Date(fecha)
        return format(fechaConvertida, 'dd/MM/yyyy HH:mm'); // Usa date-fns para formatear la fecha
    };

    const handleTipoExamenChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTipoExamenToEdit(event.target.value);
    };

    const handleObservacionesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setObservacionesToEdit(event.target.value);
    };

    const editExamen = async () => {
        const currentDate: Date = new Date();

        const examenEditar = {
            examen: {
                idExamen: examen.idExamen,
                idPaciente: examen.idPaciente,
                idUsuario: examen.idUsuario,
                tipoExamen: tipoExamenToEdit,
                observaciones: observacionesToEdit,
                fechaRealizacion: currentDate,
                usuario: examen.usuario,
                tipoExamenObject: examen.tipoExamenObject,
                estudio: examen.estudio,
                paciente: examen.paciente
            }
        };

        await editarExamen(examenEditar.examen);

        setOpenModalEdit(false);

        router.refresh();
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {

    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllTiposExamenes();
                setTipoExamen(data);
            } catch (error) {
                console.error('Error al obtener los tipo de examen:', error);
            }
        };

        fetchData();
    }, []);

    const formatoNombreMedico = (pageNumber: number): string => {
        return `Dr. ${examen.usuario?.apellido}, ${examen.usuario?.nombre} - Página ${pageNumber}`;
    };


    const downloadPDF = async () => {
        // Crear un nuevo documento PDF
        const doc = new jsPDF();
        let pageNumber = 1;

        const formatoNombrePaciente = `${examen.paciente?.apellido}, ${examen.paciente?.nombre}`;
        const formatoTipoExamen = 'Examen ' + examen.tipoExamenObject?.descripcion;
        const formatoFecha = formatearFecha(examen.fechaRealizacion.toString());
        const formatoNombreArchivo = `Examen ${examen.tipoExamenObject?.descripcion} ${examen.paciente?.apellido} ${examen.paciente?.nombre} ${formatoFecha}.pdf`;

        // Agregar el texto de la lista al PDF
        doc.setFontSize(12);
        doc.text(formatoTipoExamen, doc.internal.pageSize.width / 2 - doc.getTextWidth(formatoTipoExamen) / 2, 30);
        doc.setFontSize(10);
        doc.text(examen.observaciones || '', 10, 40);


        const columnas = ['Tipo de Estudio', 'Resultado'];
        const filas = examen.estudio?.map(item => [item.tipoEstudio, item.resultado]);

        // Agregar el encabezado común para cada página
        const addHeader = () => {
            doc.setFontSize(11);
            doc.setTextColor(40);
            doc.text(formatoNombrePaciente, doc.internal.pageSize.width - doc.getTextWidth(formatoNombrePaciente) - 15, 15);
        };

        //Footer
        doc.autoTable({
            startY: 50,
            head: [columnas],
            body: filas,
            didDrawPage: () => {

                addHeader();

                // Agregar el footer en cada página
                doc.setFontSize(10);
                doc.text(formatoNombreMedico(pageNumber++), 15, doc.internal.pageSize.height - 15);
                doc.text(formatoFecha, doc.internal.pageSize.width - doc.getTextWidth(formatoFecha) - 15, doc.internal.pageSize.height - 15);
            },
        });


        examen.estudio?.forEach((estudio, index) => {
            doc.addPage()
            addHeader();
            doc.setFontSize(12);
            doc.text(`Estudio: ${estudio.tipoEstudio}`, 10, 20);
            doc.setFontSize(10);
            doc.text(estudio.resultado || '', 10, 30);
            doc.text(`Estudio realizado el día: ${formatearFecha(estudio.fechaRealizacion.toString())}`, 10, 40);

            // Agregar la imagen al PDF
            if (estudio.estudioPath) {
                try {
                    doc.addImage(estudio.estudioPath, 'PNG', doc.internal.pageSize.width / 2 - 50, 50, 100, 100); // Ajusta las coordenadas y dimensiones según sea necesario
                } catch (error) {
                    alert(`Ocurrio un problema con la imagen ${estudio.estudioPath}`);
                }
            }

            doc.setFontSize(10);
            doc.text(formatoNombreMedico(pageNumber++), 15, doc.internal.pageSize.height - 15);
            doc.text(formatoFecha, doc.internal.pageSize.width - doc.getTextWidth(formatoFecha) - 15, doc.internal.pageSize.height - 15);
        });

        // Guardar o mostrar el PDF
        doc.save(formatoNombreArchivo);
    };

    return (
        <div className="p-4 border border-slate-300 my-3 flexk justify-between gap-5 items-start">
            <div>
                <div className="flex gap-5">
                    <h2 className="font-bold sizeEstudioTipo">{examen.tipoExamenObject?.descripcion}</h2>
                    <div className="justify-end w-full flex gap-5">
                        <FiEdit onClick={() => setOpenModalEdit(true)} cursor="pointer" className='text-blue-500' size={25} />
                        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                            <form onSubmit={handleSubmit} className="text-left">
                                <div className="space-y-1">
                                    <div>
                                        <label htmlFor="tipoExamen">Tipo de Examen: </label>
                                        <select id="tipoExamen" value={tipoExamenToEdit} onChange={handleTipoExamenChange}>
                                            {tipoExamen?.map((tipoExamen: ITipoExamen, index: number) => (
                                                <option key={index} value={tipoExamen.tipoExamen}>
                                                    {tipoExamen.descripcion}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="w-full max-w-screen-md mx-auto">
                                        <textarea
                                            style={{ width: '765px', height: '250px' }}
                                            className="w-full p-4 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500"
                                            placeholder="Escribe las observaciones aquí..."
                                            value={observacionesToEdit || ''}
                                            onChange={handleObservacionesChange}
                                            rows={6}
                                            maxLength={200}
                                        />
                                        <p className="mt-2 text-gray-500">
                                            Caracteres: {observacionesToEdit?.length} / 200 <br /> Palabras: {observacionesToEdit?.length == 0 ? 0 : observacionesToEdit?.trim().split(/\s+/).length}
                                        </p>
                                    </div>
                                </div>
                            </form>
                            <div>
                                <Button className="w-full mt-6 " name="btnEditExamen" type="submit" onClick={() => editExamen()}>
                                    Editar Examen
                                </Button>
                            </div>
                        </Modal>
                        <FiTrash2 onClick={() => setOpenModalDelete(true)} cursor="pointer" className='text-red-500' size={25} />
                        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
                            <h3 className="text-lg">¿Estas seguro que desea eliminar a este examen?</h3>
                            <div className="modal-action flex justify-end">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="flex gap-5">
                                                <Button className="w-full mt-6 bg-red-500" name="btnConfirmDeleteExamen" type="submit" onClick={() => handleDeleteExamen(examen.idExamen)}>
                                                    Si
                                                </Button>
                                                <Button className="w-full mt-6" name="btnCancelDeleteExamen" type="submit" onClick={() => setOpenModalDelete(false)}>
                                                    No
                                                </Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Modal>
                        <AddEstudio examen={examen} />
                        <GoDownload onClick={() => downloadPDF()} cursor="pointer" className='text-black-100' size={25} />

                    </div>
                </div>
                <div>{examen.observaciones}</div>
                <div>
                <h3 className="center font-bold sizeSubTitleEstudiosRealizados">Estudios realizados</h3>
                    {/* {Cuando a - b es negativo, significa que a debe estar antes que b en la secuencia ordenada. 
                        Si es cero, significa que a y b son iguales en términos de ordenamiento. Y si es positivo, 
                        indica que b debe estar antes que a en la secuencia ordenada.} */}
                    <ListEstudio estudios={examen.estudio?.sort((a, b) => a.idEstudio - b.idEstudio) || null} />
                </div>
                <div className="justify-end w-full flex gap-5">
                    <div className="mt-2 text-gray-500">{formatearMedico(examen.usuario)}</div>
                    <div className="mt-2 text-gray-500">{formatearFecha(examen.fechaRealizacion.toString())}</div>
                </div>
            </div>
        </div>
    )
};

export default Examen;