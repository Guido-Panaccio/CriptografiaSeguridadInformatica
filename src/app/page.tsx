"use client";

import { useRouter } from "next/navigation";

export default function Index() {
	const router = useRouter();

	// Arreglo error que salia con el loading
	if (typeof window !== "undefined") {
		router.push("/home");
	}

	return (
		<div className="h-screen flex flex-col justify-center items-center"></div>
	);
}
