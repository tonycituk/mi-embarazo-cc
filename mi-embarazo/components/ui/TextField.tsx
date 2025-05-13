export default function TextField({
  name,
  label,
  value,
  className,
  onChange,
  placeholder,
  disabled,
}: {
  name: string;
  label: string;
  value: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <div className={`${className} py-2 flex flex-col`}>
      <small className="text-[#8b8b8b] text-sm font-bold">{label}</small>
      <div className="relative">
        <textarea
          onChange={onChange ? (e) => onChange(e) : undefined}
          disabled={disabled}
          name={name}
          className={`border w-full border-gray-300 p-2 text-black rounded-md  h-28 overflow-auto focus:outline-none focus:border-[--primary-color]`}
          style={{ resize: "none" }} // Disable resizing
          value={value}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
