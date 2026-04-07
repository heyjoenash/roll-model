"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight,
  ChevronDown,
  PanelLeftClose,
  PanelLeft,
  Circle,
  Menu,
  X,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { chapters } from "@/lib/content-map";
import { cn } from "@/lib/utils";

function ChapterNav({
  onLinkClick,
}: {
  onLinkClick?: () => void;
}) {
  const [expandedChapters, setExpandedChapters] = useState<Set<number>>(
    new Set([5])
  );
  const pathname = usePathname();

  function toggleChapter(num: number) {
    setExpandedChapters((prev) => {
      const next = new Set(prev);
      if (next.has(num)) {
        next.delete(num);
      } else {
        next.add(num);
      }
      return next;
    });
  }

  return (
    <nav className="p-2 space-y-0.5">
      {chapters.map((chapter) => {
        const isExpanded = expandedChapters.has(chapter.number);

        return (
          <div key={chapter.number}>
            <button
              onClick={() => toggleChapter(chapter.number)}
              className="w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded hover:bg-accent transition-colors text-left"
            >
              {isExpanded ? (
                <ChevronDown
                  size={14}
                  className="text-muted-foreground shrink-0"
                />
              ) : (
                <ChevronRight
                  size={14}
                  className="text-muted-foreground shrink-0"
                />
              )}
              <span className="text-muted-foreground text-xs font-medium w-5">
                {chapter.number}.
              </span>
              <span className="font-medium text-foreground/90 truncate">
                {chapter.title}
              </span>
            </button>

            {isExpanded && (
              <div className="ml-5 pl-3 border-l border-border/50 space-y-0.5 my-0.5">
                {chapter.sections.map((section) => {
                  const href = `/learn/${chapter.slug}/${section.slug}`;
                  const isActive = pathname === href;

                  return (
                    <Link
                      key={section.slug}
                      href={href}
                      onClick={onLinkClick}
                      className={cn(
                        "flex items-center gap-2 px-2 py-1 text-sm rounded transition-colors",
                        isActive
                          ? "bg-accent text-foreground font-medium"
                          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                      )}
                    >
                      {isActive && (
                        <Circle
                          size={6}
                          className="fill-primary text-primary shrink-0"
                        />
                      )}
                      <span className={isActive ? "" : "ml-[14px]"}>
                        {section.title}
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col border-r border-border bg-card/50 transition-all duration-300 shrink-0",
        collapsed ? "w-12" : "w-[280px]"
      )}
    >
      <div className="flex items-center justify-between p-3 border-b border-border">
        {!collapsed && (
          <Link href="/" className="font-semibold text-sm text-foreground">
            Roll Model
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
        >
          {collapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>

      {!collapsed && (
        <ScrollArea className="flex-1">
          <ChapterNav />
        </ScrollArea>
      )}
    </aside>
  );
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating menu button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed bottom-4 left-4 z-50 p-3 rounded-full bg-card border border-border shadow-lg text-foreground"
      >
        <Menu size={20} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/60"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-[280px] bg-card border-r border-border flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3 border-b border-border">
              <Link
                href="/"
                className="font-semibold text-sm text-foreground"
                onClick={() => setOpen(false)}
              >
                Roll Model
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <ScrollArea className="flex-1">
              <ChapterNav onLinkClick={() => setOpen(false)} />
            </ScrollArea>
          </div>
        </div>
      )}
    </>
  );
}
