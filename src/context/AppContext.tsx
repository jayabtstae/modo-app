import { createContext, type PropsWithChildren } from 'react';

export const AppContext = createContext({});

export function AppProvider({ children }: PropsWithChildren) {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
}
