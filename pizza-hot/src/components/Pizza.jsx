import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { CartContext } from "../contexts/CartContext";
export default function Pizza({ pizza }) {
  const { color, mode } = useContext(ThemeContext);
  const { addItemToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addItemToCart(pizza);
  };

  return (
    <div className="col">
      {/* <div className="card item"> */}
      <div className={`card item ${mode === 'dark' ? 'bg-dark text-white border-light' : 'bg-light text-black'}`}>
        <img
          src={`http://localhost:3000/images/${pizza.image}`}
          alt={pizza.title}
          className="card-img-top p-2 p-md-3 border-bottom"
        />
        <div className="card-body">
          <h3 className="card-title">{pizza.title}</h3>
          <p className="card-text">
            {pizza.description}
          </p>
          <div className="item-price">
            <b>{pizza.price} ₺</b>
            <button className={`btn btn-sm btn-outline-${color}`} onClick={handleAddToCart}>
              Sepete Ekle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
