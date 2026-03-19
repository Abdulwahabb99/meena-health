import { createContext, useContext, useState, useCallback } from "react";
import PropTypes from "prop-types";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [medications, setMedications] = useState([]);

  const addMedication = useCallback((medication) => {
    setMedications((prev) => {
      const existing = prev.findIndex((m) => m.code === medication.code);
      if (existing >= 0) {
        const next = [...prev];
        next[existing] = {
          ...next[existing],
          quantity: next[existing].quantity + 1,
        };
        return next;
      }
      return [...prev, { ...medication, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((index, newQuantity) => {
    setMedications((prev) => {
      const next = [...prev];
      if (index >= 0 && index < next.length) {
        next[index] = { ...next[index], quantity: Math.max(1, newQuantity) };
      }
      return next;
    });
  }, []);

  const removeMedication = useCallback((index) => {
    setMedications((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const setMedicationsDirect = useCallback((meds) => {
    setMedications(meds || []);
  }, []);

  const clearCart = useCallback(() => {
    setMedications([]);
  }, []);

  const value = {
    medications,
    setMedications: setMedicationsDirect,
    addMedication,
    updateQuantity,
    removeMedication,
    clearCart,
    totalItems: medications.reduce((sum, m) => sum + m.quantity, 0),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
