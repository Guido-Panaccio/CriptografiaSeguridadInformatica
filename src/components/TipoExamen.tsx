"use client";

import { FormEventHandler, use, useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Button } from "./ui/button";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { IPrepaga } from "@/types/prepaga";
import { editarPrepaga, eliminarPrepaga, getAllPrepagas } from "@/app/tiposPrepagas/tiposPrepagas";
import { ITipoExamen } from "@/types/tiposExamenes";
import { editarTipoExamen, eliminarTipoExamen } from "@/app/tiposExamenes/tiposExamenes";

interface TipoExamenProps {
    tipoExamen: ITipoExamen
}

const TipoExamen: React.FC<TipoExamenProps> = ({ tipoExamen }) => {
    const router = useRouter();
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
    const [tipoExamenToEdit, setTipoExamenToEdit] = useState<string>(tipoExamen.tipoExamen);
    const [descripcionToEdit, setDescripcionToEdit] = useState<string>(tipoExamen.descripcion);

    const [errorMessage, setErrorMessage] = useState('');
    const { push } = useRouter();

    const ocultarCartelError = () => {
        if (tipoExamenToEdit !== '' && descripcionToEdit !== '') {
            setErrorMessage('');
        }
    }

    const handleTipoExamenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTipoExamenToEdit(event.target.value);
        ocultarCartelError();
    };

    const handleDescripcionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescripcionToEdit(event.target.value);
        ocultarCartelError();
    };

    const editTipoExamen = async () => {
        if (tipoExamenToEdit === '' || descripcionToEdit === '') {
            setErrorMessage('Por favor, complete el código y descripción del tipo de examen');
            return;
        } else {
            setErrorMessage('');
        }

        const tipoExamenModificar = tipoExamen.tipoExamen;

        const tipoExamenEditar = {
            tipoExamen: {
                tipoExamen: tipoExamenToEdit,
                descripcion: descripcionToEdit,
                examenes: null
            }
        };

        await editarTipoExamen(tipoExamenEditar.tipoExamen, tipoExamenModificar);

        setOpenModalEdit(false);

        router.refresh();
    }

    //POR EL MOMENTO LO DEJO COMENTADO
    const handleSubmitEdit: FormEventHandler<HTMLFormElement> = async (event) => {

    };

    const handleDeleteTipoExamen = async (tipoExamenEliminar: string) => {
        if (tipoExamen.examenes && tipoExamen.examenes.length == 0) {
            await eliminarTipoExamen(tipoExamenEliminar);
            setOpenModalDelete(false);
            router.refresh();
        } else {
            setErrorMessage('Este tipo de examen no se puede eliminar porque esta asociado a un examen');
        }

    };


    return (
        <tr key={tipoExamen.tipoExamen}>
            {/* <td>{paciente.idPaciente}</td> */}
            <td className="w-max-content px-4 text-center">{tipoExamen.tipoExamen}</td>
            <td className="w-max-content px-4 text-center">{tipoExamen.descripcion}</td>

            <td className="flex gap-5">
                <FiEdit onClick={() => setOpenModalEdit(true)} cursor="pointer" className='text-blue-500' size={25} />
                <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                    <form onSubmit={handleSubmitEdit}>
                        <h3 className='font-bold text-lg text-center'> Editar Tipo de Examen </h3>
                        <div className="space-y-1">
                            <div>
                                <label htmlFor="codigoExamen">Código de Examen: </label>
                                <input
                                    type="text"
                                    placeholder="Código de Examen"
                                    value={tipoExamenToEdit}
                                    onChange={handleTipoExamenChange}
                                    maxLength={5}
                                />
                            </div>
                            <div>
                                <label htmlFor="nombre">Descripción: </label>
                                <input
                                    type="text"
                                    placeholder="Descripción"
                                    value={descripcionToEdit}
                                    onChange={handleDescripcionChange}
                                    maxLength={50}
                                />
                            </div>
                        </div>
                    </form>
                    <div>
                        <Button className="w-full mt-6 " name="btnEditPrepaga" type="submit" onClick={() => editTipoExamen()}>
                            Editar Tipo de Examen
                        </Button>
                    </div>
                </Modal>

                <FiTrash2 onClick={() => setOpenModalDelete(true)} cursor="pointer" className='text-red-500' size={25} />
                <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
                    <h3 className="text-lg">¿Estas seguro que desea eliminar a este tipo de examen?</h3>
                    <div className="modal-action flex justify-end">
                        <table>
                            <tbody>
                                <tr>
                                    <td className="flex gap-5">
                                        <Button className="w-full mt-6 bg-red-500" name="btnConfirmDeletePrepaga" type="submit" onClick={() => handleDeleteTipoExamen(tipoExamen.tipoExamen)}>
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
                    {errorMessage && (
                            <div className="error-message">
                                {errorMessage}
                            </div>
                    )}
                </Modal>

            </td>
        </tr>
    )
};

export default TipoExamen;