import Modal from "./UI/Modal";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import CartItem from "./UI/CartItem";
import { UIContext } from "../contexts/UIContext";

export default function Cart() {
  const { items, addItemToCart, deleteCartItem } = useContext(CartContext);
  const {uiProgress, hideCart, showCheckout} = useContext(UIContext)

  const cartTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <Modal open={uiProgress === "cart"}>
      <h2>Sepetiniz</h2>
      {
        items.length > 0 ? (
            <ul className="cart-items">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onIncrease={() => addItemToCart(item)}
            onDecrease={() => deleteCartItem(item.id)}
          />
        ))}
      </ul>
        ) : (
          <div className="alert alert-danger">Sepetenizde Ürün Yoktur.</div>
        )
      }
    
      <div className="cart-summary">
        <div className="modal-actions text-end">
          <button className="btn btn-sm btn-danger me-2" onClick={hideCart}>Kapat</button>
          {items.length > 0 && (
            <button className="btn btn-sm btn-outline-success" onClick={showCheckout}>
            Sipariş Ver
          </button>
          )}
          
        </div>
        {/* fs-5 : fontsize 5 demek */}
        {items.length > 0 && (
          <p className="badge text-bg-success mb-0 fs-5">{cartTotal} ₺</p>
        )}
        
      </div>
    </Modal>
  );
}
