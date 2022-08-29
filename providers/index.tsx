import { ReactNode } from "react";
import { TechsProvider } from "./Techs";

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => (
  <TechsProvider>{children}</TechsProvider>
);

export default Providers;
