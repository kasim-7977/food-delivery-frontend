import { createContext, useState ,useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
});
useEffect(() => {
  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );
}, [cart]);

  const addToCart = (food) => {
    const existingItem = cart.find(
      (item) => item.id === food.id
    );
    console.log(food);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        { ...food, quantity: 1 }
      ]);
    }
  };
const increaseQuantity = (id) => {
  setCart(
    cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
};

const decreaseQuantity = (id) => {
  setCart(
    cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};

const removeItem = (id) => {
  setCart(
    cart.filter((item) => item.id !== id)
  );
};
  return (
    <CartContext.Provider
      value={{
  cart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeItem
}}
    >
      {children}
    </CartContext.Provider>
  );
};