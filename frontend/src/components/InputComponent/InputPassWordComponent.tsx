import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import React, { useState } from 'react';

interface InvalidField {
  name: string;
  message: string;
}
interface InputPasswordProps {
  value:string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}
const InputPassWordComponent: React.FC<InputPasswordProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="flex w-full justify-between items-center mt-5">
      <input
        value={value}
        required
        className="text-sm w-full bg-transparent outline-none border-solid border-b-[1px] py-2"
        type={showPassword ? 'text' : 'password'}
        onChange={onChange}
        minLength={6}
        placeholder={placeholder}
      />
      <div onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? (
          <VisibilityIcon fontSize="small" />
        ) : (
          <VisibilityOffIcon fontSize="small" />
        )}
      </div>
    </div>
  );
};

export default InputPassWordComponent;
