// DataContext.js
import React, { createContext, useState } from "react";

const DataContext = createContext(null);

export const DataProvider = ({ children }: any) => {
  const [userName, setUserName] = useState();
  const [userPhone, setUserPhone] = useState();
  const [userId, setUserId] = useState();
  return (
    <DataContext.Provider
      value={{
        userId,
        setUserId,
        userName,
        setUserName,
        userPhone,
        setUserPhone,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
