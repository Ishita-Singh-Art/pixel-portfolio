type Props = { eyebrow?: string; title: string; description?: string };

export function PageHeader({ eyebrow, title, description }: Props) {
  return (
    <div className="pt-16 pb-10 sm:pt-24 sm:pb-14">
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">{eyebrow}</p>
      )}
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">{title}</h1>
      {description && (
        <p className="mt-4 max-w-2xl text-base sm:text-lg text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
