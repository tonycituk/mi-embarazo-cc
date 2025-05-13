import { SearchRounded } from "@mui/icons-material";
import React from "react";

export default function Input({
  name,
  label,
  type,
  value,
  onChange,
  placeholder = "",
  disabled = false,
  error,
  className = "",
}: {
  name: string;
  label?: string;
  type: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string; // Optional error message
  className?: string;
}) {
  return (
    <div className={`${className} py-2 flex flex-col`}>
      {label && (
        <label className="text-[#8b8b8b] text-sm font-bold mb-1" htmlFor={name}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          name={name}
          id={name} // Ensure `id` matches `name` for accessibility
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          className={`${
            disabled
              ? "bg-gray-100 text-gray-500 cursor-not-allowed"
              : "bg-white text-black"
          } border py-2 px-2 rounded-md font-medium focus:outline-none focus:ring-1 focus:ring-[--primary-color] w-full ${
            type === "search" ? "pl-10" : ""
          } ${error ? "border-red-500" : "border-gray-300"}`}
        />
        {/* Dynamic icon rendering */}
        {type == "search" && (
          <SearchRounded className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#8b8b8b]" />
        )}
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>
      )}
    </div>
  );
}
