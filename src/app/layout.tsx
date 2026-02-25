import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Mango's Blog",
  description: "阅读、AI学习、生活感悟",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen antialiased">
        <div className="flex">
          {/* 左侧固定侧边栏 */}
          <Sidebar />
          
          {/* 右侧内容区 */}
          <main className="flex-1 ml-64 min-h-screen">
            <div className="max-w-3xl mx-auto px-8 py-12">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
