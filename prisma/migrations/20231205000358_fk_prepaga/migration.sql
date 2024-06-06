/*
  Warnings:

  - The primary key for the `TiposPrepagas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `codigoPrepaga` on the `TiposPrepagas` table. All the data in the column will be lost.
  - Added the required column `idPrepaga` to the `TiposPrepagas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pacientes" DROP CONSTRAINT "Pacientes_idPrepaga_fkey";

-- AlterTable
ALTER TABLE "TiposPrepagas" DROP CONSTRAINT "TiposPrepagas_pkey",
DROP COLUMN "codigoPrepaga",
ADD COLUMN     "idPrepaga" VARCHAR(5) NOT NULL,
ADD CONSTRAINT "TiposPrepagas_pkey" PRIMARY KEY ("idPrepaga");

-- AddForeignKey
ALTER TABLE "Pacientes" ADD CONSTRAINT "Pacientes_idPrepaga_fkey" FOREIGN KEY ("idPrepaga") REFERENCES "TiposPrepagas"("idPrepaga") ON DELETE SET NULL ON UPDATE SET NULL;
