-- CreateTable
CREATE TABLE "Pacientes" (
    "idPaciente" SERIAL NOT NULL,
    "apellido" VARCHAR(50) NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "tipoDocumento" VARCHAR(3) NOT NULL,
    "documento" INTEGER NOT NULL,
    "direccion" VARCHAR(100),
    "telefono" VARCHAR(50),
    "ocupacion" VARCHAR(50),
    "idPrepaga" VARCHAR(5),

    CONSTRAINT "Pacientes_pkey" PRIMARY KEY ("idPaciente")
);
