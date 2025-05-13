import Image from "next/image";

export default function Logo({
  type,
  width,
  height,
}: {
  type?: string;
  width?: number;
  height?: number;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Image
        src={type === "pictorial" ? "/logo-2.svg" : "/logo.svg"}
        alt="Logotipo Mi Embarazo"
        width={width || 180}
        height={height || 180}
      />
    </div>
  );
}
