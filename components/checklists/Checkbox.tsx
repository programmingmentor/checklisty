import React from 'react';

type CheckboxProps = {
  id: string;
  checked: boolean;
  onChange: () => void;
};

const Checkbox = ({ id, checked, onChange }: CheckboxProps) => {
  return (
    <input
      className="form-checkbox h-5 w-5 text-gray-600 cursor-pointer peer"
      id={id}
      type="checkbox"
      checked={checked}
      onChange={onChange}
    />
  );
};

export default Checkbox;
