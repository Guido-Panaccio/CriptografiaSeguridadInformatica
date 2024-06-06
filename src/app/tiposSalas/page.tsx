import { getAllSalas } from "./tiposSalas";
import ListTurnos from "@/components/ListTurnos";
import { obtenerUsuarioActual } from "../usuario/usuario";
import AddSala from "@/components/AddSala";
import ListSalas from "@/components/listSalas";


export default async function CRUDsalas() {

    var salas = await getAllSalas();
    const usuario = await obtenerUsuarioActual();
    return (
        <main className="max-w-4kx mx-auto mt-4">
        <div className="text-center my-5 flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Salas</h1>
            <AddSala/> {/* Use the AddSala component */}
        </div>
        <ListSalas salas={salas} usuario={usuario}/>
        </main>
	);
}
