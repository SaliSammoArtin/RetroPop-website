import { createContext, useState, useContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false)

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (product) => {
    setCartItems(PrevItems => {
      const existingItem = PrevItems.find(item => item.id === product.id);

      if (existingItem) {
        return PrevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...PrevItems, { ...product, quantity: 1 }];
    }
    )
  }
  return (
    <CartContext.Provider value={{ cartItems, setCartItems, isCartOpen, openCart, closeCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart needs cartsProvide")
  }
  return context; 
}