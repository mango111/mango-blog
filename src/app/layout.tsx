import type { Metadata } from "next";
import "./globals.css";

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
        <div className="max-w-4xl mx-auto px-4 py-8">
          {children}
        </div>
      </body>
    </html>
  );
}
