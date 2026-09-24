import { createPortal } from "react-dom";
import { useRef, useEffect } from "react";

export default function Modal({ children, open }) {
    const dialog = useRef();

    useEffect(() => {
        const modal = dialog.current;
        if (open) {
            modal.showModal();
        } else {
            modal.close();
        }
    }, [open])

    //createPortal ile modal componentini root elementin dışında başka bir elemente render ediyoruz. Bu sayede modal componenti root elementin dışında başka bir yerde render edilebilir ve z-index gibi sorunlar yaşanmaz.
  return createPortal(<dialog ref={dialog} className="modal-box">{children}</dialog>, document.getElementById("modal"));
}
