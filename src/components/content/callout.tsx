import { cn } from "@/lib/utils";
import { Info, Lightbulb, AlertTriangle, BookOpen } from "lucide-react";

interface CalloutProps {
  type?: "key" | "pro-tip" | "warning" | "note";
  children: React.ReactNode;
}

const config = {
  key: {
    icon: Info,
    border: "border-l-blue-500",
    bg: "bg-blue-500/5",
    iconColor: "text-blue-400",
    title: "Key Concept",
  },
  "pro-tip": {
    icon: Lightbulb,
    border: "border-l-emerald-500",
    bg: "bg-emerald-500/5",
    iconColor: "text-emerald-400",
    title: "Pro Tip",
  },
  warning: {
    icon: AlertTriangle,
    border: "border-l-amber-500",
    bg: "bg-amber-500/5",
    iconColor: "text-amber-400",
    title: "Watch Out",
  },
  note: {
    icon: BookOpen,
    border: "border-l-zinc-500",
    bg: "bg-zinc-500/5",
    iconColor: "text-zinc-400",
    title: "Note",
  },
};

export function Callout({ type = "note", children }: CalloutProps) {
  const { icon: Icon, border, bg, iconColor, title } = config[type];

  return (
    <div
      className={cn(
        "my-6 rounded-r-lg border-l-4 p-4",
        border,
        bg
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon size={16} className={iconColor} />
        <span className={cn("text-sm font-semibold", iconColor)}>{title}</span>
      </div>
      <div className="text-sm text-foreground/80 [&>p]:my-0">{children}</div>
    </div>
  );
}
