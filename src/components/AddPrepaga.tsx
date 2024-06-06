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
import { getAllPrepagas, insertarPrepaga } from "@/app/tiposPrepagas/tiposPrepagas";
import { IPrepaga } from "@/types/prepaga";

const AddPrepaga = () => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [idPrepaga, setIdPrepaga] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [errorMessage, setErrorMessage] = useState('');



    const ocultarCartelError = () => {
        if (idPrepaga !== '' && descripcion !== '') {
            setErrorMessage('');
        }
    }


    const handleIdPrepagaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIdPrepaga(event.target.value);
        ocultarCartelError();
    };

    const handleDescripcionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescripcion(event.target.value);
        ocultarCartelError();
    };



    const registrarPrepaga = async (values: IPrepaga) => {
        var respuesta = await insertarPrepaga(values);
    };

    const addPrepaga = async () => {
        if (idPrepaga === '' || descripcion === '') {
            setErrorMessage('Por favor, complete el código y descripción de la prepaga');
            return;
        } else {
            setErrorMessage('');
        }

        const prepagaAlta = {
            prepaga: {
                idPrepaga: idPrepaga,
                descripcion: descripcion,
                Pacientes: null
            }
        };

        await registrarPrepaga(prepagaAlta.prepaga);

        setIdPrepaga("");
        setDescripcion("");
        setModalOpen(false);
        router.refresh();
    }

    //POR EL MOMENTO DEJO COMENTADO ESTO
    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {

    };


    return (
        <div>
            <Button className="w-full mt-6 " name="btnAddPrepaga" type="submit"
                onClick={() => setModalOpen(true)}>
                Agregar Prepaga
                <AiOutlinePlus className="ml-2" size={18} />
            </Button>

            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <form onSubmit={handleSubmit} className="text-left">
                    <div className="space-y-1">
                        <div>
                            <label htmlFor="codigoPrepaga">Código de Prepaga: </label>
                            <input
                                type="text"
                                placeholder="Código de Prepaga"
                                value={idPrepaga}
                                onChange={handleIdPrepagaChange}
                                maxLength={5}
                            />
                        </div>
                        <div>
                            <label htmlFor="descripcion">Descripción: </label>
                            <input
                                type="text"
                                placeholder="Descripción"
                                value={descripcion}
                                onChange={handleDescripcionChange}
                                maxLength={50}
                            />
                        </div>
                    </div>
                </form>
                <div>
                    <Button className="w-full mt-6 " name="btnAddPrepaga" type="submit" onClick={() => addPrepaga()}>
                        Agregar Prepaga
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

export default AddPrepaga;