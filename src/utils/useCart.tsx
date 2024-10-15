import { useState, useEffect } from 'react';

interface CartItem {
  id: number;
  name: string;
  qty: number;
}

const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from local storage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    console.log(storedCart)
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Update local storage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (id: number, name: string, qty: number): void => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === id ? { ...item, qty: item.qty + qty } : item
        );
      } else {
        return [...prevCart, { id, name, qty }];
      }
    });
  };

  const updateQty = (id: number, change: number): void => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item => {
        if (item.id === id) {
          const newQty = Math.max(0, item.qty + change);
          return newQty === 0 ? null : { ...item, qty: newQty };
        }
        return item;
      }).filter((item): item is CartItem => item !== null);

      // If the item was removed (qty became 0), ensure it's not in the cart
      if (updatedCart.length < prevCart.length) {
        return updatedCart;
      }
      return prevCart;
    });
  };

  const removeProduct = (id: number): void => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const getCart = (): CartItem[] => cart;

  return { addToCart, updateQty, removeProduct, getCart };
};

export default useCart;