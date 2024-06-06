"use client";

import { ITurno } from "@/types/turnos";
import { FormEventHandler, use, useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Button } from "./ui/button";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { editarTurno, eliminarTurno, getSalaEstaReservada } from "@/app/turnos/turnos";
import { VscNotebook } from "react-icons/vsc";
import { string } from "zod";
import { ISalas } from "@/types/salas";
import { getAllSalas } from "@/app/tiposSalas/tiposSalas";
import { getPaciente } from "@/app/pacientes/pacientes";
import { getMedico } from "@/app/medico/medico";
import { DatePicker } from "@/components/DatePicker";
import * as React from "react"
import { format } from "date-fns"

interface TurnoProps {
    turno: ITurno
}

const Turno: React.FC<TurnoProps> = ({ turno }) => {
    var [year, month, day] = turno.fechaTurno.toString().split('-')
    var dayNumber = Number(day.substring(0,2))
    var monthNumber = Number(month)
    var yearNumber = Number(year)
    const fechaUTC = new Date(Date.UTC(yearNumber, monthNumber-1, dayNumber+1));

    const router = useRouter();
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
    // const [pacienteToEdit, setPacienteToEdit] = useState<string>(turno.idPaciente.toString());
    const [apellidoPacienteToEdit, setApellidoPacienteToEdit] = useState<string>(turno.paciente.apellido);
    const [nombrePacienteToEdit, setNombrePacienteToEdit] = useState<string>(turno.paciente.nombre);
    const [DNIPacienteToEdit, setDNIPacienteToEdit] = useState<string>(turno.paciente.documento.toString());
    const [DNIMedicoToEdit, setDNIMedicoToEdit] = useState<string>(turno.medico.documento.toString());
    const [fechaToEdit, setFechaToEdit] = useState<string>(fechaUTC.toString());
    // const [medicoToEdit, setMedicoToEdit] = useState<string>(turno.idMedico.toString());
    const [apellidoMedicoToEdit, setApellidoMedicoToEdit] = useState<string>(turno.medico.apellido);
    const [nombreMedicoToEdit, setNombreMedicoToEdit] = useState<string>(turno.medico.nombre);
    const [salaToEdit, setSalaToEdit] = useState<string>(turno.idSala.toString());
    const [salas, setSalas] = useState<ISalas[] | null>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [date, setDate] = React.useState<Date | undefined>(new Date(fechaToEdit));

    useEffect(() => {
        const newFechaFilter = date ? format(date, "yyyy-MM-dd") : '';
        setFechaToEdit(newFechaFilter);
    }, [date]); // cuando date cambia

    const { push } = useRouter();

    const ocultarCartelError = () => {
        if (apellidoPacienteToEdit !== null && nombrePacienteToEdit !== null && fechaToEdit !== null && apellidoMedicoToEdit !== null && nombreMedicoToEdit !== null && salaToEdit !== null && DNIPacienteToEdit !== null && DNIMedicoToEdit !== null && DNIPacienteToEdit !!== null) {
            setErrorMessage('');
        }
    }

    const handleNombrePacienteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNombrePacienteToEdit(event.target.value);
        ocultarCartelError();
    };

    
    const handleDNIPacienteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputDocumentNumber = event.target.value;
        // Validar si el valor ingresado es solo números (usando expresión regular)
        if (/^\d*$/.test(inputDocumentNumber) || inputDocumentNumber === '') {
            setDNIPacienteToEdit(inputDocumentNumber);
        }
        ocultarCartelError();
    };

    const handleApellidoPacienteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setApellidoPacienteToEdit(event.target.value);
        ocultarCartelError();
    };

    const handleNombreMedicoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNombreMedicoToEdit(event.target.value);
        ocultarCartelError();
    };

    const handleDNIMedicoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputDocumentNumber = event.target.value;
        // Validar si el valor ingresado es solo números (usando expresión regular)
        if (/^\d*$/.test(inputDocumentNumber) || inputDocumentNumber === '') {
            setDNIMedicoToEdit(inputDocumentNumber);
        }
        ocultarCartelError();
    };

    const handleApellidoMedicoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setApellidoMedicoToEdit(event.target.value);
        ocultarCartelError();
    };

    // const handleFechaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setFechaToEdit(event.target.value);
    //     ocultarCartelError();
    // };

    const handleSalaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSalaToEdit(event.target.value);
        ocultarCartelError();
    };

    const editTurno = async () => {
        if (apellidoPacienteToEdit === '' || nombrePacienteToEdit === '' || fechaToEdit === '' || apellidoMedicoToEdit === '' || nombreMedicoToEdit === '' || salaToEdit === '' || DNIPacienteToEdit === '' || DNIMedicoToEdit === '') {
            setErrorMessage('Por favor, complete los datos obligatorios.');
            return;
        } else {
            setErrorMessage('');
        }

        const pacienteToEdit = await getPaciente(nombrePacienteToEdit, apellidoPacienteToEdit, DNIPacienteToEdit)
        const medicoToEdit = await getMedico(nombreMedicoToEdit, apellidoMedicoToEdit, DNIMedicoToEdit)

        if (pacienteToEdit === undefined || medicoToEdit === undefined) {
            setErrorMessage('El paciente o el médico no existen.');
            return;
        }
        else {
            const existeSalaReservada = await getSalaEstaReservada(turno.idTurno.toString(), fechaToEdit, salaToEdit)

            if (existeSalaReservada){
                setErrorMessage('La sala ya está reservada para ese día.');
                return;
            }
            else {
                setErrorMessage('');
                const turnoEditar = {
                    idTurno: turno.idTurno,
                    idPaciente: pacienteToEdit.idPaciente,
                    idMedico: medicoToEdit.idMedico,
                    idSala: Number(salaToEdit),
                    fechaTurno: fechaToEdit,
                    idUsuario: turno.idUsuario,
                }

                await editarTurno(turnoEditar);
            
                setOpenModalEdit(false);

                router.refresh();
            }
        }
    }

    const handleSubmitEdit: FormEventHandler<HTMLFormElement> = async (event) => {
    };

    const handleDeleteTurno = async (idTurno: number) => {
        await eliminarTurno(idTurno);
        setOpenModalDelete(false);
        router.refresh();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllSalas();
                setSalas(data);
            } catch (error) {
                console.error('Error al obtener las salas:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <tr key={turno.idTurno}>
            <td className="w-max-content px-4 text-center">{turno.paciente.apellido}</td>
            <td className="w-max-content px-4 text-center">{turno.paciente.nombre}</td>
            <td className="w-max-content px-4 text-center">{turno.paciente.documento}</td>
            <td className="w-max-content px-4 text-center">{turno.medico.apellido}</td>
            <td className="w-max-content px-4 text-center">{turno.medico.nombre}</td>
            <td className="w-max-content px-4 text-center">{turno.medico.documento}</td>
            <td className="w-max-content px-4 text-center">{turno.idSala}</td>
            <td className="w-max-content px-4 text-center">{turno.fechaTurno.toString().slice(0,-14)}</td>
            <td className="flex gap-5">
                <FiEdit onClick={() => setOpenModalEdit(true)} cursor="pointer" className='text-blue-500' size={25} />
                <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                    <form onSubmit={handleSubmitEdit}>
                        <h3 className='font-bold text-lg text-center'> Editar Turno </h3>
                        <div className="space-y-1">
                            <div>
                                <label htmlFor="apellidoPaciente">Apellido Paciente: </label>
                                <input
                                    type="text"
                                    placeholder="apellido Paciente"
                                    value={apellidoPacienteToEdit}
                                    onChange={handleApellidoPacienteChange}
                                    maxLength={50}
                                />
                            </div>
                            <div>
                                <label htmlFor="nombrePaciente">Nombre Paciente: </label>
                                <input
                                    type="text"
                                    placeholder="nombre Paciente"
                                    value={nombrePacienteToEdit}
                                    onChange={handleNombrePacienteChange}
                                    maxLength={50}
                                />
                            </div>
                            <div>
                                <label htmlFor="DNIPaciente">Nro. Doc. Paciente: </label>
                                <input
                                    type="text"
                                    placeholder="Nro Doc Paciente"
                                    value={DNIPacienteToEdit}
                                    onChange={handleDNIPacienteChange}
                                    maxLength={50}
                                />
                            </div>
                            <div>
                                <label htmlFor="apellidoMedico">Apellido Médico: </label>
                                <input
                                    type="text"
                                    placeholder="apellido Medico"
                                    value={apellidoMedicoToEdit}
                                    onChange={handleApellidoMedicoChange}
                                    maxLength={50}
                                />
                            </div>
                            <div>
                                <label htmlFor="nombreMedico">Nombre Médico: </label>
                                <input
                                    type="text"
                                    placeholder="Nombre Medico"
                                    value={nombreMedicoToEdit}
                                    onChange={handleNombreMedicoChange}
                                    maxLength={50}
                                />
                            </div>
                            <div>
                                <label htmlFor="DNIMedico">Nro. Doc. Médico: </label>
                                <input
                                    type="text"
                                    placeholder="DNI Medico"
                                    value={DNIMedicoToEdit}
                                    onChange={handleDNIMedicoChange}
                                    maxLength={50}
                                />
                            </div>
                            <div>
                                <label htmlFor="fechaTurno">Fecha del Turno: </label>
                                <DatePicker  date={date} setDate={setDate}/>
                                <input
                                    type="hidden"
                                    placeholder="fecha Turno"
                                    value={fechaToEdit}
                                    // onChange={handleFechaChange}
                                    maxLength={50}
                                />
                            </div>
                            <div>
                                <label htmlFor="sala">Sala: </label>
                                <select
                                    value={salaToEdit}
                                    onChange={handleSalaChange}
                                >   
                                    {salas && salas.map((salas: ISalas, index: number) => (
                                        <option key={index} value={salas.idSala}>
                                            {salas.idSala}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <Button className="w-full mt-6 " name="btnEditTurnos" type="button" onClick={() => editTurno()}>
                                Editar Turno
                            </Button>
                        </div>
                        {errorMessage && (
                            <div className="error-message">
                                {errorMessage}
                            </div>
                        )}
                    </form>
                </Modal>

                <FiTrash2 onClick={() => setOpenModalDelete(true)} cursor="pointer" className='text-red-500' size={25} />
                <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
                    <h3 className="text-lg">¿Estas seguro que desea eliminar a este turno?</h3>
                    <div className="modal-action flex justify-end">
                        <table>
                            <tbody>
                                <tr>
                                    <td className="flex gap-5">
                                        <Button className="w-full mt-6 bg-red-500" name="btnConfirmDeleteTurno" type="submit" onClick={() => handleDeleteTurno(turno.idTurno)}>
                                            Si
                                        </Button>
                                        <Button className="w-full mt-6" name="btnCancelDeleteTurno" type="submit" onClick={() => setOpenModalDelete(false)}>
                                            No
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Modal>
            </td>
        </tr>
    )
};

export default Turno;