"use client";
import { createContext, useContext, useEffect, useState } from "react";

export type CartItem = { id: string; slug: string; name: string; priceLKR: number; qty: number };

const CartContext = createContext<{
  items: CartItem[];
  add: (i: Omit<CartItem, "qty">) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  total: number;
}>({ items: [], add: () => {}, remove: () => {}, setQty: () => {}, clear: () => {}, total: 0 });

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  useEffect(() => {
    const raw = localStorage.getItem("solarlk_cart");
    if (raw) setItems(JSON.parse(raw));
  }, []);
  useEffect(() => {
    localStorage.setItem("solarlk_cart", JSON.stringify(items));
  }, [items]);

  const add = (item: Omit<CartItem, "qty">) =>
    setItems((prev) => {
      const ex = prev.find((p) => p.id === item.id);
      if (ex) return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p));
      return [...prev, { ...item, qty: 1 }];
    });
  const remove = (id: string) => setItems((p) => p.filter((i) => i.id !== id));
  const setQty = (id: string, qty: number) =>
    setItems((p) => p.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)));
  const clear = () => setItems([]);
  const total = items.reduce((s, i) => s + i.priceLKR * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, setQty, clear, total }}>
      {children}
    </CartContext.Provider>
  );
}
export const useCart = () => useContext(CartContext);
