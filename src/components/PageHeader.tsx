type Props = { eyebrow?: string; title: string; description?: string };

export function PageHeader({ eyebrow, title, description }: Props) {
  return (
    <div className="pt-16 pb-10 sm:pt-24 sm:pb-14">
      {eyebrow && (
        <p className="animate-fade-up text-xs uppercase tracking-[0.25em] text-primary mb-3">
          {eyebrow}
        </p>
      )}
      <h1
        className="animate-fade-up text-4xl sm:text-5xl font-bold tracking-tight"
        style={{ animationDelay: "80ms" }}
      >
        {title}
      </h1>
      {description && (
        <p
          className="animate-fade-up mt-4 max-w-2xl text-base sm:text-lg text-muted-foreground"
          style={{ animationDelay: "160ms" }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
