"use client";
import React, { useState } from "react";
import { MdOutlineCleaningServices } from "react-icons/md";
import { ITipoExamen } from "@/types/tiposExamenes";
import TipoExamen from "./TipoExamen";

interface ListTipoExamenProps {
    tiposExamen: ITipoExamen[],
}

const ListTipoExamen: React.FC<ListTipoExamenProps> = ({ tiposExamen }) => {
    const [tipoExamenFilter, setTipoExamenFilter] = useState<string>("");
    const [descripcionFilter, setDescripcionFilter] = useState<string>("");


    // Lista de todas las prepagas que recibimos de la base de datos
    const tiposExamenFromDatabase: ITipoExamen[] = tiposExamen;

    // Filtro para los tipos de examen
    const filteredTiposExamen = tiposExamenFromDatabase.filter(tiposExamen => {
        const tipoExamenFiltro = tiposExamen.tipoExamen.includes(tipoExamenFilter);
        const descripcionFiltro = tiposExamen.descripcion.includes(descripcionFilter);


        return tipoExamenFiltro && descripcionFiltro;
    });

    const limpiarFiltros = () => {
        setTipoExamenFilter('');
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
                            <th className="w-max-content px-4 text-center">Código de Examen</th>
                            <th className="w-max-content px-4 text-center">Descripción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="border border-gray-300 rounded-md px-2 py-1 text-sm font-medium text-gray-600">
                                    <input
                                        type="text"
                                        value={tipoExamenFilter}
                                        onChange={(e) => setTipoExamenFilter(e.target.value)}
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
                        {filteredTiposExamen.map((tipoExamen) => <TipoExamen key={tipoExamen.tipoExamen} tipoExamen={tipoExamen} />)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListTipoExamen;