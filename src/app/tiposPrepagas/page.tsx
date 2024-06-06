import ListPrepaga from "@/components/ListPrepaga";
import { getAllPrepagas } from "./tiposPrepagas";
import AddPrepaga from "@/components/AddPrepaga";


export default async function CRUDPrepagas() {

    var prepagas = await getAllPrepagas();

    return (
        <main className="max-w-4kx mx-auto mt-4">
        <div className="text-center my-5 flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Prepagas</h1>
            <AddPrepaga/>
        </div>
        <ListPrepaga prepagas={prepagas}/>
        </main>
	);
}