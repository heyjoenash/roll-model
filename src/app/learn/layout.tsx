import { SceneProvider } from "@/lib/scene-context";
import { Sidebar, MobileSidebar } from "@/components/layout/sidebar";
import { ResizableLayout } from "@/components/layout/resizable-layout";

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SceneProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <MobileSidebar />
        <ResizableLayout>{children}</ResizableLayout>
      </div>
    </SceneProvider>
  );
}
