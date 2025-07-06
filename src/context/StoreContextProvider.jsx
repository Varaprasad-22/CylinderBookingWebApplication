import React, { createContext, useState } from "react";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const [items, setItems] = useState({});

  const updateItem = (id, data) => {
    setItems((prev) => {
      const current = prev[id] || {};
      const updated = { id, ...current, ...data };
      if (updated.count <= 0) {
        const newItems = { ...prev };
        delete newItems[id];
        return newItems;
      }
      return { ...prev, [id]: updated };
    });
  };

  return (
    <StoreContext.Provider value={{ items, updateItem }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
