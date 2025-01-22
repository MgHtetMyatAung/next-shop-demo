"use client";
import React from "react";
import { Control, useController } from "react-hook-form";

interface SelectOptionProps {
  name: string;
  control: Control<any>; // Replace `any` with your form's type
  options: CategoryType[];
  rules?: object;
  placeholder?: string;
}

export default function CategorySelector({
  name,
  control,
  rules,
  options,
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
      >
        <option value="0">{"Select an option"}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <span className="text-danger">{error.message}</span>}
    </div>
  );
}
