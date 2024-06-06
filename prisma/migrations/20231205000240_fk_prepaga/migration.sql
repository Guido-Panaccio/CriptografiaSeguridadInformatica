-- AddForeignKey
ALTER TABLE "Pacientes" ADD CONSTRAINT "Pacientes_idPrepaga_fkey" FOREIGN KEY ("idPrepaga") REFERENCES "TiposPrepagas"("codigoPrepaga") ON DELETE SET NULL ON UPDATE SET NULL;
