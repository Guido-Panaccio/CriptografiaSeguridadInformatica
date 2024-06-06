import { parse } from "cookie";
import { verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export const GET = async (req: NextRequest) => {
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
			select: {
				apellido: true,
				nombre: true,
				documento: true,
				direccion: true,
				telefono: true,
				username: true,
			},
		});

		if (user) {
			console.log(user);
			return NextResponse.json(user);
		} else {
			return NextResponse.json({
				error: "Usuario no encontrado",
			});
		}
	} catch (error) {
		return NextResponse.json({
			error: "Error al buscar al usuario",
		});
	}
};
