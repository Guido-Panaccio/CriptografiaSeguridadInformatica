import NavbarToSignIn from "@/components/NavbarToSignIn";
import Slider from "@/components/Slider";
import "@/styles/globals.css"; // Import your global styles here
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="h-screen flex flex-col justify-center items-center bg-blue-950">
			<NavbarToSignIn />
			<Slider />
			{children}
		</div>
	);
}
