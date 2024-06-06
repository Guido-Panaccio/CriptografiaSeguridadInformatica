export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<div className="h-screen flex flex-col justify-center items-center bg-blue-950">
					{children}
				</div>
			</body>
		</html>
	);
}
