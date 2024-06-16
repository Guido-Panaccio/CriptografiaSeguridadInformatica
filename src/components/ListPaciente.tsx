"use client";
import { IPaciente } from "@/types/pacientes";
import React, { useState } from "react";
import Paciente from "./Paciente";
import { MdOutlineCleaningServices } from "react-icons/md";
import { IUsuario } from "@/types/usuario";

interface ListPacienteProps {
    pacientes: IPaciente[],
    usuario: IUsuario
}

const ListPaciente: React.FC<ListPacienteProps> = ({ pacientes, usuario }) => {
    const [apellidoFilter, setApellidoFilter] = useState<string>("");
    const [nombreFilter, setNombreFilter] = useState<string>("");
    const [tipoDocumentoFilter, setTipoDocumentoFilter] = useState<string>("");
    const [documentoFilter, setDocumentoFilter] = useState<string>("");
    const [direccionFilter, setDireccionFilter] = useState<string | null>("");
    const [direccionNullFilter, setDireccionNullFilter] = useState<boolean>(false);
    const [isInputDireccionEnabled, setIsInputDireccionEnabled] = useState<boolean>(true); // Establece el estado inicial como habilitado
    const [telefonoFilter, setTelefonoFilter] = useState<string | null>("");
    const [telefonoNullFilter, setTelefonoNullFilter] = useState<boolean>(false);
    const [isInputTelefonoEnabled, setIsInputTelefonoEnabled] = useState<boolean>(true); // Establece el estado inicial como habilitado
    const [ocupacionFilter, setOcupacionFilter] = useState<string | null>("");
    const [ocupacionNullFilter, setOcupacionNullFilter] = useState<boolean>(false);
    const [isInputOcupacionEnabled, setIsInputOcupacionEnabled] = useState<boolean>(true); // Establece el estado inicial como habilitado
    const [prepagaFilter, setPrepagaFilter] = useState<string | null>("");
    const [prepagaNullFilter, setPrepagaNullFilter] = useState<boolean>(false);
    const [isInputPrepagaEnabled, setIsInputPrepagaEnabled] = useState<boolean>(true); // Establece el estado inicial como habilitado
    const [misPacientesFilter, setMisPacientesFilter] = useState<boolean>(false);



    // Lista de todos pacientes que recibimos de la base de datos
    const pacientesFromDatabase: IPaciente[] = pacientes;

    // Filtro para los pacientes
    const filteredPacientes = pacientesFromDatabase.filter(paciente => {
        const apellidoFiltro = paciente.apellido.includes(apellidoFilter);
        const nombreFiltro = paciente.nombre.includes(nombreFilter);
        const tipoDocumentoFiltro = paciente.tipoDocumento.includes(tipoDocumentoFilter);
        const documentoFiltro = paciente.documento.toString().includes(documentoFilter);

        // Filtro de dirección
        var direccionFiltro = !direccionFilter ? true : paciente.direccion?.includes(direccionFilter as string);
        var direccionNullFiltro;
        if (direccionNullFilter) {
            direccionNullFiltro = paciente.direccion === null;
            direccionFiltro = false;
        }

        //Filtro de teléfono
        var telefonoFiltro = !telefonoFilter ? true : paciente.telefono?.includes(telefonoFilter as string);
        var telefonoNullFiltro;
        if (telefonoNullFilter) {
            telefonoNullFiltro = paciente.telefono === null;
            telefonoFiltro = false;
        }

        //Filtro de Ocupación
        var ocupacionFiltro = !ocupacionFilter ? true : paciente.ocupacion?.includes(ocupacionFilter as string);
        var ocupacionNullFiltro;
        if (ocupacionNullFilter) {
            ocupacionNullFiltro = paciente.ocupacion === null;
            ocupacionFiltro = false;
        }

        //Filtro de Prepaga
        var prepagaFiltro = !prepagaFilter ? true : paciente.idPrepaga?.includes(prepagaFilter as string) || paciente.tipoPrepaga?.descripcion.includes(prepagaFilter as string);
        var prepagaNullFiltro;
        if (prepagaNullFilter) {
            prepagaNullFiltro = paciente.idPrepaga === null;
            prepagaFiltro = false;
        }

        //Filtro por los pacientes cuyos examenes esten asignados al usuario actual
        var pacienteByUsuarioFiltro;
        if (misPacientesFilter) {
            {
                paciente.Examenes && paciente.Examenes.length > 0 && paciente.Examenes.some(examen => {
                    if (examen.idUsuario === usuario.idUsuario) {
                        pacienteByUsuarioFiltro = true;
                        return true; // Detiene el mapeo cuando encuentra un paciente del usuario
                    }
                    return false; // Continúa buscando
                })
            }
        }else{
            pacienteByUsuarioFiltro = false;
        }

        const pacienteByUsuarioFiltroCondition = !misPacientesFilter || (misPacientesFilter && pacienteByUsuarioFiltro);

        return apellidoFiltro && nombreFiltro && tipoDocumentoFiltro && documentoFiltro && (direccionFiltro || direccionNullFiltro) && (telefonoFiltro || telefonoNullFiltro) && (ocupacionFiltro || ocupacionNullFiltro) && (prepagaFiltro || prepagaNullFiltro) && pacienteByUsuarioFiltroCondition;
    });

    const limpiarFiltros = () => {
        setApellidoFilter('');
        setNombreFilter('');
        setTipoDocumentoFilter('');
        setDocumentoFilter('');
        setDireccionFilter('');
        setDireccionNullFilter(false);
        setTelefonoFilter('');
        setTelefonoNullFilter(false);
        setOcupacionFilter('');
        setOcupacionNullFilter(false);
        setPrepagaFilter('');
        setPrepagaNullFilter(false);
    }

    const filtrarByNULLDireccion = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDireccionFilter('');
        setDireccionNullFilter(e.target.checked)
        setIsInputDireccionEnabled(!e.target.checked);
    }

    const filtrarByNULLTelefono = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTelefonoFilter('');
        setTelefonoNullFilter(e.target.checked)
        setIsInputTelefonoEnabled(!e.target.checked);
    }

    const filtrarByNULLOcupacion = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOcupacionFilter('');
        setOcupacionNullFilter(e.target.checked)
        setIsInputOcupacionEnabled(!e.target.checked);
    }

    const filtrarByNULLPrepaga = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrepagaFilter('');
        setPrepagaNullFilter(e.target.checked)
        setIsInputPrepagaEnabled(!e.target.checked);
    }

    return (
        <div>
            <div className="overflow-x-auto py-4">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="w-max-content px-4 text-center">Apellido</th>
                            <th className="w-max-content px-4 text-center">Nombre</th>
                            <th className="w-max-content px-4 text-center">Tipo Documento</th>
                            <th className="w-max-content px-4 text-center">Documento</th>
                            <th className="w-max-content px-4 text-center">Dirección</th>
                            <th className="w-max-content px-4 text-center">Teléfono</th>
                            <th className="w-max-content px-4 text-center">Ocupación</th>
                            <th className="w-max-content px-4 text-center">Prepaga</th>
                            <th className="w-max-content px-4 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="border border-gray-300 rounded-md px-2 py-1 text-sm font-medium text-gray-600">
                                    <input
                                        type="text"
                                        value={apellidoFilter}
                                        onChange={(e) => setApellidoFilter(e.target.value)}
                                        placeholder="Filtrar por apellido">
                                    </input>
                                </div>
                            </td>
                            <td>
                                <div className="border border-gray-300 rounded-md px-2 py-1 text-sm font-medium text-gray-600">
                                    <input
                                        type="text"
                                        value={nombreFilter}
                                        onChange={(e) => setNombreFilter(e.target.value)}
                                        placeholder="Filtrar por nombre">
                                    </input>
                                </div>
                            </td>
                            <td>
                                <select
                                    value={tipoDocumentoFilter}
                                    onChange={(e) => setTipoDocumentoFilter(e.target.value)}
                                    className="border border-gray-300 rounded-md px-2 py-1 text-sm font-medium text-gray-600">
                                    <option value="">No aplica filtro</option>
                                    <option value="DNI">DNI</option>
                                    <option value="PAS">Pasaporte</option>
                                </select>
                            </td>
                            <td>
                                <div className="border border-gray-300 rounded-md px-2 py-1 text-sm font-medium text-gray-600">
                                    <input
                                        type="text"
                                        value={documentoFilter}
                                        onChange={(e) => setDocumentoFilter(e.target.value)}
                                        placeholder="Filtrar por documento">
                                    </input>
                                </div>
                            </td>
                            <td>
                                <div className="border border-gray-300 rounded-md px-2 py-1 text-sm font-medium text-gray-600">
                                    <input
                                        type="text"
                                        value={direccionFilter || ''}
                                        onChange={(e) => setDireccionFilter(e.target.value || null)}
                                        placeholder="Filtrar por dirección"
                                        disabled={!isInputDireccionEnabled}>
                                    </input>
                                    <label htmlFor="checkbox" className="tooltip-label tooltip-container" data-tooltip="Sin dirección">
                                        <input
                                            type="checkbox"
                                            id="checkboxDireccion"
                                            checked={direccionNullFilter}
                                            onChange={(e) => filtrarByNULLDireccion(e)}
                                        />
                                    </label>
                                </div>
                            </td>
                            <td>
                                <div className="border border-gray-300 rounded-md px-2 py-1 text-sm font-medium text-gray-600">
                                    <input
                                        type="text"
                                        value={telefonoFilter || ''}
                                        onChange={(e) => setTelefonoFilter(e.target.value || null)}
                                        placeholder="Filtrar por teléfono"
                                        disabled={!isInputTelefonoEnabled}>
                                    </input>
                                    <label htmlFor="checkbox" className="tooltip-label tooltip-container" data-tooltip="Sin teléfono">
                                        <input
                                            type="checkbox"
                                            id="checkboxTelefono"
                                            checked={telefonoNullFilter}
                                            onChange={(e) => filtrarByNULLTelefono(e)}
                                        />
                                    </label>
                                </div>
                            </td>
                            <td>
                                <div className="border border-gray-300 rounded-md px-2 py-1 text-sm font-medium text-gray-600">
                                    <input
                                        type="text"
                                        value={ocupacionFilter || ''}
                                        onChange={(e) => setOcupacionFilter(e.target.value || null)}
                                        placeholder="Filtrar por ocupación"
                                        disabled={!isInputOcupacionEnabled}>
                                    </input>
                                    <label htmlFor="checkbox" className="tooltip-label tooltip-container" data-tooltip="Sin ocupación">
                                        <input
                                            type="checkbox"
                                            id="checkboxOcupacion"
                                            checked={ocupacionNullFilter}
                                            onChange={(e) => filtrarByNULLOcupacion(e)}
                                        />
                                    </label>
                                </div>
                            </td>
                            <td>
                                <div className="border border-gray-300 rounded-md px-2 py-1 text-sm font-medium text-gray-600">
                                    <input
                                        type="text"
                                        value={prepagaFilter || ''}
                                        onChange={(e) => setPrepagaFilter(e.target.value || null)}
                                        placeholder="Filtrar por prepaga"
                                        disabled={!isInputPrepagaEnabled}>
                                    </input>
                                    <label htmlFor="checkbox" className="tooltip-label tooltip-container" data-tooltip="Sin prepaga">
                                        <input
                                            type="checkbox"
                                            id="checkboxPrepaga"
                                            checked={prepagaNullFilter}
                                            onChange={(e) => filtrarByNULLPrepaga(e)}
                                        />
                                    </label>
                                </div>
                            </td>
                            <td>
                                <div className="center gap-5">
                                    <div className="center tooltip-label tooltip-container font-medium" data-tooltip="Limpiar filtros">
                                        <MdOutlineCleaningServices onClick={() => limpiarFiltros()} cursor="pointer" className='text-gray-500' size={25} />
                                    </div>
                                    <div>
                                        <label htmlFor="checkbox" className="tooltip-label tooltip-container" data-tooltip="Mis pacientes">
                                            <input
                                                type="checkbox"
                                                id="checkboxMisPacientes"
                                                checked={misPacientesFilter}
                                                onChange={(e) => setMisPacientesFilter(e.target.checked)}
                                            />
                                        </label>
                                    </div>
                                </div>

                            </td>
                        </tr>
                        {filteredPacientes.map((paciente) => <Paciente key={paciente.idPaciente} paciente={paciente} usuario={usuario}/>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListPaciente;