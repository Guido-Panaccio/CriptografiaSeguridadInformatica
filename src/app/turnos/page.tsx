import { getAllturnos } from "./turnos";
// import AddTurno from "@/components/Addturnos";
import ListTurnos from "@/components/ListTurnos";
import { obtenerUsuarioActual } from "../usuario/usuario";
import AddTurno from "@/components/AddTurno";


export default async function CRUDturnos() {

    var turnos = await getAllturnos();
    const usuario = await obtenerUsuarioActual();

    return (
        <main className="max-w-4kx mx-auto mt-4">
        <div className="text-center my-5 flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Turnos</h1>
            <AddTurno/>
        </div>
        <ListTurnos turnos={turnos} usuario={usuario}/>
        </main>
	);
}
