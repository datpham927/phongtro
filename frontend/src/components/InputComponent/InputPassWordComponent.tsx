import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import React, { memo, useState } from 'react';

interface InvalidField {
  name: string;
  message: string;
}

interface InputPasswordProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  invalidFields?: InvalidField[];
  name: string;
}

const InputPassWordComponent: React.FC<InputPasswordProps> = ({
  value,
  onChange,
  placeholder,
  invalidFields = [],
  name
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Tìm thông báo lỗi tương ứng với trường nhập liệu
  const errorMessage = invalidFields.find(field => field.name === name)?.message;

  return (
  <>
    <div className="flex w-full items-center">
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        type={showPassword ? 'text' : 'password'}
        minLength={6}
        required
        className={`text-sm w-full bg-transparent outline-none border-solid border-b-[1px] py-2 ${errorMessage ? 'border-red-custom' : ''}`}
      />
      <div
        onClick={() => setShowPassword(prev => !prev)}
        className="cursor-pointer ml-2"
      >
        {showPassword ? (
          <VisibilityIcon fontSize="small" />
        ) : (
          <VisibilityOffIcon fontSize="small" />
        )}
      </div>
     
    </div>
     {errorMessage && (
      <span className="my-1 text-xs text-red-custom">
        {errorMessage}
      </span>
    )}</>
  );
};

export default   memo(InputPassWordComponent);
