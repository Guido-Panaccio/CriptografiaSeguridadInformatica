-- AlterTable
ALTER TABLE "Usuarios" ADD COLUMN     "idRol" VARCHAR(3);

-- CreateTable
CREATE TABLE "Roles" (
    "idRol" VARCHAR(3) NOT NULL,
    "descripcion" VARCHAR(50) NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("idRol")
);

-- AddForeignKey
ALTER TABLE "Usuarios" ADD CONSTRAINT "Usuarios_idRol_fkey" FOREIGN KEY ("idRol") REFERENCES "Roles"("idRol") ON DELETE SET NULL ON UPDATE SET NULL;
