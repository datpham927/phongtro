import { memo, Dispatch, SetStateAction } from "react";

interface InvalidField {
  name: string;
  message: string;
}

interface InputFormV2Props {
  label: string;
  unit: string;
  setValue: Dispatch<SetStateAction<Record<string, any>>>;
  name: string;
  invalidFields: InvalidField[];
  value: string | number;
  setInvalidFields: Dispatch<SetStateAction<InvalidField[]>>;
}

function InputFormV2({
  label,
  unit,
  setValue,
  name,
  invalidFields,
  value,
  setInvalidFields,
}: InputFormV2Props) {
  return (
    <div className="flex flex-col gap-1 w-1/2">
      <label htmlFor={name} className="font-medium text-sm">
        {label}
      </label>
      <div className="flex border-slate-300">
        <input
          id={name}
          className="py-1 px-2 flex-1 outline-blue-300 rounded-l-md border-solid border-[1px] border-slate-300"
          type="number"
          value={value}
          onChange={(e) => {
            setValue((prev) => ({
              ...prev,
              [name]:e.target.value }));
            setInvalidFields(invalidFields.filter((field) => field.name !== name));
          }}
        />
        <div className="flex items-center justify-center bg-primary-bg px-3 border-solid border-t-[1px] border-r-[1px] border-b-[1px] border-slate-300 rounded-r-md">
          {unit}
        </div>
      </div>
      {invalidFields?.length > 0 && invalidFields.some((field) => field.name === name) ? (
        <span className="text-red-500 text-sm">
          {invalidFields.find((field) => field.name === name)?.message}
        </span>
      ) : null}
    </div>
  );
}

export default memo(InputFormV2);
