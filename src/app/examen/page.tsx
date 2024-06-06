import { getExamenesByPaciente } from "./examen";
import { obtenerUsuarioActual } from "../usuario/usuario";
import AddExamen from "@/components/AddExamen";
import ListExamenes from "@/components/ListExamenes";

interface PacienteExamen {
    params: Record<string, any>;
    searchParams: {
        idPaciente: string;
    };
}

export default async function examen(req: PacienteExamen) {
    const IdPaciente = req.searchParams.idPaciente;
    const usuario = await obtenerUsuarioActual();
    const examenes = await getExamenesByPaciente(IdPaciente);

    return (
        <main className="max-w-4kx mx-auto mt-4">
            <div className="text-center my-5 flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Examenes</h1>
                <AddExamen IdPaciente={Number(IdPaciente)} usuario={usuario}/>
            </div>
            <ListExamenes examenes={examenes} />
        </main>
    );
}