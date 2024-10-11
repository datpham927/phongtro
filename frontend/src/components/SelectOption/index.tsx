import { memo, ChangeEvent } from "react";

// Định nghĩa kiểu dữ liệu cho các option
 

// Định nghĩa kiểu dữ liệu cho props của component
interface SelectOptionProps {
  label: string;
  valueCode?: number | any;
  options: any;
  type: string // Thay đổi type dựa trên nhu cầu của bạn
  setCode?: (value: number | any) => void;
  setValue?: React.Dispatch<React.SetStateAction<any>>; // Cập nhật kiểu dữ liệu này tùy theo cấu trúc state của bạn
  className?: string;
  isLabel?: boolean;
  invalidFields?:any,
  setInvalidFields?: React.Dispatch<React.SetStateAction<any>>; // Cập nhật kiểu dữ liệu này tùy theo cấu trúc invalidFields của bạn
}

// Component SelectOption
function SelectOption({
  label,
  valueCode,
  options,
  type,
  setCode,
  setValue,
  className = "",
  invalidFields,
  isLabel = false,
  setInvalidFields
}: SelectOptionProps) {
  const handleValue = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (setCode) {
      setCode(Number(value));
    } else if (setValue) {
      setValue((prev: any) => ({ ...prev, [type]: value }));
    }
    setInvalidFields&& setInvalidFields(invalidFields.filter((field:any) => field.name !== type));
  };
  return (
    <div className={`flex flex-col w-1/2 ${invalidFields?.length>0?'gap-1':''} ${className}`}>
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
        {options?.map((e:any) => (
          <option
            key={e.code||e.id}
            value={e.code||e.id}
          >
            {e.name}
          </option>
        ))}
      </select>
      {invalidFields?.length > 0 &&
        invalidFields.some((e:any) => e.name === type) && (
          <span className="my-1 text-sm text-red-custom">
            {invalidFields?.find((e:any) => e.name === type)?.message}
          </span>
        )}
    </div>
  );
}

export default memo(SelectOption);
