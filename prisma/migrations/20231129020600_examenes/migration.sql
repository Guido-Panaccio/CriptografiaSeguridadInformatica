-- CreateTable
CREATE TABLE "Examenes" (
    "idExamen" SERIAL NOT NULL,
    "idPaciente" INTEGER NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "tipoExamen" VARCHAR(5) NOT NULL,
    "observaciones" VARCHAR(200),
    "fechaRealizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Examenes_pkey" PRIMARY KEY ("idExamen")
);

-- AddForeignKey
ALTER TABLE "Examenes" ADD CONSTRAINT "Examenes_idPaciente_fkey" FOREIGN KEY ("idPaciente") REFERENCES "Pacientes"("idPaciente") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Examenes" ADD CONSTRAINT "Examenes_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuarios"("idUsuario") ON DELETE CASCADE ON UPDATE CASCADE;
