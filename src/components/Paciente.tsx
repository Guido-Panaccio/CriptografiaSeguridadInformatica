"use client";

import { IPaciente } from "@/types/pacientes";
import { FormEventHandler, use, useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Button } from "./ui/button";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { editarPaciente, eliminarPaciente } from "@/app/pacientes/pacientes";
import { VscNotebook } from "react-icons/vsc";
import { IPrepaga } from "@/types/prepaga";
import { getAllPrepagas } from "@/app/tiposPrepagas/tiposPrepagas";

interface PacienteProps {
    paciente: IPaciente
}

const Paciente: React.FC<PacienteProps> = ({ paciente }) => {
    const router = useRouter();
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
    const [apellidoToEdit, setApellidoToEdit] = useState<string>(paciente.apellido);
    const [nombreToEdit, setNombreToEdit] = useState<string>(paciente.nombre);
    const [tipoDocumentoToEdit, setTipoDocumentoToEdit] = useState<string>(paciente.tipoDocumento);
    const [documentoToEdit, setDocumentoToEdit] = useState<string>(paciente.documento.toString());
    const [direccionToEdit, setDireccionToEdit] = useState<string | null>(paciente.direccion);
    const [telefonoToEdit, setTelefonoToEdit] = useState<string | null>(paciente.telefono);
    const [ocupacionToEdit, setOcupacionToEdit] = useState<string | null>(paciente.ocupacion);
    const [idPrepagaToEdit, setIdPrepagaToEdit] = useState<string | null>(paciente.idPrepaga);
    const [prepagas, setPrepagas] = useState<IPrepaga[] | null>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const { push } = useRouter();

    const ocultarCartelError = () => {
        if (apellidoToEdit !== '' && nombreToEdit !== '' && documentoToEdit !== '') {
            setErrorMessage('');
        }
    }

    const handleNombreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNombreToEdit(event.target.value);
        ocultarCartelError();
    };

    const handleApellidoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setApellidoToEdit(event.target.value);
        ocultarCartelError();
    };

    const handleTipoDocumentoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTipoDocumentoToEdit(event.target.value);
    };

    const handleDocumentNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputDocumentNumber = event.target.value;
        // Validar si el valor ingresado es solo números (usando expresión regular)
        if (/^\d*$/.test(inputDocumentNumber) || inputDocumentNumber === '') {
            setDocumentoToEdit(inputDocumentNumber);
        }
        ocultarCartelError();
    };

    const handleDireccionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDireccionToEdit(event.target.value);
    };

    const handleTelefonoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTelefonoToEdit(event.target.value);
    };

    const handleOcupacionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOcupacionToEdit(event.target.value);
    };

    const handleIdPrepagaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setIdPrepagaToEdit(event.target.value);
    };

    const formatearDatosPacientes = (datoPaciente: string | null, textoNULL: string) => {
        return datoPaciente === null || datoPaciente === '' ? <span className="cursiva gris">{textoNULL}</span> : datoPaciente;
    }

    const formatearDatosPacientesPrepaga = (prepaga: IPrepaga | null, textoNULL: string) => {
        return prepaga === null || prepaga.idPrepaga === '' ? <span className="cursiva gris">{textoNULL}</span> : prepaga.descripcion;
    }

    const formatearDatosDocumentacion = (tipoDocumento: string) => {
        return tipoDocumento === 'DNI' ? 'DNI' : 'Pasaporte';
    }

    const editPaciente = async () => {
        if (apellidoToEdit === '' || nombreToEdit === '' || documentoToEdit === '') {
            setErrorMessage('Por favor, complete el apellido, nombre y documento del paciente');
            return;
        } else {
            setErrorMessage('');
        }

        const pacienteEditar = {
            paciente: {
                idPaciente: paciente.idPaciente,
                apellido: apellidoToEdit,
                nombre: nombreToEdit,
                tipoDocumento: tipoDocumentoToEdit,
                documento: Number(documentoToEdit),
                direccion: direccionToEdit === '' ? null : direccionToEdit,
                telefono: telefonoToEdit === '' ? null : telefonoToEdit,
                ocupacion: ocupacionToEdit === '' ? null : ocupacionToEdit,
                idPrepaga: idPrepagaToEdit === '' ? null : idPrepagaToEdit,
                Examenes: paciente.Examenes,
                tipoPrepaga: paciente.tipoPrepaga
            }
        };

        await editarPaciente(pacienteEditar.paciente);

        setOpenModalEdit(false);

        router.refresh();
    }

    const handleSubmitEdit: FormEventHandler<HTMLFormElement> = async (event) => {

    };

    const handleDeletePaciente = async (idPaciente: number) => {
        await eliminarPaciente(idPaciente);
        setOpenModalDelete(false);
        router.refresh();
    };

    const openExamenesPaciente = (idPaciente: number) => {
        const params = {
            idPaciente: idPaciente.toString(),
        };

        const queryString = new URLSearchParams(params).toString();

        push(`/examen?${queryString}`);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllPrepagas();
                setPrepagas(data);
            } catch (error) {
                console.error('Error al obtener las prepagas:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <tr key={paciente.idPaciente}>
            <td className="w-max-content px-4 text-center">{paciente.apellido}</td>
            <td className="w-max-content px-4 text-center">{paciente.nombre}</td>
            <td className="w-max-content px-4 text-center">{formatearDatosDocumentacion(paciente.tipoDocumento)}</td>
            <td className="w-max-content px-4 text-center">{paciente.documento}</td>
            <td className="w-max-content px-4 text-center">{formatearDatosPacientes(paciente.direccion, 'Sin dirección')}</td>
            <td className="w-max-content px-4 text-center">{formatearDatosPacientes(paciente.telefono, 'Sin teléfono')}</td>
            <td className="w-max-content px-4 text-center">{formatearDatosPacientes(paciente.ocupacion, 'Sin ocupación')}</td>
            <td className="w-max-content px-4 text-center">{formatearDatosPacientesPrepaga(paciente.tipoPrepaga, 'Sin prepaga')}</td>
            <td className="flex gap-5">
                <FiEdit onClick={() => setOpenModalEdit(true)} cursor="pointer" className='text-blue-500' size={25} />
                <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                    <form onSubmit={handleSubmitEdit}>
                        <h3 className='font-bold text-lg text-center'> Editar Paciente </h3>
                        <div className="space-y-1">
                            <div>
                                <label htmlFor="apellido">Apellido: </label>
                                <input
                                    type="text"
                                    placeholder="Apellido"
                                    value={apellidoToEdit}
                                    onChange={handleApellidoChange}
                                    maxLength={50}
                                />
                            </div>
                            <div>
                                <label htmlFor="nombre">Nombre: </label>
                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    value={nombreToEdit}
                                    onChange={handleNombreChange}
                                    maxLength={50}
                                />
                            </div>
                            <div>
                                <label htmlFor="tipoDocumento">Tipo de Documento: </label>
                                <select
                                    value={tipoDocumentoToEdit}
                                    onChange={handleTipoDocumentoChange}>
                                    <option value="DNI">DNI</option>
                                    <option value="PAS">Pasaporte</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="documento">Documento: </label>
                                <input
                                    type="text"
                                    placeholder="Número de documento"
                                    value={documentoToEdit}
                                    onChange={handleDocumentNumberChange}
                                    pattern="[0-9]*"
                                    maxLength={20}
                                />
                            </div>
                            <div>
                                <label htmlFor="direccion">Dirección: </label>
                                <input
                                    type="text"
                                    placeholder="Dirección"
                                    value={direccionToEdit || ''}
                                    onChange={handleDireccionChange}
                                    maxLength={50}
                                />
                            </div>
                            <div>
                                <label htmlFor="telefono">Teléfono: </label>
                                <input
                                    type="text"
                                    placeholder="Teléfono"
                                    value={telefonoToEdit || ''}
                                    onChange={handleTelefonoChange}
                                    maxLength={50}
                                />
                            </div>
                            <div>
                                <label htmlFor="ocupacion">Ocupación: </label>
                                <input
                                    type="text"
                                    placeholder="Ocupación"
                                    value={ocupacionToEdit || ''}
                                    onChange={handleOcupacionChange}
                                    maxLength={50}
                                />
                            </div>
                            <div>
                                <label htmlFor="idPrepaga">Prepaga:</label>
                                <select id="idPrepaga" value={idPrepagaToEdit || ''} onChange={handleIdPrepagaChange}>
                                    <option value="">Sin Prepaga</option>
                                    {prepagas?.map((prepaga: IPrepaga, index: number) => (
                                        <option key={index} value={prepaga.idPrepaga}>
                                            {prepaga.descripcion}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </form>
                    <div>
                        <Button className="w-full mt-6 " name="btnEditPacientes" type="submit" onClick={() => editPaciente()}>
                            Editar Paciente
                        </Button>
                    </div>
                </Modal>

                <FiTrash2 onClick={() => setOpenModalDelete(true)} cursor="pointer" className='text-red-500' size={25} />
                <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
                    <h3 className="text-lg">¿Estas seguro que desea eliminar a este paciente?</h3>
                    <div className="modal-action flex justify-end">
                        <table>
                            <tbody>
                                <tr>
                                    <td className="flex gap-5">
                                        <Button className="w-full mt-6 bg-red-500" name="btnConfirmDeletePaciente" type="submit" onClick={() => handleDeletePaciente(paciente.idPaciente)}>
                                            Si
                                        </Button>
                                        <Button className="w-full mt-6" name="btnCancelDeletePaciente" type="submit" onClick={() => setOpenModalDelete(false)}>
                                            No
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Modal>

                <VscNotebook onClick={() => openExamenesPaciente(paciente.idPaciente)} cursor="pointer" className='text-black-500' size={25} />
            </td>
        </tr>
    )
};

export default Paciente;