import NavbarMainPage from "@/components/NavbarMainPage";
import "@/styles/globals.css"; // Import your global styles here
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="h-screen flex flex-col justify-center items-center bg-blue-950">
			<NavbarMainPage />
			<div className="bg-white p-10 rounded-md shadow-2xl">{children}</div>
		</div>
	);
}
