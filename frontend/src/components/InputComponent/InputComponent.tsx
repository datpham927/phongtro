import { memo } from "react";

interface InvalidField {
  name: string;
  message: string;
}

interface InputComponentProps {
  placeholder: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  invalidFields?: InvalidField[];
}

const InputComponent: React.FC<InputComponentProps> = ({
  placeholder,
  type,
  onChange,
  name,
  invalidFields = [],
}) => {
  return (
    <>
      <input
        className="outline-none text-base bg-primary-bg p-2 rounded-md my-2"
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
      />
      {invalidFields.length > 0 &&
        invalidFields.some((e) => e.name === name) && (
          <span className="my-1 text-xs text-red-custom">
            {invalidFields.find((e) => e.name === name)?.message}
          </span>
        )}
    </>
  );
};

export default memo(InputComponent);
