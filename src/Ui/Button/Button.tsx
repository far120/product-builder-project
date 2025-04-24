import { ReactNode } from "react";
interface ButtonProps {
    className?: string;
    children: ReactNode;
    onClick?: () => void;
    

}
export default function Button({children , classname , ...rest}: ButtonProps) {
    return (
        <button className={`w-full h-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ${classname}`} {...rest}>
            {children}
        </button>
    )
}
  