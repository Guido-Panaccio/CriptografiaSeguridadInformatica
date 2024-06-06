"use client"

import { Stethoscope } from "lucide-react";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from 'next/navigation';
import { Button } from "./ui/button";

const NavbarMainPage = () => {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch('/api/logout');
        router.push('/home'); 
    };

    return (
		<div className="bg-zinc-100 py-2 border-s-zinc-200 fixed w-full z-10 top-0">
			<div className="container flex items-center justify-between h-10">
                <Link href="/mainPage">
                    <Stethoscope/>
                </Link>
                <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-none">Turnos</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <Link href="/turnos">
                            <DropdownMenuItem>Administrar Turnos</DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-none">Pacientes</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <Link href="/pacientes">
                            <DropdownMenuItem>Administrar Pacientes</DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-none">Prepagas</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <Link href="/tiposPrepagas">
                            <DropdownMenuItem>Administrar Prepagas</DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-none">Exámenes</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <Link href="/tiposExamenes">
                            <DropdownMenuItem>Administrar Exámenes</DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-none">Salas</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <Link href="/tiposSalas">
                            <DropdownMenuItem>Administrar Salas</DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Link href="/administrarCuenta">
                    Mi Cuenta
                </Link>
                <Button onClick={handleLogout}>
                   Cerrar Sesión
                </Button>
            </div>
        </div>
    );
};
export default NavbarMainPage;
