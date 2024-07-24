import React from "react";

type IThemeContext = {
  theme: string;
  setTheme: (theme: string) => void;
};

const ThemeContext = React.createContext<IThemeContext>({} as IThemeContext);

const ThemeProvider = ({ children }: React.PropsWithChildren) => {
  const [theme, setTheme] = React.useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useThemeCtx = () => {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeCtx must be used within a ThemeProvider");
  }
  return context;
};

export { ThemeProvider, useThemeCtx };

export default ThemeContext;
