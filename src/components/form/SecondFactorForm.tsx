"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { verificarUsuario } from "@/app/(auth)/login/login";
import { useState } from 'react';
import {useRouter} from 'next/navigation'

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
    codigo:z.string()
    .min(6, "El codigo tiene 6 caracteres"),
	email: z.string().min(1, "Se requiere un email").email("Email invalido"),
	password: z
		.string()
		.min(1, "Se requiere una contraseña")
		.min(8, "La contraseña debe tener al menos 8 caracteres"),
});

const SecondFactorForm = () => {

	const {push} = useRouter()
	const [errorMessage, setErrorMessage] = useState('');

	const comprobarUsuario = async (values: z.infer<typeof FormSchema>) => {
		var respuesta = await verificarUsuario(values.email, values.password,values.codigo);
		if(respuesta === 'Credenciales incorrectas'){
			setErrorMessage(respuesta);
		}else{
			setErrorMessage('');
			push('/mainPage')
		}
		
	};

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});

	const onSubmit = (values: z.infer<typeof FormSchema>) => {
		console.log(values);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-80">
				<div className=" space-y-3">
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
										placeholder="Ingresar contraseña"
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
						name="codigo"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Codigo</FormLabel>
								<FormControl>
									<Input
										placeholder="123456"
										type="text"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button className="w-full mt-6 " name="btnIniciarSesion" type="submit" onClick={form.handleSubmit(comprobarUsuario)}>
					Inicia sesión
				</Button>
				{errorMessage && (
				<div className="error-message">
					{errorMessage}
				</div>
				)}
			</form>
		</Form>
	);
};

export default SecondFactorForm;