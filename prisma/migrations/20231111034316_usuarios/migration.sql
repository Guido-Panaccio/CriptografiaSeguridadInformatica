-- CreateTable
CREATE TABLE "Usuarios" (
    "idUsuario" SERIAL NOT NULL,
    "apellido" VARCHAR(50) NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "tipoDocumento" VARCHAR(3) NOT NULL,
    "documento" INTEGER NOT NULL,
    "direccion" VARCHAR(100),
    "telefono" VARCHAR(50),
    "contrasena" VARCHAR(255),

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("idUsuario")
);
