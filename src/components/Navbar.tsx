import { Stethoscope } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
	return (
		<div className="bg-zinc-100 py-2 border-s-zinc-200 fixed w-full z-10 top-0">
			<div className="container flex items-center justify-between h-10">
				<Link href="/home">
					<Stethoscope />
				</Link>
			</div>
		</div>
	);
};
export default Navbar;
