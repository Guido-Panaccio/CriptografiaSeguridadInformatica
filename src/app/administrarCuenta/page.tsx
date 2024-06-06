import MiAccountForm from "@/components/form/MiAccountForm";
import { ToastContainer } from "react-toastify";

export default function SignIn() {
	return (
		<div className="">
			<MiAccountForm />
			<ToastContainer className="w-10 h-12 top-0 right-0 m-5 relative " />{" "}
		</div>
	);
}
