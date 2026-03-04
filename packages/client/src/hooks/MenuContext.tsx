import { createContext, useContext, useState } from 'react';

type MenuContextType = {
  activeMenu: string | null;
  setActiveMenu: (menu: string) => void;
};

export const MenuContext = createContext<MenuContextType | null>(null);

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [activeMenu, setActiveMenu] = useState<string>('1');

  return (
    <MenuContext value={{ activeMenu, setActiveMenu }}>{children}</MenuContext>
  );
}

export function useMenu(): MenuContextType {
  const context = useContext(MenuContext);
  if (!context) throw new Error('useMenu must be used within a MenuProvider');
  return context;
}
