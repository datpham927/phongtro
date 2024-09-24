import { memo } from "react";

interface InputFormProps {
  label: string;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  name: string;
  invalidFields: { name: string; message: string }[];
  value?: string;
  setInvalidFields: React.Dispatch<React.SetStateAction<{ name: string; message: string }[]>>;
  direction?: string;
  type?:string
}

function InputForm({
  label,
  setValue,
  name,
  invalidFields,
  value,
  setInvalidFields,
  direction,
  type='text'
}: InputFormProps) {
  return (
    <div className={`flex ${direction ? direction : "flex-col gap-1"} w-full`}>
      <label htmlFor={name} className="flex items-end w-1/2">{label}</label>
      <div className="w-full">
        <input
          id={name}
          value={value}
          className="flex w-full border-solid border-[1px] border-slate-300 py-1 px-2 rounded-md outline-blue-300"
          type={type}
          onChange={(e) => {
            setValue((prev:any) => ({ ...prev, [name]: e.target.value }));
            setInvalidFields(invalidFields.filter((field) => field.name !== name));
          }}
        />
        {invalidFields?.length > 0 && invalidFields.some((field) => field.name === name) ? (
          <span className="text-red-500 text-sm">
            {invalidFields.find((field) => field.name === name)?.message}
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default memo(InputForm);
