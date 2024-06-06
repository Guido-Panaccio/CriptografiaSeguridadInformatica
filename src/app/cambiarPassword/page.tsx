import ChangePasswordForm from "@/components/form/ChangePasswordForm";
import { ToastContainer } from "react-toastify";

export default function cambiarPassword() {
	return (
		<div className="">
			<ChangePasswordForm />
			<ToastContainer className="w-10 h-12 top-0 right-0 m-5 relative " />{" "}
		</div>
	);
}
