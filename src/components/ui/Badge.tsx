type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium tracking-widest text-primary uppercase ${className}`.trim()}
    >
      {children}
    </span>
  );
}
