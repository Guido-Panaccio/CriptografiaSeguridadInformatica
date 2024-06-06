"use client";

import React, { useEffect, useState } from "react";
import { MdOutlineCleaningServices } from "react-icons/md";
import { IUsuario } from "@/types/usuario";
import { DatePicker } from "./DatePicker";
import { format } from "date-fns";
import { ISalas } from "@/types/salas";
import Sala from "./Salas";

interface ListSalaProps {
    salas: ISalas[];
    usuario: IUsuario | null; // Allow `null` as a possible value
}

const ListSala: React.FC<ListSalaProps> = ({salas, usuario }) => {
    const [numeroSalaFilter, setNumeroSalaFilter] = useState<string>("");
    const [descripcionSalaFilter, setDescripcionSalaFilter] = useState<string>("");

    // Lista de todas las salas que recibimos de la base de datos
    const turnosFromDatabase: ISalas[] = salas;

    // Filtro para las salas
    const filteredSalas = turnosFromDatabase.filter(salas => {
        const numeroSalaFiltro = salas.idSala.toString().includes(numeroSalaFilter);
        const descripcionSalaFiltro = salas.descripcion.includes(descripcionSalaFilter);

        return numeroSalaFiltro && descripcionSalaFiltro;
    });

    const limpiarFiltros = () => {
        setNumeroSalaFilter('');
        setDescripcionSalaFilter('');
    }

    return (
        <div>
            <div className="overflow-x-auto py-4">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            {/* <th>id</th> */}
                            <th className="w-max-content px-4 text-center">Número Sala:</th>
                            <th className="w-max-content px-4 text-center">Descripción Sala:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="border border-gray-300 rounded-md px-2 py-1 text-sm font-medium text-gray-600">
                                    <input
                                        type="text"
                                        value={numeroSalaFilter}
                                        onChange={(e) => setNumeroSalaFilter(e.target.value)}
                                        placeholder="Filtrar por número de sala">
                                    </input>
                                </div>
                            </td>
                            <td>
                                <div className="border border-gray-300 rounded-md px-2 py-1 text-sm font-medium text-gray-600">
                                    <input
                                        type="text"
                                        value={descripcionSalaFilter}
                                        onChange={(e) => setDescripcionSalaFilter(e.target.value)}
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
                        {filteredSalas.map((sala) => <Sala key={sala.idSala} sala={sala} />)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListSala;