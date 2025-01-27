import React from "react";
import { Control, useController } from "react-hook-form";

interface SelectOptionProps {
  name: string;
  control: Control<any>; // Replace `any` with your form's type
  options: VariantValue[];
  rules?: object;
  placeholder?: string;
}

export default function VariantSelector({
  name,
  control,
  options,
  rules,
}: SelectOptionProps) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules });

  return (
    <div className="form-group">
      <select
        {...field}
        id={name}
        className={`form-control w-full border p-1 rounded ${
          error ? "is-invalid" : ""
        }`}
        required
      >
        <option value="">Select {name}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.key}
          </option>
        ))}
      </select>
      {error && <span className="text-danger">{error.message}</span>}
    </div>
  );
}
