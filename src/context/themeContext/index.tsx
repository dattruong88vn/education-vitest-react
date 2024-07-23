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

export { ThemeProvider };

export default ThemeContext;
