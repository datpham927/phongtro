import { memo } from "react";

interface InvalidField {
  name: string;
  message: string;
}

interface InputComponentProps {
  placeholder?: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  invalidFields?: InvalidField[];
  className?:string
}

const InputComponent: React.FC<InputComponentProps> = ({
  placeholder,
  type,
  onChange,
  name,
  className,
  invalidFields = [],
}) => {  
  return (
    <div className="w-full my-2">
      <input
        className={`outline-none w-full text-sm bg-primary-bg p-2 rounded-md ${className}`}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
      />
      {invalidFields?.length > 0 &&
        invalidFields.some((e) => e.name === name) && (
          <span className="my-1 text-sm text-red-custom">
            {invalidFields?.find((e) => e.name === name)?.message}
          </span>
        )}
    </div>
  );
};

export default memo(InputComponent);
