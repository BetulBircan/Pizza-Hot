import { useContext } from "react";
import Modal from "./UI/Modal";
import { UIContext } from "../contexts/UIContext";

export default function AddingCartWarning() {
  const { uiProgress, hideAddingCartWarnig, showCart } = useContext(UIContext);

  const goToCart = () => {
    hideAddingCartWarnig("");
    showCart("cart");
  };

  return (
    <Modal open={uiProgress === "addingCartWarning"}>
      <>
        <div className="modal-header d-flex justify-content-end text-end">
          <button type="button" className="btn btn-sm btn-outline-danger" onClick={hideAddingCartWarnig}>
            X
          </button>
        </div>
        <p>Ürün sepete Eklendi</p>
        <button
          className="btn btn-sm btn-danger me-2"
          onClick={hideAddingCartWarnig}
        >
          Kapat
        </button>
        <button
          className="btn btn-sm btn-outline-primary me-2"
          onClick={goToCart}
        >
          Sepete Git
        </button>
      </>
    </Modal>
  );
}
