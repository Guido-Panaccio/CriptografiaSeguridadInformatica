"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as z from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";

const FormSchema = z.object({
	nombre: z.string().min(1, "Se requiere un nombre"),
	apellido: z.string().min(1, "Se requiere un apellido"),
	documento: z.string().min(1, "Se requiere un documento"),
	direccion: z.string().min(1, "Se requiere una dirección"),
	telefono: z.string().min(1, "Se requiere un teléfono"), //validar con .max char
});

const MiAccountForm = () => {
	const { push } = useRouter();
	const [errorMessage, setErrorMessage] = useState("");
	const [direccion, setDireccion] = useState("");
	const [telefono, setTelefono] = useState("");
	const router = useRouter();

	const handlePasswordChangeClick = () => {
		router.push("/cambiarPassword");
	};

	const handleSave = async () => {
		if (direccion || telefono) {
			try {
				const response = await axios.post("/api/updateUserInfo", {
					direccion,
					telefono,
				});
				if (response.status === 200 && !response?.data?.error) {
					console.log("Datos actualizados correctamente:", response.data);
					toast.success("Datos actualizados correctamente!", {
						position: toast.POSITION.TOP_RIGHT,
					});
				} else {
					console.log(
						"Hubo un problema al actualizar los datos:",
						response.data
					);
					toast.error("Hubo un problema al actualizar los datos");
				}
			} catch (error) {
				console.error("Error al actualizar los datos:", error);
				toast.error("Error al actualizar los datos");
			}
		}
	};
	const form = useForm<z.infer<typeof FormSchema>>({
		defaultValues: {
			nombre: "",
			apellido: "",
			documento: "",
			direccion: "",
			telefono: "",
		},
		resolver: zodResolver(FormSchema),
	});

	useEffect(() => {
		fetch("http://localhost:3000/api/getUserData", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				// Puedes añadir más encabezados si es necesario
			},
		})
			.then((res) => res.json())
			.then((data) => {
				form.setValue("nombre", data.nombre);
				form.setValue("apellido", data.apellido);
				form.setValue("documento", data.documento);
				form.setValue("direccion", data.direccion || "");
				form.setValue("telefono", data.telefono || "");
			});
	}, [form]);

	const onSubmit = (values: z.infer<typeof FormSchema>) => {
		console.log(values);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-80">
				<div className="flex space-x-3">
					<FormField
						control={form.control}
						name="nombre"
						render={({ field }) => (
							<FormItem className="mb-5">
								<FormLabel>Nombre</FormLabel>

								<FormControl>
									<Input placeholder="Nombre" type="text" {...field} readOnly />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="apellido"
						render={({ field }) => (
							<FormItem className="mb-5">
								<FormLabel>Apellido</FormLabel>
								<FormControl>
									<Input
										placeholder="Apellido"
										type="text"
										{...field}
										readOnly
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name="documento"
					render={({ field }) => (
						<FormItem className="mb-5">
							<FormLabel>Documento</FormLabel>
							<FormControl>
								<Input
									placeholder="Documento"
									type="text"
									{...field}
									readOnly
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="direccion"
					render={({ field }) => (
						<FormItem className="mb-5">
							<FormLabel>Dirección</FormLabel>
							<FormControl>
								<Input
									placeholder="Dirección"
									type="text"
									{...field}
									onChange={(e) => {
										field.onChange(e);
										setDireccion(e.target.value);
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="telefono"
					render={({ field }) => (
						<FormItem className="mb-5">
							<FormLabel>Teléfono</FormLabel>
							<FormControl>
								<Input
									placeholder="Teléfono"
									type="text"
									{...field}
									onChange={(e) => {
										field.onChange(e);
										setTelefono(e.target.value); // Aquí estaba el error
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					className="w-full mt-6"
					name="btnGuardar"
					type="button"
					onClick={handleSave}
				>
					Guardar
				</Button>

				<Button
					className="w-full mt-6"
					name="btnCambiarContrasenia"
					type="button"
					onClick={handlePasswordChangeClick}
				>
					Cambiar contraseña
				</Button>
				{errorMessage && <div className="error-message">{errorMessage}</div>}
			</form>
		</Form>
	);
};

export default MiAccountForm;
