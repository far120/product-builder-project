import { createContext, useContext, useState, ReactNode } from "react";

const themes = {
    light: {
        background: "bg-gradient-to-br from-yellow-200 via-yellow-100 to-yellow-400", // sun-like
        card: "bg-white shadow-lg border border-yellow-300",
        text: "text-yellow-900",
        button: "bg-yellow-400 text-yellow-900 hover:bg-yellow-500",
        input: "bg-white border-yellow-300 text-yellow-900",
        error: "text-red-700",
        accent: "bg-yellow-100",
    },
    dark: {
        background: "bg-[#0f2027]", // deep dark blue/green
        card: "bg-[#16222A] shadow-xl border border-[#0f2027]",
        text: "text-gray-100",
        button: "bg-cyan-900 text-white hover:bg-cyan-800",
        input: "bg-[#1a2733] border-[#0f2027] text-gray-100",
        error: "text-red-400",
        accent: "bg-[#1a2733]",
    },
};

const ThemeContext = createContext({
    theme: "light",
    setTheme: (theme: "light" | "dark") => { },
    themeStyles: themes.light,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const themeStyles = themes[theme];
    return (
        <ThemeContext.Provider value={{ theme, setTheme, themeStyles }}>
            {children}
        </ThemeContext.Provider>
    );
};
