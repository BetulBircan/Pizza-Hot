import Pizza from "./Pizza";
import { useState, useEffect } from "react";

export default function PizzaList() {

  const [loadedPizzas, setLoadedPizzas] = useState([]);

  useEffect(() => {
      const getPizzas = async () => {
    const response = await fetch("http://localhost:3000/pizzas");

    if (!response.ok) {
      throw new Error("Failed to fetch pizzas");
    }

    const pizzas = await response.json();
    setLoadedPizzas(pizzas);

  }

  getPizzas();
  }, []);

  return (
    <div className="pizza-list">
      <div className="row row-cols-2 row-cols-md-3 row-cols-xl-4 g-4">
        {
          loadedPizzas.map((pizza) => (
            <Pizza key={pizza.id} pizza = {pizza} />
          ))
        }
      </div>
    </div>
  );
}
