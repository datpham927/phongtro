import React, { memo } from 'react';

interface ButtonOutlineProps {
    children: React.ReactNode;
    onClick?: ((e: any) => void | Promise<void> | React.MouseEvent<HTMLButtonElement, MouseEvent>) | undefined;
    className?: string;
}

 
const ButtonOutline: React.FC<ButtonOutlineProps> = ({ children, onClick, className }) => {
    return (
        <button
            className={`flex justify-center gap-1 text-sm h-fit font-medium items-center p-2 rounded-[4px]  border-[1px] border-solid border-primary text-primary  hover:bg-opacity-80 ${
                className ? className : ''
            }`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default memo(ButtonOutline);
