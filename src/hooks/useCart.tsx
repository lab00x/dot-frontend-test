import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface CartItem {
  id: number;
  name: string;
  qty: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (id: number, name: string, qty: number) => void;
  updateQty: (id: number, change: number) => void;
  removeFromCart: (id: number) => void;
  getCart: () => CartItem[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    // Set timeout allows the page/dom to render before accessing the value of cart from localstore
    setTimeout(() => {
      localStorage.setItem("cart", JSON.stringify(cart));
    }, 1);
  }, [cart]);

  const addToCart = (id: number, name: string, qty: number): void => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === id ? { ...item, qty: item.qty + qty } : item
        );
      } else {
        return [...prevCart, { id, name, qty }];
      }
    });
  };

  const updateQty = (id: number, change: number): void => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = Math.max(0, item.qty + change);
            return newQty === 0 ? null : { ...item, qty: newQty };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);

      return updatedCart;
    });
  };

  const removeFromCart = (id: number): void => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const getCart = (): CartItem[] => cart;

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQty, removeFromCart, getCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default useCart;
