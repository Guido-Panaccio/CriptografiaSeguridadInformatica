import { parse } from "cookie";
import { verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export const POST = async (req: NextRequest) => {
	const { direccion, telefono } = await req.json();

	const cookies = parse(req.headers.get("Cookie") || "");
	const token = cookies.OutSiteJWT;

	if (!token) {
		return NextResponse.json({
			error: "No se encontró el token",
		});
	}

	const secret = process.env.JWT_SECRET || "";
	let usuario;

	try {
		const decoded: any = verify(token, secret);
		usuario = decoded.usuario;
	} catch (error) {
		return NextResponse.json({
			error: "Error al decodificar el token",
		});
	}

	try {
		const user = await prisma.usuarios.findFirst({
			where: {
				username: usuario,
			},
		});

		if (!user) {
			return NextResponse.json({
				error: "No se encontró el usuario para actualizar",
			});
		}

		const updateData: any = {};
		if (direccion) updateData.direccion = direccion;
		if (telefono) updateData.telefono = telefono;

		const updatedUser = await prisma.usuarios.update({
			where: {
				idUsuario: user.idUsuario,
			},
			data: updateData,
		});

		return NextResponse.json(updatedUser);
	} catch (error) {
		console.error(
			`Error: ${error instanceof Error ? error.message : "Unknown error"}`
		);
		return NextResponse.json({
			error: `Error al actualizar el usuario: ${
				error instanceof Error ? error.message : "Unknown error"
			}`,
		});
	}
};
