import { SceneProvider } from "@/lib/scene-context";
import { Sidebar, MobileSidebar } from "@/components/layout/sidebar";
import { SceneContainer } from "@/components/layout/scene-container";

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SceneProvider>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar navigation */}
        <Sidebar />
        <MobileSidebar />

        {/* Main content area — side-by-side on lg+, stacked on md, content-only on sm */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-w-0">
          {/* Content panel — scrollable */}
          <div className="flex-1 overflow-y-auto order-2 lg:order-1">
            <div className="max-w-2xl px-6 py-8 lg:px-10 lg:py-10">
              {children}
            </div>
          </div>

          {/* 3D Scene panel — sticky on lg+, reduced height on md, hidden on sm */}
          <div className="hidden md:block lg:sticky lg:top-0 lg:h-screen shrink-0 order-1 lg:order-2 h-[35vh] lg:h-auto lg:w-[45%] xl:w-[42%] border-b lg:border-b-0 lg:border-l border-border">
            <SceneContainer />
          </div>
        </div>
      </div>
    </SceneProvider>
  );
}
