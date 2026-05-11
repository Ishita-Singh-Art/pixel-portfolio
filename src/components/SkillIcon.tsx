import { useState } from "react";
import { Wrench } from "lucide-react";
import { skillIconMap } from "@/data/skillIcons";

type Props = {
  name: string;
  className?: string;
};

export function SkillIcon({ name, className }: Props) {
  const entry = skillIconMap[name];
  const [errored, setErrored] = useState(false);

  if (!entry || errored) {
    return <Wrench className={className ?? "h-4 w-4 text-muted-foreground"} aria-hidden />;
  }

  return (
    <img
      src={`https://cdn.simpleicons.org/${entry.slug}`}
      alt=""
      aria-hidden
      onError={() => setErrored(true)}
      className={className ?? "h-4 w-4"}
      loading="lazy"
    />
  );
}
