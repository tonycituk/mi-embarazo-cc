export default function Card({
  title,
  subtitle,
  children,
  action,
  className,
}: {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <article className={`${className} bg-[#fff7fe] shadow-md rounded-lg p-6`}>
      {title && (
        <section className="flex justify-between items-center w-full pb-6">
          <span>
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-sm font-medium text-gray-400">{subtitle}</p>
          </span>
          {action && <div>{action}</div>}
        </section>
      )}
      <div className="text-gray-400">{children}</div>
    </article>
  );
}
