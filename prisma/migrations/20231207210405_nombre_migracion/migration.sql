-- CreateTable
CREATE TABLE "TiposSalas" (
    "idSala" SERIAL NOT NULL,
    "descripcion" VARCHAR(50) NOT NULL,

    CONSTRAINT "TiposSalas_pkey" PRIMARY KEY ("idSala")
);

-- CreateTable
CREATE TABLE "Medicos" (
    "idMedico" SERIAL NOT NULL,
    "apellido" VARCHAR(50) NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "tipoDocumento" VARCHAR(3) NOT NULL,
    "documento" INTEGER NOT NULL,
    "direccion" VARCHAR(100),
    "telefono" VARCHAR(50),
    "especialidad" VARCHAR(50) NOT NULL,
    "idPrepaga" VARCHAR(5),

    CONSTRAINT "Medicos_pkey" PRIMARY KEY ("idMedico")
);

-- CreateTable
CREATE TABLE "Turnos" (
    "idTurno" SERIAL NOT NULL,
    "idPaciente" INTEGER NOT NULL,
    "idMedico" INTEGER NOT NULL,
    "idSala" INTEGER NOT NULL,
    "fechaTurno" TIMESTAMP(3) NOT NULL,
    "idUsuario" INTEGER NOT NULL,

    CONSTRAINT "Turnos_pkey" PRIMARY KEY ("idTurno")
);

-- AddForeignKey
ALTER TABLE "Medicos" ADD CONSTRAINT "Medicos_idPrepaga_fkey" FOREIGN KEY ("idPrepaga") REFERENCES "TiposPrepagas"("idPrepaga") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "Turnos" ADD CONSTRAINT "Turnos_idPaciente_fkey" FOREIGN KEY ("idPaciente") REFERENCES "Pacientes"("idPaciente") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turnos" ADD CONSTRAINT "Turnos_idMedico_fkey" FOREIGN KEY ("idMedico") REFERENCES "Medicos"("idMedico") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turnos" ADD CONSTRAINT "Turnos_idSala_fkey" FOREIGN KEY ("idSala") REFERENCES "TiposSalas"("idSala") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turnos" ADD CONSTRAINT "Turnos_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuarios"("idUsuario") ON DELETE CASCADE ON UPDATE CASCADE;
