"use client";
import React, { FormEventHandler, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { getAllSalas, getSala, insertarSala } from "@/app/tiposSalas/tiposSalas";

const AddSala = () => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [numeroSala, setNumeroSala] = useState<string>('');
    const [descripcionSala, setDescripcionSala] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState('');

    const ocultarCartelError = () => {
        if (numeroSala !== '' && descripcionSala !== '') {
            setErrorMessage('');
        }
    }

    const handleNumeroSalaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d*$/.test(event.target.value)) {
            setNumeroSala(event.target.value);
            ocultarCartelError();
        }
    };

    const handleDescripcionSalaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescripcionSala(event.target.value);
        ocultarCartelError();
    };

    const registrarSala = async (infoSala : any) => {
        var respuesta = await insertarSala(infoSala);
    };

    const addSala = async () => {
        if (numeroSala === '' || descripcionSala === '') {
            setErrorMessage('Por favor, complete los datos del turno');
            return;
        } else {
            setErrorMessage('');
            const existeSala = await getSala(numeroSala)
            if (existeSala){
                setErrorMessage('El número de sala ya existe')
            } else{
                setErrorMessage('')
                const salaRegistrar = {
                    idSala: numeroSala,
                    descripcionSala: descripcionSala
                }

                await registrarSala(salaRegistrar);
                setModalOpen(false);
                router.refresh()
            }
        }
    };

    //POR EL MOMENTO DEJO COMENTADO ESTO
    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    };

    return (
        <div>
            <Button className="w-full mt-6 " name="btnAddSala" type="submit"
                onClick={() => setModalOpen(true)}>
                Agregar Sala
                <AiOutlinePlus className="ml-2" size={18} />
            </Button>
            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <form onSubmit={handleSubmit} className="text-left">
                    <div className="space-y-1">
                        <div>
                            <label htmlFor="apellidoPaciente">Número Sala: </label>
                            <input
                                type="text"
                                placeholder="Número Sala"
                                value={numeroSala}
                                onChange={handleNumeroSalaChange}
                                maxLength={50}
                            />
                        </div>
                        <div>
                            <label htmlFor="descripcionSala">Descripción Sala: </label>
                            <input
                                type="text"
                                placeholder="Descripción Sala"
                                value={descripcionSala}
                                onChange={handleDescripcionSalaChange}
                                maxLength={50}
                            />
                        </div>
                    </div>
                </form>
                <div>
                    <Button className="w-full mt-6 " name="btnAddSalas" type="submit" onClick={() => addSala()}>
                        Agregar Sala
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

export default AddSala;
