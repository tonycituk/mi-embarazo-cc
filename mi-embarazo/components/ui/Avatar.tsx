export default function Avatar({
  name,
  className,
  textSize,
}: {
  name: string;
  className?: string;
  textSize?: "xs" | "sm" | "md" | "lg" | "xl";
}) {
  const size = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-4xl",
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    if (name.includes(" ")) {
      const [firstName, lastName] = name.split(" ");
      return `${firstName.charAt(0)}${lastName.charAt(0)}`;
    }
    return name.charAt(0);
  };

  return (
    <div
      className={`${className} flex items-center justify-center text-xs ${
        className?.includes("w-") || className?.includes("h-")
          ? className
          : "w-8 h-8"
      } bg-purple-300 text-purple-600 rounded-full`}
    >
      <span
        className={`${textSize && size[textSize]}
      font-semibold`}
      >
        {getInitials(name)}
      </span>
    </div>
  );
}
