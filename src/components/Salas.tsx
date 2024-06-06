"use client";

import { FormEventHandler, use, useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Button } from "./ui/button";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { editarSala, getSala, eliminarSala } from "@/app/tiposSalas/tiposSalas";
import { ISalas } from "@/types/salas";
import * as React from "react"


interface salaProps {
    sala: ISalas
}

const Sala: React.FC<salaProps> = ({ sala }) => {
    const router = useRouter();
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
    const [numeroSalaToEdit, setNumeroSalaToEdit] = useState<string>(sala.idSala.toString());
    const [descripcionSalaToEdit, setDescripcionSalaToEdit] = useState<string>(sala.descripcion);
    const [errorMessage, setErrorMessage] = useState('');
    const { push } = useRouter();

    const ocultarCartelError = () => {
        if (numeroSalaToEdit !== null && descripcionSalaToEdit !== null) {
            setErrorMessage('');
        }
    }

    const handleNumeroSalaToEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d*$/.test(numeroSalaToEdit) || numeroSalaToEdit === '') {
            setNumeroSalaToEdit(event.target.value);
            ocultarCartelError();
        }
    };

    const handleDescripcionSalaToEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescripcionSalaToEdit(event.target.value);
        ocultarCartelError();
    };


    const editSala = async () => {
        if (numeroSalaToEdit === '' || descripcionSalaToEdit === '') {
            setErrorMessage('Por favor, complete los datos obligatorios.');
            return;
        } else {
            setErrorMessage('');
        }

        const existeSala = await getSala(numeroSalaToEdit)
        if (existeSala){
            setErrorMessage('El número de sala ya existe')
        } else{
            setErrorMessage('')
            const salaEditar = {
                idSalaViejo: sala.idSala,
                idSala: numeroSalaToEdit,
                descripcionSala: descripcionSalaToEdit,
            }

            await editarSala(salaEditar);
            setOpenModalEdit(false);
            router.refresh()
        }
    }

    const handleSubmitEdit: FormEventHandler<HTMLFormElement> = async (event) => {
    };

    const handleDeleteSala = async (idsala: number) => {
        await eliminarSala(idsala);
        setOpenModalDelete(false);
        router.refresh();
    };

    return (
        <tr key={sala.idSala}>
            <td className="w-max-content px-4 text-center">{sala.idSala}</td>
            <td className="w-max-content px-4 text-center">{sala.descripcion}</td>
            <td className="flex gap-5">
                <FiEdit onClick={() => setOpenModalEdit(true)} cursor="pointer" className='text-blue-500' size={25} />
                <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                    <form onSubmit={handleSubmitEdit}>
                        <h3 className='font-bold text-lg text-center'> Editar sala </h3>
                        <div className="space-y-1">
                            <div>
                                <label htmlFor="numeroSala">Número de Sala: </label>
                                <input
                                    type="text"
                                    placeholder="numero Sala"
                                    value={numeroSalaToEdit}
                                    onChange={handleNumeroSalaToEdit}
                                    maxLength={50}
                                />
                            </div>
                            <div>
                                <label htmlFor="descripcionSala">Descripción Sala: </label>
                                <input
                                    type="text"
                                    placeholder="descripcion Sala"
                                    value={descripcionSalaToEdit}
                                    onChange={handleDescripcionSalaToEdit}
                                    maxLength={50}
                                />
                            </div>
                        </div>
                        <div>
                            <Button className="w-full mt-6 " name="btnEditsalas" type="button" onClick={() => editSala()}>
                                Editar sala
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
                    <h3 className="text-lg">¿Estas seguro que desea eliminar a esta sala?</h3>
                    <div className="modal-action flex justify-end">
                        <table>
                            <tbody>
                                <tr>
                                    <td className="flex gap-5">
                                        <Button className="w-full mt-6 bg-red-500" name="btnConfirmDeletesala" type="submit" onClick={() => handleDeleteSala(sala.idSala)}>
                                            Si
                                        </Button>
                                        <Button className="w-full mt-6" name="btnCancelDeletesala" type="submit" onClick={() => setOpenModalDelete(false)}>
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

export default Sala;

