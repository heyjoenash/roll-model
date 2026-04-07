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
        {/* Sidebar navigation — desktop: persistent, mobile: floating drawer */}
        <Sidebar />
        <MobileSidebar />

        {/* Main content area */}
        <main className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* 3D Scene — hidden on mobile */}
          <div className="hidden md:block">
            <SceneContainer />
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-3xl mx-auto px-6 py-8">{children}</div>
          </div>
        </main>
      </div>
    </SceneProvider>
  );
}
