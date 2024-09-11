import { memo, ChangeEvent } from "react";

// Định nghĩa kiểu dữ liệu cho các option
interface Option {
  code?: number; 
  name?: string; 
}

// Định nghĩa kiểu dữ liệu cho props của component
interface SelectAddressProps {
  label: string;
  valueCode: number | undefined;
  options: Option[];
  type: "province" | "district" | "ward"; // Thay đổi type dựa trên nhu cầu của bạn
  setCode?: (value: number) => void;
  setValue?: React.Dispatch<React.SetStateAction<any>>; // Cập nhật kiểu dữ liệu này tùy theo cấu trúc state của bạn
  className?: string;
  isLabel?: boolean;
  setInvalidFields?: React.Dispatch<React.SetStateAction<any>>; // Cập nhật kiểu dữ liệu này tùy theo cấu trúc invalidFields của bạn
}

// Component SelectAddress
function SelectAddress({
  label,
  valueCode,
  options,
  type,
  setCode,
  setValue,
  className = "",
  isLabel = false,
  setInvalidFields,
}: SelectAddressProps) {
  const handleValue = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (setCode) {
      setCode(Number(value));
    } else if (setValue) {
      setValue((prev: any) => ({ ...prev, [type]: value }));
    }
  };

  return (
    <div className={`flex flex-col w-1/2 gap-1 ${className}`}>
      {isLabel && (
        <label htmlFor="select-address" className="text-sm font-semibold">
          {label}
        </label>
      )}
      <select
        value={valueCode}
        onChange={handleValue}
        id="select-address"
        className="outline-none bg-primary-bg text-sm border-solid border-[1px] border-gray-300 py-1 px-4 rounded-md"
      >
        <option value="">{`--${label}--`}</option>
        {options?.map((e) => (
          <option
            key={e.code}
            value={e.code}
          >
            {e.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default memo(SelectAddress);
