"use client";
import React, { FormEventHandler, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { ITipoExamen } from "@/types/tiposExamenes";
import { insertarTipoExamen } from "@/app/tiposExamenes/tiposExamenes";

const AddTipoExamen = () => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [tipoExamen, setTipoExamen] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [errorMessage, setErrorMessage] = useState('');



    const ocultarCartelError = () => {
        if (tipoExamen !== '' && descripcion !== '') {
            setErrorMessage('');
        }
    }


    const handleTipoExamenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTipoExamen(event.target.value);
        ocultarCartelError();
    };

    const handleDescripcionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescripcion(event.target.value);
        ocultarCartelError();
    };



    const registrarTipoExamen = async (values: ITipoExamen) => {
        var respuesta = await insertarTipoExamen(values);
    };

    const addTipoExamen = async () => {
        if (tipoExamen === '' || descripcion === '') {
            setErrorMessage('Por favor, complete el código y descripción de la prepaga');
            return;
        } else {
            setErrorMessage('');
        }

        const tipoExamenAlta = {
            tipoExamen: {
                tipoExamen: tipoExamen,
                descripcion: descripcion,
                examenes: null
            }
        };

        await registrarTipoExamen(tipoExamenAlta.tipoExamen);

        setTipoExamen("");
        setDescripcion("");
        setModalOpen(false);
        router.refresh();
    }

    //POR EL MOMENTO DEJO COMENTADO ESTO
    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {

    };


    return (
        <div>
            <Button className="w-full mt-6 " name="btnAddTipoExamen" type="submit"
                onClick={() => setModalOpen(true)}>
                Agregar Tipo de Examen
                <AiOutlinePlus className="ml-2" size={18} />
            </Button>

            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <form onSubmit={handleSubmit} className="text-left">
                    <div className="space-y-1">
                        <div>
                            <label htmlFor="tipoExamen">Código de Examen: </label>
                            <input
                                type="text"
                                placeholder="Código de Examen"
                                value={tipoExamen}
                                onChange={handleTipoExamenChange}
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
                    <Button className="w-full mt-6 " name="btnAddTipoExamen" type="submit" onClick={() => addTipoExamen()}>
                        Agregar Tipo de Examen
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

export default AddTipoExamen;