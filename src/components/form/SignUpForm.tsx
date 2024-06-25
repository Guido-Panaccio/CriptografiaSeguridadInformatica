"use client";
import { insertarUsuario } from "@/app/(auth)/registro/registro";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import * as z from "zod";
import { ComboBox } from "../ui/combo";
import {useRouter} from 'next/navigation'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
const FormSchema = z
	.object({
		apellido: z.string().min(1, "Se requiere un apellido de usuario").max(50),
		nombre: z.string().min(1, "Se requiere un nombre de usuario").max(50),
		tipoDocumento: z.string().max(50),
		documento: z
			.string()
			.min(1, "Se requiere un documento")
			.refine((value) => /^[0-9]*$/.test(value), {
				message: "El documento debe ser un número",
			}),
		email: z.string().min(1, "Se requiere un email").email("Email invalido"),
		password: z
			.string()
			.min(1, "Se requiere una contraseña")
			.min(8, "La contraseña debe tener al menos 8 caracteres"),
		confirmPassword: z
			.string()
			.min(1, "Se requiere una contraseña")
			.min(8, "La contraseña debe tener al menos 8 caracteres"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "Las contraseñas no coinciden",
	});

const SignUpForm = () => {
	const [errorMessage, setErrorMessage] = useState("");
	const {push} = useRouter();

	const registrarUsuario = async (values: z.infer<typeof FormSchema>) => {
		try {
			var respuesta = await insertarUsuario(values);

			if (respuesta === "El email ingresado ya se encuentra en uso") {
				setErrorMessage(respuesta);
			} else {
				setErrorMessage("");
				toast.success("Usuario registrado correctamente!", {
					position: toast.POSITION.TOP_RIGHT,
				});
				await new Promise(resolve => setTimeout(resolve, 3000));
				push('/mainPage');
			}
		} catch (error) {
			console.error("Error registering user:", error);
			setErrorMessage("Hubo un error al registrar el usuario");
		}
	};

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			apellido: "",
			nombre: "",
			tipoDocumento: "DNI",
			documento: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = (values: z.infer<typeof FormSchema>) => {
		console.log(values);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-80">
				<div className="space-y-1">
					<FormField
						control={form.control}
						name="apellido"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Apellido</FormLabel>
								<FormControl>
									<Input
										placeholder="Apellido del usuario"
										type="apellido"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="nombre"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nombre</FormLabel>
								<FormControl>
									<Input
										placeholder="Nombre del usuario"
										type="nombre"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="tipoDocumento"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tipo de Documento</FormLabel>
								<FormControl>
									<ComboBox {...field}>
										<option value="DNI">DNI</option>
										<option value="PASS">Pasaporte</option>
									</ComboBox>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="documento"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Documento</FormLabel>
								<FormControl>
									<Input
										placeholder="Ingrese su documento"
										type="documento"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder="mail@example.com"
										type="email"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Contraseña</FormLabel>
								<FormControl>
									<Input
										placeholder="Ingresar Contraseña"
										type="password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirmar Contraseña</FormLabel>
								<FormControl>
									<Input
										placeholder="Repetir contraseña"
										type="password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button
					className="w-full mt-6 "
					name="btnRegistrarse"
					type="submit"
					onClick={form.handleSubmit(registrarUsuario)}
				>
					Registrarse
				</Button>
				{errorMessage && <div className="error-message">{errorMessage}</div>}
				<ToastContainer /> {}{" "}
			</form>
			<div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400 ">
				o
			</div>
			<p className="text-center text-sm text-gray-600 mt-2">
				Si ya tenes cuenta{" "}
				<a className="text-blue-600 hover:underline" href="/sign-in">
					inicia sesión
				</a>
			</p>
		</Form>
	);
};

export default SignUpForm;
