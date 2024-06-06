-- CreateTable
CREATE TABLE "Estudios" (
    "idEstudio" SERIAL NOT NULL,
    "resultado" VARCHAR(200),
    "examenesIdExamen" INTEGER NOT NULL,

    CONSTRAINT "Estudios_pkey" PRIMARY KEY ("idEstudio")
);

-- AddForeignKey
ALTER TABLE "Estudios" ADD CONSTRAINT "Estudios_examenesIdExamen_fkey" FOREIGN KEY ("examenesIdExamen") REFERENCES "Examenes"("idExamen") ON DELETE CASCADE ON UPDATE CASCADE;
