import React from "react";
import { RxCross1 } from "react-icons/rx";

interface ModalProps {
    modalOpen: boolean;
    setModalOpen: (open : boolean) => boolean | void;
    children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
    return (
        <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
            {/* <div className='modal-box relative'> */}
                <RxCross1 onClick={() => setModalOpen(false)} cursor="pointer" className='text-blue-500 absolute' size={15} />
                {children}
            {/* </div> */}
        </div>
    );
};

export default Modal;