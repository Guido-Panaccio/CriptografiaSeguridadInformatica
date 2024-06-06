-- CreateTable
CREATE TABLE "TiposExamenes" (
    "tipoExamen" VARCHAR(5) NOT NULL,
    "descripcion" VARCHAR(50) NOT NULL,

    CONSTRAINT "TiposExamenes_pkey" PRIMARY KEY ("tipoExamen")
);

-- AddForeignKey
ALTER TABLE "Examenes" ADD CONSTRAINT "Examenes_tipoExamen_fkey" FOREIGN KEY ("tipoExamen") REFERENCES "TiposExamenes"("tipoExamen") ON DELETE RESTRICT ON UPDATE CASCADE;
