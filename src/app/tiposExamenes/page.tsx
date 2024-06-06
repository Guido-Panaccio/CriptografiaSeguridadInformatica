import AddTipoExamen from "@/components/AddTipoExamen";
import { getAllTiposExamenes } from "./tiposExamenes";
import ListTipoExamen from "@/components/ListTiposExamen";


export default async function CRUDTiposExamen() {

    var tiposExamen = await getAllTiposExamenes();

    return (
        <main className="max-w-4kx mx-auto mt-4">
        <div className="text-center my-5 flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Tipos de Examenes</h1>
            <AddTipoExamen/>
        </div>
        <ListTipoExamen tiposExamen={tiposExamen}/>
        </main>
	);
}