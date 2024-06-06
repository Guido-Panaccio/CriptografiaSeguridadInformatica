"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
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
	nuevaContrasenia: z
		.string()
		.min(6, "La contraseña debe tener al menos 6 caracteres"),
	repetirContrasenia: z
		.string()
		.min(6, "La contraseña debe tener al menos 6 caracteres"),
});

const ChangePasswordForm = () => {
	const [errorMessage, setErrorMessage] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [repetirContrasenia, setRepetirContrasenia] = useState("");

	const handleSave = async () => {
		if (newPassword === repetirContrasenia) {
			try {
				const response = await axios.post("/api/updatePassword", {
					newPassword,
				});

				if (response.status === 200 && !response?.data?.error) {
					toast.success("Contraseña cambiada correctamente!", {
						position: toast.POSITION.TOP_RIGHT,
					});
				} else {
					console.error(
						"Hubo un problema al cambiar la contraseña:",
						response.data
					);
					toast.error("Hubo un problema al cambiar la contraseña");
				}
			} catch (error) {
				console.error("Error al cambiar la contraseña:", error);
				toast.error("Error al cambiar la contraseña");
			}
		} else {
			setErrorMessage("Las contraseñas no coinciden");
		}
	};

	const form = useForm<z.infer<typeof FormSchema>>({
		defaultValues: {
			nuevaContrasenia: "",
			repetirContrasenia: "",
		},
		resolver: zodResolver(FormSchema),
	});

	const onSubmit = (values: z.infer<typeof FormSchema>) => {
		console.log(values);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-80">
				<FormField
					control={form.control}
					name="nuevaContrasenia"
					render={({ field }) => (
						<FormItem className="mb-5">
							<FormLabel>Nueva Contraseña</FormLabel>
							<FormControl>
								<Input
									placeholder="Nueva Contraseña"
									type="password"
									{...field}
									onChange={(e) => {
										field.onChange(e);
										setNewPassword(e.target.value);
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="repetirContrasenia"
					render={({ field }) => (
						<FormItem className="mb-5">
							<FormLabel>Repetir Nueva Contraseña</FormLabel>
							<FormControl>
								<Input
									placeholder="Repetir Nueva Contraseña"
									type="password"
									{...field}
									onChange={(e) => {
										field.onChange(e);
										setRepetirContrasenia(e.target.value);
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
				{errorMessage && <div className="error-message">{errorMessage}</div>}
			</form>
		</Form>
	);
};

export default ChangePasswordForm;
