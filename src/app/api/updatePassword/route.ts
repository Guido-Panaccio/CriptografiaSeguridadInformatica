import { parse } from "cookie";
import { verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
let usuario;

export const POST = async (req: NextRequest) => {
	const cookies = parse(req.headers.get("Cookie") || "");
	const token = cookies.OutSiteJWT;

	if (!token) {
		return NextResponse.json({
			error: "No se encontró el token",
		});
	}

	const secret = process.env.JWT_SECRET || "";
	let username: string;

	try {
		const decoded: any = verify(token, secret);
		username = decoded.usuario;
	} catch (error) {
		return NextResponse.json({
			error: "Error al decodificar el token",
		});
	}

	const { newPassword } = await req.json();
	try {
		//actualizar la contraseña en la base de datos
		const idUsuario = await prisma.usuarios.findFirst({
			where: {
				username, //con key y value
			},
			select: {
				idUsuario: true,
			},
		});
		const updatedPassword =
			idUsuario &&
			(await prisma.usuarios.update({
				where: idUsuario, //podria ser null pero se verifica antes con el AND
				data: {
					contrasena: newPassword, //asegurate de que newPassword tenga un valor
				},
			}));

		if (!updatedPassword) {
			throw new Error("No se pudo actualizar la contraseña"); //usuario no encontrado
		}

		return NextResponse.json({
			success: true,
		});
	} catch (error) {
		return NextResponse.json(
			{
				error: "Error al actualizar la contraseña",
			},
			{ status: 500 }
		);
	}
};
