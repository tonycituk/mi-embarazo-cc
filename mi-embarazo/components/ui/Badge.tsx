export default function Badge({
  children,
  className,
  type,
}: {
  children: React.ReactNode;
  className?: string;
  type?: "primary" | "secondary" | "success" | "danger" | "warning" | "info";
}) {
  const colors = {
    primary: "bg-[#FFEBFE] text-[--primary-color]",
    secondary: "bg-indigo-100 text-indigo-700",
    success: "bg-green-100 text-green-700",
    danger: "bg-red-100 text-red-700",
    warning: "bg-yellow-100 text-yellow-800",
    info: "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={`${
        type ? colors[type] : "bg-gray-700 text-gray-100"
      } ${className} select-none inline-flex items-center rounded-md px-2 py-1 text-xs font-bold ring-1 ring-inset ring-gray-500/10`}
    >
      {children}
    </span>
  );
}
