"use client";

import { ITurno } from "@/types/turnos";
import React, { useEffect, useState } from "react";
import Turno from "./Turno";
import { MdOutlineCleaningServices } from "react-icons/md";
import { IUsuario } from "@/types/usuario";
import { DatePicker } from "./DatePicker";
import { format } from "date-fns";

interface ListTurnoProps {
    turnos: ITurno[];
    usuario: IUsuario | null; // Allow `null` as a possible value
}

const ListTurno: React.FC<ListTurnoProps> = ({ turnos, usuario }) => {
    const [date, setDate] = React.useState<Date>()
    const [apellidoPacienteFilter, setApellidoPacienteFilter] = useState<string>("");
    const [nombrePacienteFilter, setNombrePacienteFilter] = useState<string>("");
    const [DNIPacienteFilter, setDNIPacienteFilter] = useState<string>("");
    const [apellidoMedicoFilter, setApellidoMedicoFilter] = useState<string>("");
    const [nombreMedicoFilter, setNombreMedicoFilter] = useState<string>("");
    const [DNIMedicoFilter, setDNIMedicoFilter] = useState<string>("");
    const [numeroSalaFilter, setNumeroSalaFilter] = useState<string>("");
    const [fechaFilter, setFechaFilter] = useState<string>("");
    const [misPacientesFilter, setMisPacientesFilter] = useState<boolean>(false);

    useEffect(() => {
        const newFechaFilter = date ? format(date, "yyyy-MM-dd") : '';
        setFechaFilter(newFechaFilter);
      }, [date]); // cuando date cambia

    // Lista de todos turnos que recibimos de la base de datos
    const turnosFromDatabase: ITurno[] = turnos;

    // Filtro para los turnos
    const filteredTurnos = turnosFromDatabase.filter(turno => {
        const apellidoPacienteFiltro = turno.paciente.apellido.includes(apellidoPacienteFilter);
        const nombrePacienteFiltro = turno.paciente.nombre.includes(nombrePacienteFilter);
        const DNIPacienteFiltro = turno.paciente.documento.toString().includes(DNIPacienteFilter);
        const apellidoMedicoFiltro = turno.medico.apellido.includes(apellidoMedicoFilter);
        const nombreMedicoFiltro = turno.medico.nombre.includes(nombreMedicoFilter);
        const DNIMedicoFiltro = turno.medico.documento.toString().includes(DNIMedicoFilter);
        const numeroSalaFiltro = turno.idSala.toString().includes(numeroSalaFilter);
        const fechaFiltro = turno.fechaTurno.toString().includes(fechaFilter);

        //Filtro por los pacientes cuyos examenes esten asignados al usuario actual
        var pacienteByUsuarioFiltro;
        if (misPacientesFilter) {
            {
                if (turno.idUsuario === usuario?.idUsuario) {
                    pacienteByUsuarioFiltro = true;
                    return true; // Detiene el mapeo cuando encuentra un paciente del usuario
                }
                return false; // Continúa buscando
            }
        } else{
            pacienteByUsuarioFiltro = false;
        }

        const pacienteByUsuarioFiltroCondition = !misPacientesFilter || (misPacientesFilter && pacienteByUsuarioFiltro);

        return pacienteByUsuarioFiltroCondition && apellidoPacienteFiltro && nombrePacienteFiltro && apellidoMedicoFiltro && nombreMedicoFiltro 
        && numeroSalaFiltro && fechaFiltro && DNIPacienteFiltro && DNIMedicoFiltro;
    });

    const limpiarFiltros = () => {
        setApellidoPacienteFilter('');
        setNombrePacienteFilter('');
        setDNIPacienteFilter('');
        setApellidoMedicoFilter('');
        setNombreMedicoFilter('');
        setDNIMedicoFilter('');
        setNumeroSalaFilter('');
        setFechaFilter('');
        setDate(undefined);
    }

    return (
        <div>
            <div className="overflow-x-auto py-4">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            {/* <th>id</th> */}
                            <th className="w-max-content px-4 text-center">Apellido Paciente:</th>
                            <th className="w-max-content px-4 text-center">Nombre Paciente:</th>
                            <th className="w-max-content px-4 text-center">Nro. Doc. Paciente:</th>
                            <th className="w-max-content px-4 text-center">Apellido Médico:</th>
                            <th className="w-max-content px-4 text-center">Nombre Médico:</th>
                            <th className="w-max-content px-4 text-center">Nro. Doc. Médico:</th>
                            <th className="w-max-content px-4 text-center">Sala:</th>
                            <th className="w-max-content px-4 text-center">Fecha de turno:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="border border-gray-300 rounded-md px-2 py-1 text-sm font-medium text-gray-600">
                                    <input
                                        type="text"
                                        value={apellidoPacienteFilter}
                                        onChange={(e) => setApellidoPacienteFilter(e.target.value)}
                                        placeholder="Filtrar por apellido">
                                    </input>
                                </div>
                            </td>
                            <td>
                                <div className="border border-gray-300 rounded-md px-2 py-1 text-sm font-medium text-gray-600">
                                    <input
                                        type="text"
                                        value={nombrePacienteFilter}
                                        onChange={(e) => setNombrePacienteFilter(e.target.value)}
                                        placeholder="Filtrar por nombre">
                                    </input>
                                </div>
                            </td>
                            <td>
                                <div className="border border-gray-300 rounded-md px-2 py-1 text-sm font-medium text-gray-600">
                                    <input
                                        type="text"
                                        value={DNIPacienteFilter}
                                        onChange={(e) => setDNIPacienteFilter(e.target.value)}
                                        placeholder="Filtrar por nro. doc.">
                                    </input>
                                </div>
                            </td>
                            <td>
                                <div className="border border-gray-300 rounded-md px-2 py-1 text-sm font-medium text-gray-600">
                                    <input
                                        type="text"
                                        value={apellidoMedicoFilter}
                                        onChange={(e) => setApellidoMedicoFilter(e.target.value)}
                                        placeholder="Filtrar por apellido">
                                    </input>
                                </div>
                            </td>
                            <td>
                                <div className="border border-gray-300 rounded-md px-2 py-1 text-sm font-medium text-gray-600">
                                    <input
                                        type="text"
                                        value={nombreMedicoFilter}
                                        onChange={(e) => setNombreMedicoFilter(e.target.value)}
                                        placeholder="Filtrar por nombre">
                                    </input>
                                </div>
                            </td>
                            <td>
                                <div className="border border-gray-300 rounded-md px-2 py-1 text-sm font-medium text-gray-600">
                                    <input
                                        type="text"
                                        value={DNIMedicoFilter}
                                        onChange={(e) => setDNIMedicoFilter(e.target.value)}
                                        placeholder="Filtrar por nro. doc.">
                                    </input>
                                </div>
                            </td>
                            <td>
                                <div className="border border-gray-300 rounded-md px-2 py-1 text-sm font-medium text-gray-600">
                                    <input
                                        type="text"
                                        value={numeroSalaFilter}
                                        onChange={(e) => setNumeroSalaFilter(e.target.value)}
                                        placeholder="Filtrar por sala">
                                    </input>
                                </div>
                            </td>
                            <td>
                                <div className="border border-gray-300 rounded-md px-2 py-1 text-sm font-medium text-gray-600">
                                    <DatePicker  date={date} setDate={setDate}/>
                                    <input
                                        type="hidden"
                                        value={fechaFilter}
                                        placeholder="Filtrar por fecha">
                                    </input>
                                </div>
                            </td>
                            <td>
                                <div className="center gap-5">
                                    <div className="center tooltip-label tooltip-container font-medium" data-tooltip="Limpiar filtros">
                                        <MdOutlineCleaningServices onClick={() => limpiarFiltros()} cursor="pointer" className='text-gray-500' size={25} />
                                    </div>
                                    <div>
                                        <label htmlFor="checkbox" className="tooltip-label tooltip-container" data-tooltip="Mis turnos">
                                            <input
                                                type="checkbox"
                                                id="checkboxMisTurnos"
                                                checked={misPacientesFilter}
                                                onChange={(e) => setMisPacientesFilter(e.target.checked)}
                                            />
                                        </label>
                                    </div>
                                </div>

                            </td>
                        </tr>
                        {filteredTurnos.map((turno) => <Turno key={turno.idTurno} turno={turno} />)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListTurno;