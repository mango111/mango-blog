import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Home, User, PenSquare, Menu, X } from "lucide-react";

export const metadata: Metadata = {
  title: "Mango's Blog",
  description: "阅读、AI学习、生活感悟",
};

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-avatar">🥭</div>
      <h1 className="sidebar-name">Mango</h1>
      <p className="sidebar-bio">记录阅读、学习与生活</p>
      
      <nav className="sidebar-nav">
        <Link href="/">
          <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Home size={18} /> 首页
          </span>
        </Link>
        <Link href="/about">
          <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <User size={18} /> 关于
          </span>
        </Link>
        <Link href="/write">
          <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <PenSquare size={18} /> 写文章
          </span>
        </Link>
      </nav>
      
      <div className="sidebar-footer">
        © 2026 Mango's Blog
      </div>
    </aside>
  );
}

function MobileHeader() {
  return (
    <header className="mobile-header">
      <Link href="/" style={{ fontWeight: 600, fontSize: '1.1rem' }}>
        Mango's Blog
      </Link>
      <nav style={{ display: 'flex', gap: '16px' }}>
        <Link href="/" style={{ color: 'var(--text-secondary)' }}><Home size={20} /></Link>
        <Link href="/about" style={{ color: 'var(--text-secondary)' }}><User size={20} /></Link>
        <Link href="/write" style={{ color: 'var(--text-secondary)' }}><PenSquare size={20} /></Link>
      </nav>
    </header>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="layout">
          <MobileHeader />
          <Sidebar />
          <main className="main-content animate-fade-in">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
