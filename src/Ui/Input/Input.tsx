import { InputHTMLAttributes } from "react";
import { useTheme } from "../utils/ThemeContext";

interface IProps extends InputHTMLAttributes<HTMLInputElement> { }

const Input = ({ ...rest }: IProps) => {
  const { themeStyles } = useTheme();
  return (
    <input
      className={`border shadow-md focus:outline-none focus:ring-2 rounded-lg px-3 py-3 text-md transition ${themeStyles.input}`}
      {...rest}
    />
  );
};

export default Input;
