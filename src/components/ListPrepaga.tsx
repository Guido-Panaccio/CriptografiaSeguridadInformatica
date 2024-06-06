"use client";
import React, { useState } from "react";
import { MdOutlineCleaningServices } from "react-icons/md";
import { IPrepaga } from "@/types/prepaga";
import Prepaga from "./Prepaga";

interface ListPrepagaProps {
    prepagas: IPrepaga[],
}

const ListPrepaga: React.FC<ListPrepagaProps> = ({ prepagas }) => {
    const [idPrepagaFilter, setIdPrepagaFilter] = useState<string>("");
    const [descripcionFilter, setDescripcionFilter] = useState<string>("");


    // Lista de todas las prepagas que recibimos de la base de datos
    const prepagasFromDatabase: IPrepaga[] = prepagas;

    // Filtro para los pacientes
    const filteredPrepagas = prepagasFromDatabase.filter(prepagas => {
        const idPrepagaFiltro = prepagas.idPrepaga.includes(idPrepagaFilter);
        const descripcionFiltro = prepagas.descripcion.includes(descripcionFilter);


        return idPrepagaFiltro && descripcionFiltro;
    });

    const limpiarFiltros = () => {
        setIdPrepagaFilter('');
        setDescripcionFilter('');
    }


    return (
        <div>
            <div className="overflow-x-auto py-4">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            {/* <th>id</th> */}
                            <th className="w-max-content px-4 text-center">Código de Prepaga</th>
                            <th className="w-max-content px-4 text-center">Descripción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="border border-gray-300 rounded-md px-2 py-1 text-sm font-medium text-gray-600">
                                    <input
                                        type="text"
                                        value={idPrepagaFilter}
                                        onChange={(e) => setIdPrepagaFilter(e.target.value)}
                                        placeholder="Filtrar por código">
                                    </input>
                                </div>
                            </td>
                            <td>
                                <div className="border border-gray-300 rounded-md px-2 py-1 text-sm font-medium text-gray-600">
                                    <input
                                        type="text"
                                        value={descripcionFilter}
                                        onChange={(e) => setDescripcionFilter(e.target.value)}
                                        placeholder="Filtrar por descripción">
                                    </input>
                                </div>
                            </td>
                            <td>
                                <div className="center gap-5">
                                    <div className="center tooltip-label tooltip-container font-medium" data-tooltip="Limpiar filtros">
                                        <MdOutlineCleaningServices onClick={() => limpiarFiltros()} cursor="pointer" className='text-gray-500' size={25} />
                                    </div>
                                </div>

                            </td>
                        </tr>
                        {filteredPrepagas.map((prepaga) => <Prepaga key={prepaga.idPrepaga} prepaga={prepaga} />)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListPrepaga;