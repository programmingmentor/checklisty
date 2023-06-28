import React from 'react';

import { styles } from '@/components/styles';

type EditableTextProps = {
  value: string;
  onChange: (newValue: string) => void;
  onFocus: () => void;
  onBlur: () => void;
};

const EditableText = ({ value, onChange, onFocus, onBlur }: EditableTextProps) => {
  return (
    <input
      className={`${styles['inputsMain']} `}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};

export default EditableText;
