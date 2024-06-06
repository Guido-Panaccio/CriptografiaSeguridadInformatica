"use client";
import { IEstudio } from "@/types/estudio";
import Estudio from "./Estudio";


interface ListEstudioProps {
    estudios: IEstudio[] | null
}

const ListEstudio: React.FC<ListEstudioProps> = ({ estudios }) => {

    return (
        <>
            {estudios && estudios.length > 0 ? (
                estudios.map((estudio) => <Estudio key={estudio.idEstudio} estudio={estudio} />)
            ) : (
                <span
                    className="cursiva gris center marginTopSinDatos"
                >
                    {'Sin estudios'}
                </span>
                )
            }
        </>
    );
};

export default ListEstudio;