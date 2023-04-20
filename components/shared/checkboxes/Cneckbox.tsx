import { ChangeEvent } from "react";

type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox = ({ label, checked, onChange }: CheckboxProps) => {
  return (
    <label className="inline-flex items-center mt-3">
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 text-gray-600"
        checked={checked}
        onChange={onChange}
      />
      <span className="ml-2 text-gray-700">{label}</span>
    </label>
  );
};

export default Checkbox;

