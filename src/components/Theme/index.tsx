import { useThemeCtx } from "../../context/themeContext";
import { THEME_LIST } from "../../constants";

const ThemePicker = () => {
  const { setTheme } = useThemeCtx();

  return (
    <div data-testid="theme-picker">
      {THEME_LIST.map((theme) => (
        <div
          data-testid="theme"
          key={theme.id}
          onClick={() => setTheme(theme.value)}
        >
          {theme.value}
        </div>
      ))}
    </div>
  );
};

export default ThemePicker;
