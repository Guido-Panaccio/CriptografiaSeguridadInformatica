import { Stethoscope } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

const NavbarToSignIn = () => {
	return (
		<div className="bg-zinc-100 py-2 border-s-zinc-200 fixed w-full z-10 top-0">
			<div className="container flex items-center justify-between">
				<Link href="/home">
					<Stethoscope />
				</Link>
				<div className="flex space-x-7">
					<Link
						className={`${buttonVariants()} bg-slate-700 hover:bg-slate-600 border-slate-900 border`}
						href="/sign-in"
					>
						Ingresar
					</Link>
					<Link
						className={`${buttonVariants()} bg-gradient-to-r from-light-blue text-white from-blue-500 to-blue-800 w-40 hover:from-blue-600 hover:to-blue-900`}
						href="/sign-up"
					>
						Registrarme
					</Link>
				</div>
			</div>
		</div>
	);
};
export default NavbarToSignIn;
