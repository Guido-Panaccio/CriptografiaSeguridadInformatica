"use client";

import { FormEventHandler, use, useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Button } from "./ui/button";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { IPrepaga } from "@/types/prepaga";
import { editarPrepaga, eliminarPrepaga, getAllPrepagas } from "@/app/tiposPrepagas/tiposPrepagas";

interface PrepagaProps {
    prepaga: IPrepaga
}

const Prepaga: React.FC<PrepagaProps> = ({ prepaga }) => {
    const router = useRouter();
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
    const [idPrepagaToEdit, setIdPrepagaToEdit] = useState<string>(prepaga.idPrepaga);
    const [descripcionToEdit, setDescripcionToEdit] = useState<string>(prepaga.descripcion);

    const [errorMessage, setErrorMessage] = useState('');
    const { push } = useRouter();

    const ocultarCartelError = () => {
        if (idPrepagaToEdit !== '' && descripcionToEdit !== '') {
            setErrorMessage('');
        }
    }

    const handleIdPrepagaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIdPrepagaToEdit(event.target.value);
        ocultarCartelError();
    };

    const handleDescripcionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescripcionToEdit(event.target.value);
        ocultarCartelError();
    };

    const editPrepaga = async () => {
        if (idPrepagaToEdit === '' || descripcionToEdit === '') {
            setErrorMessage('Por favor, complete el código y descripción de la prepaga');
            return;
        } else {
            setErrorMessage('');
        }

        const idPrepagaModificar = prepaga.idPrepaga;

        const prepagaEditar = {
            prepaga: {
                idPrepaga: idPrepagaToEdit,
                descripcion: descripcionToEdit,
                Pacientes: null
            }
        };

        await editarPrepaga(prepagaEditar.prepaga, idPrepagaModificar);

        setOpenModalEdit(false);

        router.refresh();
    }

    //POR EL MOMENTO LO DEJO COMENTADO
    const handleSubmitEdit: FormEventHandler<HTMLFormElement> = async (event) => {

    };

    const handleDeletePrepaga = async (idPrepaga: string) => {
        await eliminarPrepaga(idPrepaga);
        setOpenModalDelete(false);
        router.refresh();
    };


    return (
        <tr key={prepaga.idPrepaga}>
            {/* <td>{paciente.idPaciente}</td> */}
            <td className="w-max-content px-4 text-center">{prepaga.idPrepaga}</td>
            <td className="w-max-content px-4 text-center">{prepaga.descripcion}</td>

            <td className="flex gap-5">
                <FiEdit onClick={() => setOpenModalEdit(true)} cursor="pointer" className='text-blue-500' size={25} />
                <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                    <form onSubmit={handleSubmitEdit}>
                        <h3 className='font-bold text-lg text-center'> Editar Prepaga </h3>
                        <div className="space-y-1">
                            <div>
                                <label htmlFor="codigoPrepaga">Código de Prepaga: </label>
                                <input
                                    type="text"
                                    placeholder="Código de Prepaga"
                                    value={idPrepagaToEdit}
                                    onChange={handleIdPrepagaChange}
                                    maxLength={5}
                                />
                            </div>
                            <div>
                                <label htmlFor="nombre">Descripción: </label>
                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    value={descripcionToEdit}
                                    onChange={handleDescripcionChange}
                                    maxLength={50}
                                />
                            </div>
                        </div>
                    </form>
                    <div>
                        <Button className="w-full mt-6 " name="btnEditPrepaga" type="submit" onClick={() => editPrepaga()}>
                            Editar Prepaga
                        </Button>
                    </div>
                </Modal>

                <FiTrash2 onClick={() => setOpenModalDelete(true)} cursor="pointer" className='text-red-500' size={25} />
                <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
                    <h3 className="text-lg">¿Estas seguro que desea eliminar a esta prepaga?</h3>
                    <div className="modal-action flex justify-end">
                        <table>
                            <tbody>
                                <tr>
                                    <td className="flex gap-5">
                                        <Button className="w-full mt-6 bg-red-500" name="btnConfirmDeletePrepaga" type="submit" onClick={() => handleDeletePrepaga(prepaga.idPrepaga)}>
                                            Si
                                        </Button>
                                        <Button className="w-full mt-6" name="btnCancelDeletePrepaga" type="submit" onClick={() => setOpenModalDelete(false)}>
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

export default Prepaga;