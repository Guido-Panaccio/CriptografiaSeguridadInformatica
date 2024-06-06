"use client";
import React, { FormEventHandler, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ITurno } from "@/types/turnos";
import { getSalaEstaReservada, insertarTurno } from "@/app/turnos/turnos";
import { useRouter } from "next/navigation";
import { getAllSalas } from "@/app/tiposSalas/tiposSalas";
import { ISalas } from "@/types/salas";
import { DatePicker } from "./DatePicker";
import { getPaciente } from "@/app/pacientes/pacientes";
import { getMedico } from "@/app/medico/medico";
import { format } from "date-fns";

const AddTurno = () => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [newTurnoValue, setNewTurnoValue] = useState<string>('');
    const [apellidoPaciente, setApellidoPaciente] = useState<string>('');
    const [nombrePaciente, setNombrePaciente] = useState<string>('');
    const [DNIPaciente, setDNIPaciente] = useState<string>('');
    const [apellidoMedico, setApellidoMedico] = useState<string>('');
    const [nombreMedico, setNombreMedico] = useState<string>('');
    const [DNIMedico, setDNIMedico] = useState<string>('');
    const [numeroSala, setNumeroSala] = useState<string>('-');
    const [salas, setSalas] = useState<ISalas[] | null>([]); 
    const [fechaTurno, setFechaTurno] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState('');
    const [date, setDate] = React.useState<Date | undefined>();

    useEffect(() => {
        const newFecha = date ? format(date, "yyyy-MM-dd") : '';
        setFechaTurno(newFecha);
    }, [date]); // cuando date cambia

    const ocultarCartelError = () => {
        if (apellidoPaciente !== '' && nombrePaciente !== '' && nombreMedico !== '' && apellidoMedico !== '' && numeroSala !== '' && fechaTurno) {
            setErrorMessage('');
        }
    }

    const handlerSubmitNewTurno: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        setNewTurnoValue("");
    }

    const handleApellidoPacienteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setApellidoPaciente(event.target.value);
        ocultarCartelError();
    };

    const handleNombrePacienteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNombrePaciente(event.target.value);
        ocultarCartelError();
    };

    const handleDNIPacienteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputDocumentNumber = event.target.value;
        // Validar si el valor ingresado es solo números (usando expresión regular)
        if (/^\d*$/.test(inputDocumentNumber) || inputDocumentNumber === '') {
            setDNIPaciente(inputDocumentNumber);
        }
        ocultarCartelError();
    };

    const handleApellidoMedicoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setApellidoMedico(event.target.value);
        ocultarCartelError();
    };

    const handleNombreMedicoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNombreMedico(event.target.value);
        ocultarCartelError();
    };

    const handleDNIMedicoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputDocumentNumber = event.target.value;
        // Validar si el valor ingresado es solo números (usando expresión regular)
        if (/^\d*$/.test(inputDocumentNumber) || inputDocumentNumber === '') {
            setDNIMedico(inputDocumentNumber);
        }
        ocultarCartelError();
    };

    const handleNumeroSalaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setNumeroSala(event.target.value);
        ocultarCartelError();
    };

    // const handleFechaTurnoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setFechaTurno(event.target.value);
    //     ocultarCartelError();
    // };

    const registrarTurno = async (infoTurno : any) => {
        var respuesta = await insertarTurno(infoTurno);
    };

    const addTurno = async () => {
        if (apellidoPaciente === '' || nombrePaciente === '' || nombreMedico === '' || apellidoMedico === '' || numeroSala === '' || fechaTurno === '') {
            setErrorMessage('Por favor, complete los datos del turno');
            return;
        } else {
            setErrorMessage('');

            const pacienteToAdd = await getPaciente(nombrePaciente, apellidoPaciente, DNIPaciente)
            const medicoToAdd = await getMedico(nombreMedico, apellidoMedico, DNIMedico)
    
            if (pacienteToAdd === undefined || medicoToAdd === undefined) {
                setErrorMessage('El paciente o el médico no existen.');
                return;
            } else {
                const existeSalaReservada = await getSalaEstaReservada('', fechaTurno, numeroSala)
                if (existeSalaReservada){
                    setErrorMessage('La sala ya está reservada para ese día.');
                    return;
                }
                else{
                    setErrorMessage('');
                    const turnoAlta = {
                        idPaciente: pacienteToAdd.idPaciente,
                        idMedico: medicoToAdd.idMedico,
                        idSala: Number(numeroSala),
                        fechaTurno: fechaTurno,
                        idUsuario: medicoToAdd.idMedico, 
                    }

                    await registrarTurno(turnoAlta);
                    setApellidoPaciente("");
                    setNombrePaciente("");
                    setApellidoMedico("");
                    setNombreMedico("");
                    setNumeroSala("");
                    setFechaTurno("");
                    setDNIPaciente("");
                    setDNIMedico("");
                    setModalOpen(false);
                    router.refresh();
                }
            }
        }
    };

    //POR EL MOMENTO DEJO COMENTADO ESTO
    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
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
        <div>
            <Button className="w-full mt-6 " name="btnAddTurnos" type="submit"
                onClick={() => setModalOpen(true)}>
                Agregar Turno
                <AiOutlinePlus className="ml-2" size={18} />
            </Button>
            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <form onSubmit={handleSubmit} className="text-left">
                    <div className="space-y-1">
                        <div>
                            <label htmlFor="apellidoPaciente">Apellido Paciente: </label>
                            <input
                                type="text"
                                placeholder="Apellido Paciente"
                                value={apellidoPaciente}
                                onChange={handleApellidoPacienteChange}
                                maxLength={50}
                            />
                        </div>
                        <div>
                            <label htmlFor="nombrePaciente">Nombre Paciente: </label>
                            <input
                                type="text"
                                placeholder="Nombre Paciente"
                                value={nombrePaciente}
                                onChange={handleNombrePacienteChange}
                                maxLength={50}
                            />
                        </div>
                        <div>
                            <label htmlFor="DNIPaciente">Nro. Doc. Paciente: </label>
                            <input
                                type="text"
                                placeholder="Nro. Doc. Paciente"
                                value={DNIPaciente}
                                onChange={handleDNIPacienteChange}
                                maxLength={50}
                            />
                        </div>
                        <div>
                            <label htmlFor="apellidoMedico">Apellido Médico: </label>
                            <input
                                type="text"
                                placeholder="Apellido Médico"
                                value={apellidoMedico}
                                onChange={handleApellidoMedicoChange}
                                maxLength={50}
                            />
                        </div>
                        <div>
                            <label htmlFor="nombreMedico">Nombre Médico: </label>
                            <input
                                type="text"
                                placeholder="Nombre Médico"
                                value={nombreMedico}
                                onChange={handleNombreMedicoChange}
                                maxLength={50}
                            />
                        </div>
                        <div>
                            <label htmlFor="DNIMedico">Nro. Doc. Médico: </label>
                            <input
                                type="text"
                                placeholder="Nro. Doc. Médico"
                                value={DNIMedico}
                                onChange={handleDNIMedicoChange}
                                maxLength={50}
                            />
                        </div>
                        <div>
                            <label htmlFor="sala">Sala: </label>
                            <select
                                value={numeroSala}
                                onChange={handleNumeroSalaChange}
                            >
                                <option value="-" disabled>
                                        -
                                </option>
                                {salas && salas.map((salas: ISalas, index: number) => (
                                    <option key={index} value={salas.idSala}>
                                        {salas.idSala}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="fechaTurno">Fecha del Turno: </label>
                            <DatePicker  date={date} setDate={setDate}/>
                            <input
                                type="hidden"
                                placeholder="fecha Turno"
                                value={date?.toString()}
                                // onChange={handleFechaChange}
                                maxLength={50}
                            />
                        </div>
                    </div>
                </form>
                <div>
                    <Button className="w-full mt-6 " name="btnAddTurnos" type="submit" onClick={() => addTurno()}>
                        Agregar Turno
                        <AiOutlinePlus className="ml-2" size={18} />
                    </Button>

                    {errorMessage && (
                        <div className="error-message">
                            {errorMessage}
                        </div>
                    )}
                </div>
            </Modal>

        </div >
    );
};

export default AddTurno;