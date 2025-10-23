import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { EnvironmentView } from "@/components/EnvironmentToggle";

interface EnvironmentContextType {
  environment: EnvironmentView;
  setEnvironment: (env: EnvironmentView) => void;
}

const EnvironmentContext = createContext<EnvironmentContextType | undefined>(undefined);

export const EnvironmentProvider = ({ children }: { children: ReactNode }) => {
  const [environment, setEnvironmentState] = useState<EnvironmentView>(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem("jeevadhara_environment");
    return (saved as EnvironmentView) || "water";
  });

  const setEnvironment = (env: EnvironmentView) => {
    setEnvironmentState(env);
    localStorage.setItem("jeevadhara_environment", env);
  };

  useEffect(() => {
    // Update document class for theme-specific styling
    document.documentElement.classList.remove("env-water", "env-air", "env-waste");
    document.documentElement.classList.add(`env-${environment}`);
  }, [environment]);

  return (
    <EnvironmentContext.Provider value={{ environment, setEnvironment }}>
      {children}
    </EnvironmentContext.Provider>
  );
};

export const useEnvironment = () => {
  const context = useContext(EnvironmentContext);
  if (!context) {
    throw new Error("useEnvironment must be used within EnvironmentProvider");
  }
  return context;
};
