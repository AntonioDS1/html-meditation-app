import { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [isRunning, setIsRunning] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isRunning,
        setIsRunning,
        hasAudio,
        setHasAudio
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
