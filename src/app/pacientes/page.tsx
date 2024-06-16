import { getAllPacientes } from "./pacientes";
import AddPaciente from "@/components/AddPacientes";
import ListPaciente from "@/components/ListPaciente";
import { obtenerUsuarioActual } from "../usuario/usuario";
import { ToastContainer } from "react-toastify";

export default async function CRUDPacientes() {

    const pacientes = await getAllPacientes();
    const usuario = await obtenerUsuarioActual();

    return (
        <main className="max-w-4kx mx-auto mt-4">
            <div className="text-center my-5 flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Pacientes</h1>
                <AddPaciente />
                <ToastContainer />
            </div>
            <ListPaciente pacientes={pacientes} usuario={usuario} />
        </main>
    );
}