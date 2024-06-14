"use client";
import React, { FormEventHandler, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IPaciente } from "@/types/pacientes";
import { insertarPaciente } from "@/app/pacientes/pacientes";
import { useRouter } from "next/navigation";
import { getAllPrepagas } from "@/app/tiposPrepagas/tiposPrepagas";
import { IPrepaga } from "@/types/prepaga";

const AddPaciente = () => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [newPacienteValue, setNewPacienteValue] = useState<string>('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [selectedTipoDocumento, setSelectedTipoDocumento] = useState('DNI');
    const [documentNumber, setDocumentNumber] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [ocupacion, setOcupacion] = useState('');
    const [idPrepaga, setIdPrepaga] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [prepagas, setPrepagas] = useState<IPrepaga[] | null>([]);


    const ocultarCartelError = () => {
        if (apellido !== '' && nombre !== '' && documentNumber !== '') {
            setErrorMessage('');
        }
    }

    const handlerSubmitNewPaciente: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        setNewPacienteValue("");
    }

    const handleNombreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNombre(event.target.value);
        ocultarCartelError();
    };

    const handleApellidoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setApellido(event.target.value);
        ocultarCartelError();
    };

    const handleTipoDocumentoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTipoDocumento(event.target.value);
    };

    const handleDocumentNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputDocumentNumber = event.target.value;
        // Validar si el valor ingresado es solo números (usando expresión regular)
        if (/^\d*$/.test(inputDocumentNumber) || inputDocumentNumber === '') {
            setDocumentNumber(inputDocumentNumber);
        }
        ocultarCartelError();
    };

    const handleDireccionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDireccion(event.target.value);
    };

    const handleTelefonoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTelefono(event.target.value);
    };

    const handleOcupacionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOcupacion(event.target.value);
    };

    const handleIdPrepagaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setIdPrepaga(event.target.value);
    };

    const registrarPaciente = async (values: IPaciente) => {
        var respuesta = await insertarPaciente(values);
    };

    const addPaciente = async () => {
        if (apellido === '' || nombre === '' || documentNumber === '') {
            setErrorMessage('Por favor, complete el apellido, nombre y documento del paciente');
            return;
        } else {
            setErrorMessage('');
        }

        const pacienteAlta = {
            paciente: {
                idPaciente: 0, //Automaticamente lo setea la base de datos
                apellido: apellido,
                nombre: nombre,
                tipoDocumento: selectedTipoDocumento,
                documento: documentNumber,
                direccion: direccion === '' ? null : direccion,
                telefono: telefono === '' ? null : telefono,
                ocupacion: ocupacion === '' ? null : ocupacion,
                idPrepaga: idPrepaga === '' ? null : idPrepaga,
                Examenes: null,
                tipoPrepaga: null
            }
        };

        await registrarPaciente(pacienteAlta.paciente);

        setApellido("");
        setNombre("");
        setApellido("");
        setSelectedTipoDocumento("DNI")
        setDocumentNumber("");
        setDireccion("");
        setTelefono("");
        setOcupacion("");
        setIdPrepaga("");
        setModalOpen(false);
        router.refresh();
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {

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
        <div>
            <Button className="w-full mt-6 " name="btnAddPacientes" type="submit"
                onClick={() => setModalOpen(true)}>
                Agregar Paciente
                <AiOutlinePlus className="ml-2" size={18} />
            </Button>

            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <form onSubmit={handleSubmit} className="text-left">
                    <div className="space-y-1">
                        <div>
                            <label htmlFor="apellido">Apellido: </label>
                            <input
                                type="text"
                                placeholder="Apellido"
                                value={apellido}
                                onChange={handleApellidoChange}
                                maxLength={50}
                            />
                        </div>
                        <div>
                            <label htmlFor="nombre">Nombre: </label>
                            <input
                                type="text"
                                placeholder="Nombre"
                                value={nombre}
                                onChange={handleNombreChange}
                                maxLength={50}
                            />
                        </div>
                        <div>
                            <label htmlFor="tipoDocumento">Tipo de Documento: </label>
                            <select value={selectedTipoDocumento} onChange={handleTipoDocumentoChange}>
                                <option value="DNI">DNI</option>
                                <option value="PAS">Pasaporte</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="documento">Documento: </label>
                            <input
                                type="text"
                                placeholder="Número de documento"
                                value={documentNumber}
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
                                value={direccion}
                                onChange={handleDireccionChange}
                                maxLength={50}
                            />
                        </div>
                        <div>
                            <label htmlFor="telefono">Teléfono: </label>
                            <input
                                type="text"
                                placeholder="Teléfono"
                                value={telefono}
                                onChange={handleTelefonoChange}
                                maxLength={50}
                            />
                        </div>
                        <div>
                            <label htmlFor="ocupacion">Ocupación: </label>
                            <input
                                type="text"
                                placeholder="Ocupación"
                                value={ocupacion}
                                onChange={handleOcupacionChange}
                                maxLength={50}
                            />
                        </div>
                        <div>
                            <label htmlFor="idPrepaga">Prepaga:</label>
                            <select id="idPrepaga" value={idPrepaga} onChange={handleIdPrepagaChange}>
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
                    <Button className="w-full mt-6 " name="btnAddPacientes" type="submit" onClick={() => addPaciente()}>
                        Agregar Paciente
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

export default AddPaciente;