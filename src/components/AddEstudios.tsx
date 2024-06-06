"use client";
import React, { FormEventHandler, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { IExamen } from "@/types/examen";
import { IEstudio } from "@/types/estudio";
import { insertarEstudio } from "@/app/estudio/estudio";
import { FiTrash2 } from "react-icons/fi";

interface ExamenProps {
    examen: IExamen
}

const AddEstudio: React.FC<ExamenProps> = ({ examen }) => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [tipoEstudioToAdd, setTipoEstudioToAdd] = useState<string>('');
    const [resultadoToAdd, setResultadoToAdd] = useState<string | null>('');
    const [fileEstudio, setFileEstudio] = useState<File | null>();



    const handleTipoEstudioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTipoEstudioToAdd(event.target.value);
    };

    const handleResultadosChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setResultadoToAdd(event.target.value);
    };

    const handleImagenEstudioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const selectedFile = files[0];
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif']; // Tipos de archivo de imagen permitidos
    
            if (validImageTypes.includes(selectedFile.type)) {
                setFileEstudio(selectedFile);
            } else {
                // El archivo seleccionado no es una imagen válida
                alert('Por favor, selecciona un archivo de imagen válido (JPEG, PNG o GIF)');
            }        
        }
    };

    const registrarEstudio = async (values: IEstudio) => {
        await insertarEstudio(values);
    };

    const addEstudio = async () => {
        const currentDate: Date = new Date();

        const estudioAlta = {
            estudio: {
                idEstudio: 0,
                tipoEstudio: tipoEstudioToAdd,
                resultado: resultadoToAdd,
                examenesIdExamen: examen.idExamen,
                Examen: null,
                Estudio: fileEstudio || null,
                estudioPath: null,
                fechaRealizacion: currentDate
            }
        };

        await registrarEstudio(estudioAlta.estudio);

        setTipoEstudioToAdd("")
        setResultadoToAdd("");
        setFileEstudio(null);
        setModalOpen(false);
        router.refresh();
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {

    };

    return (
        <div>
            <div className="center tooltip-label tooltip-container font-medium" data-tooltip="Agregar estudio">
                <AiOutlinePlus onClick={() => setModalOpen(true)} cursor="pointer" className='text-green-800' size={25} />
            </div>

            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <form onSubmit={handleSubmit} className="text-left">
                    <div className="space-y-1">
                        <div>
                            <label htmlFor="tipoEstudio">Tipo de Estudio: </label>
                            <input
                                type="text"
                                placeholder="Tipo de estudio"
                                value={tipoEstudioToAdd}
                                onChange={handleTipoEstudioChange}
                                maxLength={50}
                            />
                        </div>
                        <div className="w-full max-w-screen-md mx-auto">
                            <textarea
                                style={{ width: '765px', height: '250px' }}
                                className="w-full p-4 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500"
                                placeholder="Escribe las observaciones aquí..."
                                value={resultadoToAdd || ''}
                                onChange={handleResultadosChange}
                                rows={6}
                                maxLength={100}
                            />
                            <p className="mt-2 text-gray-500">
                                Caracteres: {resultadoToAdd?.length} / 50 <br /> Palabras: {resultadoToAdd?.length == 0 ? 0 : resultadoToAdd?.trim().split(/\s+/).length}
                            </p>
                        </div>
                        <div>
                            <label htmlFor="imageEstudio" ></label>
                            <input
                                id="imageEstudioSubida"
                                type="file"
                                className="custom-file-input"
                                accept="image/*"
                                onChange={handleImagenEstudioChange}
                            />
                            <div className="flex items-center w-full gap-5">
                                <p>Archivo seleccionado: {fileEstudio ? fileEstudio.name : 'Ningún archivo seleccionado'}</p>
                                <div className="justify-end tooltip-label tooltip-container font-medium" data-tooltip="Descartar imagen">
                                    {fileEstudio && <FiTrash2 onClick={() => setFileEstudio(null)} cursor="pointer" className='text-red-500' size={20} />}
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            {fileEstudio && <img
                                className="w-64 h-64 object-contain mx-auto"
                                src={URL.createObjectURL(fileEstudio)} alt=""
                            />}
                        </div>
                    </div>
                </form>
                <div>
                    <Button className="w-full mt-6 " name="btnAddEstudio" type="submit" onClick={() => addEstudio()}>
                        Agregar Estudio
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

export default AddEstudio;