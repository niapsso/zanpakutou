import { createContext, useContext, useState, ReactNode } from "react";

import { Tech } from "@/utils/types";

interface TechsContextData {
  getTechs: () => void;
  techs: Tech[];
}

interface TechsContextProps {
  children: ReactNode;
}

const TechsContext = createContext<TechsContextData>({} as TechsContextData);

export const TechsProvider = ({ children }: TechsContextProps) => {
  const [techs, setTechs] = useState<Tech[]>([]);

  const getTechs = async () => {
    if (techs.length) return techs;

    await fetch("api/techs")
      .then((res) => res.json())
      .then((res) => setTechs(res));
  };

  return (
    <TechsContext.Provider
      value={{
        getTechs,
        techs,
      }}
    >
      {children}
    </TechsContext.Provider>
  );
};

export const useTechs = () => useContext(TechsContext);
